"use client";

import { User } from "@/db/schema/schema";
import { BASE_URL } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Payment = {
  createdAt: Date;
  imgURLs: string;
  user: {
    username: string;
  };
};

export const UsersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  // {
  //   accessorKey: "email",
  //   header: "Email",
  // },
  {
    header: "User Link",
    cell: ({ row }) => {
      return (
        <Link
          href={`/${row.original.id}`}
          className="truncate"
        >{`${BASE_URL}/${row.original.id}`}</Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Registered Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div>{date.toISOString().slice(0, 10)}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                toast.success(
                  `${row.original.username}'s link copied successfully`
                );
                navigator.clipboard.writeText(`${BASE_URL}/${row.original.id}`);
              }}
            >
              Copy Link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete user</DropdownMenuItem>
            <DropdownMenuItem>Edit username</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  // {
  //   accessorKey: "verified",
  //   header: "Status",
  //   cell: ({ row }) => (
  //     <div>{!!row.getValue("verified") ? "Verified" : "Unverified"}</div>
  //   ),
  // },
];

export const UsersReceipts: ColumnDef<Payment>[] = [
  {
    header: "Username",
    cell: ({ row }) => {
      return <div className="">{row.original.user.username}</div>;
    },
  },
  {
    header: "Receipt",
    cell: ({ row }) => {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button>View Receipt</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 h-80">
            <div className="relative">
              <Image
                src={row.original.imgURL!}
                alt="Verification document"
                className="h-full w-full"
                height={240}
                width={240}
                priority
              />
            </div>
            {/* <Image
                  src="http://res.cloudinary.com/dyez5iyvm/image/upload/v1747189588/kyllejpjsniete7eexjg.svg"
                  alt="Verification document"
                  fill
                /> */}
          </PopoverContent>
        </Popover>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Uploaded Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div>{date.toISOString().slice(0, 10)}</div>;
    },
  },
];
