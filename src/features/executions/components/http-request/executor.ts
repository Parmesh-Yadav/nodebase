import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, { type Options as KYOptions } from "ky";
import HandleBars from "handlebars";
import { httpRequestChannel } from "@/inngest/channels/http-request";

HandleBars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new HandleBars.SafeString(jsonString);
  return safeString;
});

type HTTPRequestData = {
  variableName?: string;
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
};

export const httpRequestExecutor: NodeExecutor<HTTPRequestData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    httpRequestChannel().status({
      nodeId,
      status: "loading",
    })
  );

  try {
    const result = await step.run(`http-request-${nodeId}`, async () => {
      if (!data.endpoint) {
        await publish(
          httpRequestChannel().status({
            nodeId,
            status: "error",
          })
        );
        throw new NonRetriableError("No endpoint provided for HTTP request");
      }

      if (!data.variableName) {
        await publish(
          httpRequestChannel().status({
            nodeId,
            status: "error",
          })
        );
        throw new NonRetriableError(
          "No variable name provided for HTTP request"
        );
      }

      if (!data.method) {
        await publish(
          httpRequestChannel().status({
            nodeId,
            status: "error",
          })
        );
        throw new NonRetriableError("No method provided for HTTP request");
      }
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

    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "success",
      })
    );
    return result;
  } catch (error) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      })
    );
    throw error;
  }
};
