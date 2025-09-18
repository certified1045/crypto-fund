"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addAddressSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import z4 from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";

export default function EditAddress({ address }: { address?: string }) {
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z4.infer<typeof addAddressSchema>>({
    resolver: zodResolver(addAddressSchema),
    defaultValues: { address },
  });

  async function onsubmit(body: z4.infer<typeof addAddressSchema>) {
    console.log({ body });
    try {
      const res = await fetch("/api/address", {
        body: JSON.stringify(body),
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const response = await res.json();
      if (res.ok) {
        console.log({ response });
        setOpenDialog(false);
        toast.success("User added successfully");
      }
    } catch (err) {
      console.log({ err });
      setOpenDialog(false);
      toast.error("User not added", { description: "Something went wrong" });
    }
  }
  return (
    <Dialog onOpenChange={setOpenDialog} open={openDialog}>
      <DialogTrigger asChild>
        <Button>Edit Address</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="sm:text-center">
          <DialogTitle>Edit Address</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onsubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Address</FormLabel>
                      <Input {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full mt-2"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && <LoaderIcon />}Edit Address
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
