import { Button } from "@/components/ui/button";
import { addAddressSchema } from "@/lib/zodSchema";
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
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function EditETH({
  address,
  setOpenDialog,
}: {
  address?: string;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const form = useForm<z4.infer<typeof addAddressSchema>>({
    resolver: zodResolver(addAddressSchema),
    defaultValues: { details: address },
  });

  console.log({ val: form.watch() });

  async function onsubmit(body: z4.infer<typeof addAddressSchema>) {
    console.log({ body });
    try {
      const res = await fetch("/api/address", {
        body: JSON.stringify({ value: body.details, key: "eth" }),
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const response = await res.json();
      if (res.ok) {
        console.log({ response });
        setOpenDialog(false);
        toast.success("Address added successfully");
        router.refresh();
      }
    } catch (err) {
      console.log({ err });
      setOpenDialog(false);
      toast.error("Address not added", {
        description: "Something went wrong",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-3 mt-3">
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Edit ETH address</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-2" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <LoaderIcon />}Edit Address
        </Button>
      </form>
    </Form>
  );
}
