"use client";

import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { StripeTriggerDialogue } from "./dialogue";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { fetchStripeTriggerRealtimeToken } from "./actions";
import { STRIPE_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/stripe-trigger";

export const StripeTriggerNode = memo((props: NodeProps) => {
    const [dialogueOpen, setDialogueOpen] = useState(false);

    const nodeStatus = useNodeStatus({
        nodeId: props.id,
        channel: STRIPE_TRIGGER_CHANNEL_NAME,
        topic: "status",
            refreshToken: fetchStripeTriggerRealtimeToken,
        });

    const handleOpenSettings = () => {
        setDialogueOpen(true);
    }

    return (
        <>
            <StripeTriggerDialogue open={dialogueOpen} onOpenChange={setDialogueOpen} />
            <BaseTriggerNode
                {...props}
                icon={"/logos/stripe.svg"}
                name="Stripe"
                description="When a Stripe event occurs"
                status={nodeStatus}
                onSettings={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
            />
        </>
    );
})