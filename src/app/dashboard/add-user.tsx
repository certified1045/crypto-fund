"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addUserSchema } from "@/lib/zodSchema";
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
import { useRouter } from "next/navigation";

export default function AddUser() {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const form = useForm<z4.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
  });

  async function onsubmit(body: z4.infer<typeof addUserSchema>) {
    console.log({ body });
    try {
      const res = await fetch("/api/user", {
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
        router.refresh();
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
        <Button>Add new user</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="sm:text-center">
          <DialogTitle>Add a new user</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onsubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Username</FormLabel>
                      <Input {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dealPrice"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Deal Price</FormLabel>
                      <Input {...field} type="number" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="securityDeposit"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Security Deposit</FormLabel>
                      <Input {...field} type="number" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full mt-2"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && <LoaderIcon />}Add user
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
