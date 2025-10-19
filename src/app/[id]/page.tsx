import Header from "@/components/header";
import { BASE_URL } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { EditIcon, GemIcon } from "lucide-react";
import { notFound } from "next/navigation";
import Exchange from "./exchange";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Wallet from "./wallet";
import { User } from "@/db/schema/schema";
import { Progress } from "@/components/ui/progress";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${BASE_URL}/api/user/${id}`, { cache: "no-store" });
  if (res.status == 404) return notFound();
  const response = (await res.json()) as { users: User };
  console.log({ res, response });

  return (
    <div className="sm:px-2 max-w-md flex justify-center flex-col items-center mx-auto overflow-x-hidden pb-8 border-border shadow rounded-md bg-background">
      <Header />
      <main className="flex flex-col gap-8 mt-8 row-start-2 items-center px-2.5">
        <div className="flex font-medium gap-1 items-center">
          <p className="text-xl">{`${response?.users?.username}.t.me`}</p>
          <span className="text-xs px-1.5 py-1 rounded bg-border text-chart-2 relative top-0.5">
            Deal in progress
          </span>
        </div>
        <table className="w-full text-foreground/70 bg-border rounded-md">
          <thead className="bg-foreground/10">
            <tr>
              <th className="py-2">Deal Price</th>
              <th className="py-2">Security Deposit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center py-1 text-center text-xs py-2">
                <span className="gap-0.5 flex items-center font-medium justify-center text-lg text-foreground">
                  <GemIcon
                    className="text-primary relative top-0.5"
                    size={16}
                  />
                  {response?.users?.dealPrice}
                </span>
                ~$9255.9
              </td>
              <td className="text-center py-1 text-center text-xs py-2">
                <span className="gap-0.5 flex items-center font-medium justify-center text-lg text-foreground">
                  <GemIcon
                    className="text-primary relative top-0.5"
                    size={16}
                  />
                  {response?.users?.securityDeposit}
                </span>
                ~$462.8
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="pl-4 py-2" colSpan={2}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-foreground/70">
                      How does this work?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="sm:text-center">
                      <DialogTitle>How it works</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="">
                      <h4 className="text-lg font-semibold">
                        Q: Are there any fees?
                      </h4>
                      <p>
                        A: When you sell a collectible, a 5% platform security
                        deposit fee is applied. This helps keep transactions
                        safe and secure.
                      </p>
                    </div>
                    <p className="mt-5">
                      In addition, the blockchain may charge a small network fee
                      (around 1 Toncoin). This part isn’t controlled by us, but
                      don’t worry, it’s fully refundable once your
                      sale is completed.
                    </p>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          </tfoot>
        </table>
        <Card className="w-full py-2 px-4 gap-2">
          <span className="flex justify-between items-center w-full">
            <p className="font-medium">Telegram Username</p>
            <p className="text-sm text-primary">@{response?.users?.username}</p>
          </span>
          <Separator className="w-full" />
          <span className="flex justify-between items-center w-full">
            <p className="font-medium">Web Adddress</p>
            <p className="text-sm text-primary">
              t.me/{response?.users?.username}
            </p>
          </span>
          <Separator className="w-full" />
          <span className="flex justify-between items-center w-full">
            <p className="font-medium">TON Web 3.0 Address</p>
            <p className="text-sm text-primary">
              {response?.users?.username}.t.me
            </p>
          </span>
        </Card>
        <Card className="w-full py-2 px-4 gap-2">
          {response?.users?.walletAdress ? (
            <div className="flex gap-2 items-center max-w-[calc(100vw-1.625rem)]">
              <p className="text-lg font-semibold whitespace-nowrap">
                Your wallet:
              </p>
              <p className="truncate w-full">{response?.users?.walletAdress}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <EditIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader className="sm:text-center">
                    <DialogTitle>Add Wallet Address</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <Wallet id={id} address={response?.users?.walletAdress} />
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-foreground/70">
                  Click here to add your wallet address
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="sm:text-center">
                  <DialogTitle>Add Wallet Address</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <Wallet id={id} />
              </DialogContent>
            </Dialog>
          )}
        </Card>
        <div className="w-full">
          {response?.users.payments && (
            <>
              <p className="text-sm text-left">Transfer progress...</p>
              <span className="flex items-center gap-2 w-full mb-8">
                <Progress value={response?.users?.progress} />
                <p>{response?.users?.progress}%</p>
              </span>
            </>
          )}
          <Exchange payments={response?.users?.payments} userId={id} />
          <Button className="w-full" variant="ghost">
            Subscribe to updates
          </Button>
          <Card className="text-primary-foreground bg-primary">
            <p className="text-center">
              You do not need to complete KYC verification, as the buyer is a
              verified merchant on a Fragment that has a verified deposit of{" "}
              <span className="inline-flex items-center relative top-1 font-medium">
                <Image
                  src="/diamond.png"
                  alt="diamond icon"
                  width={20}
                  height={20}
                />{" "}
                25,000
              </span>
            </p>
          </Card>
        </div>
        <div className="w-full">
          <h2 className="text-xl mb-3 font-semibold">Trade Info</h2>
          <table className="w-full text-foreground/70 bg-border rounded-md max-w-[calc(100vw-0.625rem)]">
            <thead className="bg-foreground/10">
              <tr>
                <th className="py-2">Deal Status</th>
                <th className="py-2">TON - Username</th>
                <th className="text-left py-2">Recipient</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center py-2 text-foreground font-medium">
                  Ready
                </td>
                <td className="text-center py-2">Swappable</td>
                <td className="text-center py-2 line-clamp-1 max-w-28 truncate inline-block">
                  {response?.users?.walletAdress}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
