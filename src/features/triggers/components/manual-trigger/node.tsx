"use client";

import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointerIcon } from "lucide-react";
import { ManualTriggerDialogue } from "./dialogue";

export const ManualTriggerNode = memo((props: NodeProps) => {
    const [dialogueOpen, setDialogueOpen] = useState(false);

    const nodeStatus = "loading"

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
                status = {nodeStatus}
                onSettings={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
            />
        </>
    );
})