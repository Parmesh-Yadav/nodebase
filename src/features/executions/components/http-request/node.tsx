"use client";

import { Node, NodeProps } from "@xyflow/react";
import { memo } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { GlobeIcon } from "lucide-react";

type HttpRequestNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: string;
    [key: string]: unknown
}

type HttpsRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo(
    (props: NodeProps<HttpsRequestNodeType>) => {
        const nodeData = props.data as HttpRequestNodeData;
        const description = nodeData?.endpoint
            ? `${nodeData.method || "GET"} ${nodeData.endpoint}`
            : "Not configured";

        return (
            <>
                <BaseExecutionNode
                    {...props}
                    id={props.id}
                    icon={GlobeIcon}
                    name="HTTP Request"
                    description={description}
                    onSettings={() => { }}
                    onDoubleClick={() => { }}
                />
            </>
        );
    }
);

HttpRequestNode.displayName = "HttpRequestNode";