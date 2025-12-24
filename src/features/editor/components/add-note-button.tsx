"use client";

import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { NodeSelector } from "@/components/node-selector";

export const AddNoteButton = memo(() => {
    const [selectorOpen, setSelectorOpen] = useState(false);

    return (
        <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
            <Button
                size="icon"
                variant="outline"
                onClick={() => { }}
                className="bg-background"
            >
                <PlusIcon />
            </Button>
        </NodeSelector>
    );
});

AddNoteButton.displayName = "AddNoteButton";