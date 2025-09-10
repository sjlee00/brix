"use client"

import * as React from "react"
import {
  IconHome,
  IconChartBar,
  IconDashboard,
  IconTools,
  IconBuilding,
  IconShoppingCart,
  IconSettings,
  IconHelp,
  IconSearch,
} from "@tabler/icons-react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/login")
  }

  const data = {
    user: {
      name: user?.full_name || user?.email || "User",
      email: user?.email || "",
      avatar: "/avatars/user.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
      },
      {
        title: "Expenses",
        url: "/expenses",
        icon: IconChartBar,
      },
      {
        title: "Maintenance",
        url: "/maintenance",
        icon: IconTools,
      },
      {
        title: "Property",
        url: "/property",
        icon: IconBuilding,
      },
      {
        title: "Marketplace",
        url: "/marketplace",
        icon: IconShoppingCart,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "/settings",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "/help",
        icon: IconHelp,
      },
      {
        title: "Search",
        url: "/search",
        icon: IconSearch,
      },
    ],
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconHome className="!size-5" />
                <span className="text-base font-semibold">Brix</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} onSignOut={handleSignOut} />
      </SidebarFooter>
    </Sidebar>
  )
}