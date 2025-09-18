"use client";

import { BitcoinIcon, FileIcon, UserPlusIcon } from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

// This is sample data.
const data = {
  user: {
    name: "admin",
    email: "admin@test.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Add User",
      url: "/dashboard",
      icon: UserPlusIcon,
    },
    {
      name: "View Receipts",
      url: "/dashboard/payment-receipts",
      icon: FileIcon,
    },
    {
      name: "Payment Address",
      url: "/dashboard/settings",
      icon: BitcoinIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Home"
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              asChild
            >
              <Link href="/">
                {/* <LogInIcon className="size-4" /> */}
                {/* <Image
                  src="/logo.png"
                  width={50}
                  // onError
                  height={50}
                  alt=""
                  className="size-7 rounded border-2 border-foreground"
                /> */}
                <span className="text-xl font-bold">FRAGMENT</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
