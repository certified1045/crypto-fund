"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addUserSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import z4 from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "@/db/schema/schema";

export default function EditUser({
  username,
  id,
}: {
  username: User;
  id: string;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const form = useForm<z4.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: { ...username },
  });

  async function onsubmit(body: z4.infer<typeof addUserSchema>) {
    console.log({ body });
    try {
      const res = await fetch(`/api/user/${id}`, {
        body: JSON.stringify(body),
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const response = await res.json();
      if (res.ok) {
        console.log({ response });
        setOpenDialog(false);
        toast.success(response?.message || "User added successfully");
        router.refresh();
      }
    } catch (err) {
      console.log({ err });
      setOpenDialog(false);
      toast.error("User not editted", { description: "Something went wrong" });
    }
  }
  return (
    <Sheet onOpenChange={setOpenDialog} open={openDialog}>
      <SheetTrigger className="cursor-default rounded-sm px-2 py-1.5 text-sm">
        Edit User
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit User</SheetTitle>
          <SheetDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onsubmit)}
                className="space-y-3 mt-6"
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
                  {form.formState.isSubmitting && <LoaderIcon />}Edit user
                </Button>
              </form>
            </Form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
