"use client";

import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { GeminiFormValues, GeminiDialogue } from "./dialogue";
import { useNodeStatus } from "../../hooks/use-node-status";
import { fetchGeminiRealtimeToken } from "./actions";
import { GEMINI_CHANNEL_NAME } from "@/inngest/channels/gemini";

type GeminiNodeData = {
    variableName?: string;
    credentialId?: string;
    systemPrompt?: string;
    userPrompt?: string;
}

type GeminiNodeType = Node<GeminiNodeData>;

export const GeminiNode = memo(
    (props: NodeProps<GeminiNodeType>) => {

        const [dialogueOpen, setDialogueOpen] = useState(false);
        const { setNodes } = useReactFlow();
        const nodeStatus = useNodeStatus({
            nodeId: props.id,
            channel: GEMINI_CHANNEL_NAME,
            topic: "status",
            refreshToken: fetchGeminiRealtimeToken,
        });

        const handleOpenSettings = () => {
            setDialogueOpen(true);
        }

        const handleSubmit = (values: GeminiFormValues) => {
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
            ? `gemini-2.0-flash ${nodeData.userPrompt.slice(0, 50)}...`
            : "Not configured";

        return (
            <>
                <GeminiDialogue
                    open={dialogueOpen}
                    onOpenChange={setDialogueOpen}
                    onSubmit={handleSubmit}
                    defaultValues={nodeData}
                />
                <BaseExecutionNode
                    {...props}
                    id={props.id}
                    icon={"/logos/gemini.svg"}
                    name="Gemini"
                    description={description}
                    onSettings={handleOpenSettings}
                    onDoubleClick={handleOpenSettings}
                    status={nodeStatus}
                />
            </>
        );
    }
);

GeminiNode.displayName = "GeminiNode";