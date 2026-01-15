"use client";

import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { OpenAIFormValues, OpenAIDialogue } from "./dialogue";
import { useNodeStatus } from "../../hooks/use-node-status";
import { fetchOpenAIRealtimeToken } from "./actions";
import { OPENAI_CHANNEL_NAME } from "@/inngest/channels/openai";

type OpenAINodeData = {
    variableName?: string;
    credentialId?: string;
    systemPrompt?: string;
    userPrompt?: string;
}

type OpenAINodeType = Node<OpenAINodeData>;

export const OpenAINode = memo(
    (props: NodeProps<OpenAINodeType>) => {

        const [dialogueOpen, setDialogueOpen] = useState(false);
        const { setNodes } = useReactFlow();
        const nodeStatus = useNodeStatus({
            nodeId: props.id,
            channel: OPENAI_CHANNEL_NAME,
            topic: "status",
            refreshToken: fetchOpenAIRealtimeToken,
        });

        const handleOpenSettings = () => {
            setDialogueOpen(true);
        }

        const handleSubmit = (values: OpenAIFormValues) => {
            setNodes((nodes) => nodes.map((node) => {
                if (node.id === props.id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            ...values,
                        }
                    }
                }
                return node;
            }))
        }

        const nodeData = props.data;
        const description = nodeData?.userPrompt
            ? `gpt-4o-mini ${nodeData.userPrompt.slice(0, 50)}...`
            : "Not configured";

        return (
            <>
                <OpenAIDialogue
                    open={dialogueOpen}
                    onOpenChange={setDialogueOpen}
                    onSubmit={handleSubmit}
                    defaultValues={nodeData}
                />
                <BaseExecutionNode
                    {...props}
                    id={props.id}
                    icon={"/logos/openai.svg"}
                    name="OpenAI"
                    description={description}
                    onSettings={handleOpenSettings}
                    onDoubleClick={handleOpenSettings}
                    status={nodeStatus}
                />
            </>
        );
    }
);

OpenAINode.displayName = "OpenAINode";