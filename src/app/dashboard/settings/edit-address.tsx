"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditTON from "./edit-ton";
import EditETH from "./edit-eth";

export default function EditAddress({
  address,
  eth,
}: {
  address?: string;
  eth?: string;
}) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog onOpenChange={setOpenDialog} open={openDialog}>
      <DialogTrigger asChild>
        <Button>Edit Address</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="sm:text-center">
          <DialogTitle>Edit Address</DialogTitle>
          <DialogDescription>
            <Tabs defaultValue="TON">
              <TabsList>
                <TabsTrigger value="TON">TON</TabsTrigger>
                <TabsTrigger value="ETH">ETH</TabsTrigger>
              </TabsList>
              <TabsContent value="TON">
                <EditTON address={address} setOpenDialog={setOpenDialog} />
              </TabsContent>
              <TabsContent value="ETH">
                <EditETH address={eth} setOpenDialog={setOpenDialog} />
              </TabsContent>
            </Tabs>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
