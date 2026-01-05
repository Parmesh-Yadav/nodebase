import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, { type Options as KYOptions } from "ky";
import HandleBars from "handlebars";

HandleBars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new HandleBars.SafeString(jsonString);
  return safeString;
}
);

type HTTPRequestData = {
  variableName: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
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

  if (!data.variableName) {
    // TODO: publish "error" state for HTTP request
    throw new NonRetriableError("No variable name provided for HTTP request");
  }

  if (!data.method) {
    // TODO: publish "error" state for HTTP request
    throw new NonRetriableError("No method provided for HTTP request");
  }

  const result = await step.run(`http-request-${nodeId}`, async () => {
    const endpoint = HandleBars.compile(data.endpoint)(context);
    const method = data.method;

    const options: KYOptions = { method };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      const resolved = HandleBars.compile(data.body || "{}")(context);
      JSON.parse(resolved); // Validate JSON
      options.body = resolved;
      options.headers = {
        "Content-Type": "application/json",
      };
    }

    const response = await ky(endpoint, options);
    const contextType = response.headers.get("content-type");
    const responseData = contextType?.includes("application/json")
      ? await response.json().catch(() => response.text())
      : await response.text();

    const responsePayLoad = {
      httpResponse: {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      },
    };

    return {
      ...context,
      [data.variableName]: responsePayLoad,
    };
  });

  // TODO: publish "success" state for HTTP request
  return result;
};
