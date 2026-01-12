"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const StripeTriggerDialogue = ({ open, onOpenChange }: Props) => {

    const params = useParams();
    const workflowId = params.workflowId as string;

    // construct the webhook URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const webhookUrl = `${baseUrl}/api/webhooks/stripe?workflowId=${workflowId}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(webhookUrl);
            toast.success("Webhook URL copied to clipboard");
        } catch {
            toast.error("Failed to copy webhook URL");
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Stripe Trigger Configuration
                    </DialogTitle>
                    <DialogDescription>
                        Use this webhook URL to configure your Stripe webhook to trigger this workflow when an event occurs.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="webhook-url">
                            Webhook URL
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                id="webhook-url"
                                value={webhookUrl}
                                readOnly
                                className="font-mono text-xs"
                            />
                            <Button
                                typeof="button"
                                size="icon"
                                onClick={copyToClipboard}
                                variant="outline"
                            >
                                <CopyIcon className="size-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="rounded-lg bg-muted p-4 space-y-2">
                        <h4 className="font-medium text-sm">
                            Setup Instructions
                        </h4>
                        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                            <li>
                                Open your Stripe dashboard.
                            </li>
                            <li>
                                Go to Developers &gt; Webhooks.
                            </li>
                            <li>
                                Click on "Add endpoint".
                            </li>
                            <li>
                                Paste the webhook URL provided above into the "Endpoint URL" field.
                            </li>
                            <li>
                                Select events to listen to (e.g., "charge.succeeded", "payment_intent.created").
                            </li>
                            <li>
                                Save and copy the signing secret to your workflow configuration.
                            </li>
                        </ol>
                    </div>
                    <div className="rounded-lg bg-muted p-4 space-y-2">
                        <h4 className="font-medium text-sm">
                            Available Variables
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>
                                <code className="bg-background px-1 py-0.5 rounded">
                                    {"{{stripe.amount}}"}
                                </code>
                                - Payement amount
                            </li>
                            <li>
                                <code className="bg-background px-1 py-0.5 rounded">
                                    {"{{stripe.currency}}"}
                                </code>
                                - Payment currency
                            </li>
                            <li>
                                <code className="bg-background px-1 py-0.5 rounded">
                                    {"{{stripe.customerId}}"}
                                </code>
                                - Customer Id
                            </li>
                            <li>
                                <code className="bg-background px-1 py-0.5 rounded">
                                    {"{{json stripe}}"}
                                </code>
                                - Full event data as JSON
                            </li>
                            <li>
                                <code className="bg-background px-1 py-0.5 rounded">
                                    {"{{stripe.eventType}}"}
                                </code>
                                - Type of the Stripe event
                            </li>
                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}