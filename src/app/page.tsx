'use client'


import { LogOutButton } from "./logout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { tr } from "date-fns/locale";
import { toast } from "sonner";


const Page = () => {

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      toast.success("Job queued successfully");
      queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
    }
  }));

  const testAi = useMutation(trpc.testAI.mutationOptions({
    onSuccess: () => {
      toast.success("AI Job queued successfully");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  }));

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      protected server component.
      <div>
        {JSON.stringify(data, null, 2)}
      </div>
      <Button onClick={() => testAi.mutate()} disabled={testAi.isPending}>
        Test AI
      </Button>
      <Button onClick={() => create.mutate()} disabled={create.isPending}>
        Create Workflow
      </Button>
      <LogOutButton />
    </div>
  );
};

export default Page;
