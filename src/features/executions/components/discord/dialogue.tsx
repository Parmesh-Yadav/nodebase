"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
    variableName: z.string()
        .min(1, { message: "Variable name is required" })
        .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, { message: "Variable name must start with a letter or underscore and contain only letters, numbers, and underscores" }),
    username: z.string()
        .optional(),
    content: z.string()
        .min(1, "Message is required")
        .max(2000, "Message must be at most 2000 characters"),
    webhookUrl: z.string()
        .min(1, "Webhook URL is required")
});

export type DiscordFormValues = z.infer<typeof formSchema>;

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    defaultValues?: Partial<DiscordFormValues>;
}

export const DiscordDialogue = ({
    open,
    onOpenChange,
    onSubmit,
    defaultValues = {}
}: Props) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            variableName: defaultValues.variableName || "",
            username: defaultValues.username || "",
            content: defaultValues.content || "",
            webhookUrl: defaultValues.webhookUrl || ""
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                variableName: defaultValues.variableName || "",
                username: defaultValues.username || "",
                content: defaultValues.content || "",
                webhookUrl: defaultValues.webhookUrl || ""
            });
        }
    }, [open, defaultValues, form]);

    const watchVariableName = form.watch("variableName") || "discord";

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Discord Configuration
                    </DialogTitle>
                    <DialogDescription>
                        Configure the Discord node settings below.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-8 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="variableName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Variable Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="discord"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Use this name to reference the response data in subsequent nodes (e.g., {`{{${watchVariableName}.text}}`}).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="webhookUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Discord Webhook URL
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://discord.com/api/webhooks/..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Get this from discord: channel settings &gt; Integrations &gt; Webhooks &gt; New Webhook
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Message Content
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            className="min-h-[80px] font-mono text-sm"
                                            placeholder="Summary: {{gemini.text}}"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        The message to send. Use {"{{variable}}"} for simple value or {"{{json variable}}"} to stringify objects.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Bot Username (optional)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Bot Username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Override the webhook's default username.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="mt-4">
                            <Button type="submit">
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    );
}