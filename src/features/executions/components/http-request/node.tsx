"use client";

import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { GlobeIcon } from "lucide-react";
import { HttpRequestFormValues, HttpRequestDialogue } from "./dialogue";

type HttpRequestNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: string;
}

type HttpsRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo(
    (props: NodeProps<HttpsRequestNodeType>) => {

        const [dialogueOpen, setDialogueOpen] = useState(false);

        const { setNodes } = useReactFlow();

        const nodeStatus = "initial";

        const handleOpenSettings = () => {
            setDialogueOpen(true);
        }

        const handleSubmit = (values: HttpRequestFormValues) => {
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
        const description = nodeData?.endpoint
            ? `${nodeData.method || "GET"} ${nodeData.endpoint}`
            : "Not configured";

        return (
            <>
                <HttpRequestDialogue
                    open={dialogueOpen}
                    onOpenChange={setDialogueOpen}
                    onSubmit={handleSubmit}
                    defaultValues={nodeData}
                />
                <BaseExecutionNode
                    {...props}
                    id={props.id}
                    icon={GlobeIcon}
                    name="HTTP Request"
                    description={description}
                    onSettings={handleOpenSettings}
                    onDoubleClick={handleOpenSettings}
                    status={nodeStatus}
                />
            </>
        );
    }
);

HttpRequestNode.displayName = "HttpRequestNode";