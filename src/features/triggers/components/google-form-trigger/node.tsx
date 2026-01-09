"use client";

import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { GoogleFormTriggerDialogue } from "./dialogue";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { fetchGoogleFormTriggerRealtimeToken } from "./actions";
import { GOOGLE_FORM_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/google-form-trigger";

export const GoogleFormTriggerNode = memo((props: NodeProps) => {
    const [dialogueOpen, setDialogueOpen] = useState(false);

    const nodeStatus = useNodeStatus({
        nodeId: props.id,
        channel: GOOGLE_FORM_TRIGGER_CHANNEL_NAME,
        topic: "status",
        refreshToken: fetchGoogleFormTriggerRealtimeToken,
    });

    const handleOpenSettings = () => {
        setDialogueOpen(true);
    }

    return (
        <>
            <GoogleFormTriggerDialogue open={dialogueOpen} onOpenChange={setDialogueOpen} />
            <BaseTriggerNode
                {...props}
                icon={"/logos/googleform.svg"}
                name="Google Form"
                description="When form is submitted"
                status={nodeStatus}
                onSettings={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
            />
        </>
    );
})