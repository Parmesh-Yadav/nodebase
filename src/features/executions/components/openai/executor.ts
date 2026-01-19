import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import HandleBars from "handlebars";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { openAIChannel } from "@/inngest/channels/openai";
import prisma from "@/lib/db";
import { decrypt } from "@/lib/encryption";

HandleBars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new HandleBars.SafeString(jsonString);
  return safeString;
});

type OpenAIData = {
  variableName?: string;
  systemPrompt?: string;
  userPrompt?: string;
  credentialId?: string;
};

export const openAIExecutor: NodeExecutor<OpenAIData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  await publish(
    openAIChannel().status({
      nodeId,
      status: "loading",
    })
  );

  if (!data.variableName) {
    await publish(
      openAIChannel().status({
        nodeId,
        status: "error",
      })
    );

    throw new NonRetriableError("Variable name is required");
  }

  if (!data.userPrompt) {
    await publish(
      openAIChannel().status({
        nodeId,
        status: "error",
      })
    );

    throw new NonRetriableError("User prompt is required");
  }

  if (!data.credentialId) {
    await publish(
      openAIChannel().status({
        nodeId,
        status: "error",
      })
    );

    throw new NonRetriableError("Credential ID is required");
  }

  const systemPromptData = data.systemPrompt
    ? HandleBars.compile(data.systemPrompt)(context)
    : "You are a helpful assistant.";

  const userPromptData = HandleBars.compile(data.userPrompt)(context);

  const credential = await step.run("get-credential", () => {
    return prisma.credential.findUnique({
      where: {
        id: data.credentialId!,
        userId,
      },
    });
  });

  if (!credential) {
    await publish(
      openAIChannel().status({
        nodeId,
        status: "error",
      })
    );

    throw new NonRetriableError("Credential not found");
  }

  const openai = createOpenAI({
    apiKey: decrypt(credential.value),
  });

  try {
    const { steps } = await step.ai.wrap("openai-generate-text", generateText, {
      model: openai("gpt-4o-mini"),
      system: systemPromptData,
      prompt: userPromptData,
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    const text =
      steps[0].content[0].type === "text" ? steps[0].content[0].text : "";

    await publish(
      openAIChannel().status({
        nodeId,
        status: "success",
      })
    );

    return {
      ...context,
      [data.variableName]: {
        text,
      },
    };
  } catch (e) {
    await publish(
      openAIChannel().status({
        nodeId,
        status: "error",
      })
    );

    throw new NonRetriableError("Failed to generate text with OpenAI");
  }
};
