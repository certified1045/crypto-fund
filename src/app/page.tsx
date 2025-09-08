import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-separator";
import { DiamondIcon, LoaderCircleIcon, Table } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-8 mt-8 row-start-2 items-center px-2.5">
        <div className="flex font-medium gap-1 items-center">
          <p className="text-xl">karenft138.t.me</p>
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
                  <DiamondIcon size={16} />
                  3000
                </span>
                ~$9255.9
              </td>
              <td className="text-center py-1 text-center text-xs py-2">
                <span className="gap-0.5 flex items-center font-medium justify-center text-lg text-foreground">
                  <DiamondIcon size={16} />
                  150
                </span>
                ~$462.8
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="pl-4 py-2" colSpan={2}>
                How does this work?
              </td>
            </tr>
          </tfoot>
        </table>
        <Card className="w-full py-2 px-4 gap-2">
          <span className="flex justify-between items-center w-full">
            <p className="font-medium">Telegram Username</p>
            <p className="text-sm text-primary">@karenft138</p>
          </span>
          <Separator className="w-full" />
          <span className="flex justify-between items-center w-full">
            <p className="font-medium">Web Adddress</p>
            <p className="text-sm text-primary">t.me/karenft138</p>
          </span>
          <Separator className="w-full" />
          <span className="flex justify-between items-center w-full">
            <p className="font-medium">TON Web 3.0 Address</p>
            <p className="text-sm text-primary">karenft138.t.me</p>
          </span>
        </Card>
        <div className="w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Start Exchange</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
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
            </DialogContent>
          </Dialog>
          <Button className="w-full" variant="ghost">
            Subscribe to updates
          </Button>
          <Card className="text-primary-foreground bg-primary">
            <p className="text-center">
              You do not needd to complete KYC verification, as the buyer is a
              verified merchant on a Fragment that has a verified deposit of{" "}
              <span className="inline-flex items-center">
                <DiamondIcon size={14} /> 25,000
              </span>
            </p>
          </Card>
        </div>
        <div className="w-full">
          <h2 className="text-xl mb-3 font-semibold">Trade Info</h2>
          <table className="w-full text-foreground/70 bg-border rounded-md">
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
                  UQCFJEP4WZ_mpdo0_kME
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
