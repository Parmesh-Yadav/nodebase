"use client";

import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { useNodeStatus } from "../../hooks/use-node-status";
import { SLACK_CHANNEL_NAME } from "@/inngest/channels/slack";
import { fetchSlackRealtimeToken } from "./actions";
import { SlackDialogue, SlackFormValues } from "./dialogue";

type SlackNodeData = {
    webhookUrl?: string;
    content?: string;
}

type SlackNodeType = Node<SlackNodeData>;

export const SlackNode = memo(
    (props: NodeProps<SlackNodeType>) => {

        const [dialogueOpen, setDialogueOpen] = useState(false);
        const { setNodes } = useReactFlow();
        const nodeStatus = useNodeStatus({
            nodeId: props.id,
            channel: SLACK_CHANNEL_NAME,
            topic: "status",
            refreshToken: fetchSlackRealtimeToken,
        });

        const handleOpenSettings = () => {
            setDialogueOpen(true);
        }

        const handleSubmit = (values: SlackFormValues) => {
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
        const description = nodeData?.content
            ? `Send ${nodeData.content.slice(0, 50)}...`
            : "Not configured";

        return (
            <>
                <SlackDialogue
                    open={dialogueOpen}
                    onOpenChange={setDialogueOpen}
                    onSubmit={handleSubmit}
                    defaultValues={nodeData}
                />
                <BaseExecutionNode
                    {...props}
                    id={props.id}
                    icon={"/logos/slack.svg"}
                    name="Slack"
                    description={description}
                    onSettings={handleOpenSettings}
                    onDoubleClick={handleOpenSettings}
                    status={nodeStatus}
                />
            </>
        );
    }
);

SlackNode.displayName = "SlackNode";