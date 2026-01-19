export const NodeTypeValues = {
    INITIAL: "INITIAL",
    MANUAL_TRIGGER: "MANUAL_TRIGGER",
    HTTP_REQUEST: "HTTP_REQUEST",
    GOOGLE_FORM_TRIGGER: "GOOGLE_FORM_TRIGGER",
    STRIPE_TRIGGER: "STRIPE_TRIGGER",
    ANTHROPIC: "ANTHROPIC",
    GEMINI: "GEMINI",
    OPENAI: "OPENAI",
    DISCORD: "DISCORD",
    SLACK: "SLACK",
} as const;

export type NodeType = (typeof NodeTypeValues)[keyof typeof NodeTypeValues];

export const CredentialTypeValues = {
    OPENAI: "OPENAI",
    ANTHROPIC: "ANTHROPIC",
    GEMINI: "GEMINI",
} as const;

export type CredentialType = (typeof CredentialTypeValues)[keyof typeof CredentialTypeValues];
