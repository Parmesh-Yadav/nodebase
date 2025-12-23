"use client";

import { PlusIcon } from "lucide-react";
import { memo } from "react";
import { Button } from "@/components/ui/button";

export const AddNoteButton = memo(() => {
    return (
        <Button
            size="icon"
            variant="outline"
            onClick={() => { }}
            className="bg-background"
        >
            <PlusIcon />
        </Button>
    );
});

AddNoteButton.displayName = "AddNoteButton";