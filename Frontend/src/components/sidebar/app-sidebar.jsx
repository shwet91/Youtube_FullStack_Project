
import { Calendar, Home, Inbox, Search, Settings, UserCircle , TwitterIcon , History } from "lucide-react"
import YourTubeLogo from "../DesignSection/Logo"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Profile",
    url: "#",
    icon: UserCircle,
  },
  {
    title: "Tweets",
    url: "#",
    icon: TwitterIcon,
  },
  {
    title: "watch History",
    url: "#",
    icon: History,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar  >
      <SidebarContent className="bg-gray-800 text-white" >
        <SidebarGroup>
          <SidebarGroupLabel> <YourTubeLogo></YourTubeLogo> </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}