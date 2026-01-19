import { InitialNode } from "@/components/initial-node";
import { AnthropicNode } from "@/features/executions/components/anthropic/node";
import { DiscordNode } from "@/features/executions/components/discord/node";
import { GeminiNode } from "@/features/executions/components/gemini/node";
import { HttpRequestNode } from "@/features/executions/components/http-request/node";
import { OpenAINode } from "@/features/executions/components/openai/node";
import { SlackNode } from "@/features/executions/components/slack/node";
import { GoogleFormTriggerNode } from "@/features/triggers/components/google-form-trigger/node";
import { ManualTriggerNode } from "@/features/triggers/components/manual-trigger/node";
import { StripeTriggerNode } from "@/features/triggers/components/stripe-trigger/node";
import { NodeTypeValues } from "@/config/prisma-enums";
import { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
  [NodeTypeValues.INITIAL]: InitialNode,
  [NodeTypeValues.HTTP_REQUEST]: HttpRequestNode,
  [NodeTypeValues.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeTypeValues.GOOGLE_FORM_TRIGGER]: GoogleFormTriggerNode,
  [NodeTypeValues.STRIPE_TRIGGER]: StripeTriggerNode,
  [NodeTypeValues.GEMINI]: GeminiNode,
  [NodeTypeValues.OPENAI]: OpenAINode,
  [NodeTypeValues.ANTHROPIC]: AnthropicNode,
  [NodeTypeValues.DISCORD]: DiscordNode,
  [NodeTypeValues.SLACK]: SlackNode,
} as const satisfies NodeTypes;

export type RegisteredNodeTypes = keyof typeof nodeComponents;
