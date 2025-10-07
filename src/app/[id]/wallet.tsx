"use client";

import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z4 from "zod/v4";
import { useRouter } from "next/navigation";
import { editAddressSchema } from "@/lib/zodSchema";

export default function Wallet({
  address,
  id,
}: {
  address?: string;
  id: string;
}) {
  const router = useRouter();

  const form = useForm<z4.infer<typeof editAddressSchema>>({
    resolver: zodResolver(editAddressSchema),
    defaultValues: { address },
  });

  const handleSubmit = async (body: z4.infer<typeof editAddressSchema>) => {
    try {
      await fetch(`/api/address/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });
      toast.success("Address added successfully");
      router.refresh();
    } catch (err) {
      toast.error("Unable to Submit", {
        description: "Try again",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-3 max-w-[428px]"
      >
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="max-w-[360px]">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="eg: bc1qp3a80dx..." {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Input your wallet address where you will like to receive your
                payment
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="network"
          render={({ field }) => (
            <FormItem className="max-w-[360px]">
              <FormLabel>Select ETH/TON</FormLabel>
              <Select
                onValueChange={(e) => {
                  field.onChange(e);
                }}
              >
                <FormControl>
                  <SelectTrigger className="max-w-[360px] border-input data-[placeholder]:text-muted-foreground bg-input/30 bg-input/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px]">
                    <SelectValue placeholder="Select blockchain" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["ETH", "TON"].map((reason) => (
                    <SelectItem value={reason} key={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          className="w-full max-w-[360px] mt-2"
        >
          {form.formState.isSubmitting && (
            <LoaderIcon className="animate-spin" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
}
