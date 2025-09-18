"use client";

import { User } from "@/db/schema/schema";
import { BASE_URL } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
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
