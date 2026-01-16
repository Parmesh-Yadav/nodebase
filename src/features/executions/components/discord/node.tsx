"use client";

import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { DiscordDialogue, DiscordFormValues } from "./dialogue";
import { useNodeStatus } from "../../hooks/use-node-status";
import { fetchDiscordRealtimeToken } from "./actions";
import { DISCORD_CHANNEL_NAME } from "@/inngest/channels/discord";

type DiscordNodeData = {
    webhookUrl?: string;
    content?: string;
    username?: string;
}

type DiscordNodeType = Node<DiscordNodeData>;

export const DiscordNode = memo(
    (props: NodeProps<DiscordNodeType>) => {

        const [dialogueOpen, setDialogueOpen] = useState(false);
        const { setNodes } = useReactFlow();
        const nodeStatus = useNodeStatus({
            nodeId: props.id,
            channel: DISCORD_CHANNEL_NAME,
            topic: "status",
            refreshToken: fetchDiscordRealtimeToken,
        });

        const handleOpenSettings = () => {
            setDialogueOpen(true);
        }

        const handleSubmit = (values: DiscordFormValues) => {
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
                <DiscordDialogue
                    open={dialogueOpen}
                    onOpenChange={setDialogueOpen}
                    onSubmit={handleSubmit}
                    defaultValues={nodeData}
                />
                <BaseExecutionNode
                    {...props}
                    id={props.id}
                    icon={"/logos/discord.svg"}
                    name="Discord"
                    description={description}
                    onSettings={handleOpenSettings}
                    onDoubleClick={handleOpenSettings}
                    status={nodeStatus}
                />
            </>
        );
    }
);

DiscordNode.displayName = "DiscordNode";