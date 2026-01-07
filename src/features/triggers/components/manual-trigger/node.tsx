"use client";

import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointerIcon } from "lucide-react";
import { ManualTriggerDialogue } from "./dialogue";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { MANUAL_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/manual-trigger";
import { fetchManualTriggerRealtimeToken } from "./actions";

export const ManualTriggerNode = memo((props: NodeProps) => {
    const [dialogueOpen, setDialogueOpen] = useState(false);

    const nodeStatus = useNodeStatus({
        nodeId: props.id,
        channel: MANUAL_TRIGGER_CHANNEL_NAME,
        topic: "status",
        refreshToken: fetchManualTriggerRealtimeToken,
    });

    const handleOpenSettings = () => {
        setDialogueOpen(true);
    }

    return (
        <>
            <ManualTriggerDialogue open={dialogueOpen} onOpenChange={setDialogueOpen} />
            <BaseTriggerNode
                {...props}
                icon={MousePointerIcon}
                name="When clicking 'Execute workflow'"
                status={nodeStatus}
                onSettings={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
            />
        </>
    );
})