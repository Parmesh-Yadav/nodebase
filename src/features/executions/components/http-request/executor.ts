import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, { type Options as KYOptions } from "ky";

type HTTPRequestData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
};

export const httpRequestExecutor: NodeExecutor<HTTPRequestData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  // TODO: publish "loading" state for HTTP request

  if (!data.endpoint) {
    // TODO: publish "error" state for HTTP request
    throw new NonRetriableError("No endpoint provided for HTTP request");
  }

  const result = await step.run(`http-request-${nodeId}`, async () => {
    const endpoint = data.endpoint!;
    const method = data.method || "GET";

    const options: KYOptions = { method };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      options.body = data.body;
    }

    const response = await ky(endpoint, options);
    const contextType = response.headers.get("content-type");
    const responseData = contextType?.includes("application/json")
      ? await response.json().catch(() => response.text())
      : await response.text();

    return {
      ...context,
      httpResponse: {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      },
    };
  });

  // TODO: publish "success" state for HTTP request
  return result;
};
