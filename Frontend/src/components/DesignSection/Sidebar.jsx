import { Calendar, Home, User, Search, Settings , Upload } from "lucide-react"

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
import { Button } from "../ui/button"

import Logout from "../Auth/Logout"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Upload Video",
    url: "/uploadVideo",
    icon: Upload,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
]

export function AppSidebar() {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.status)
  return (
    <Sidebar  >
      <SidebarContent className = {"bg-slate-900 text-white"}>
        <SidebarGroup>
          <SidebarGroupLabel className = {"bg-rose-900 text-white"} >Options</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      
                      <span>{item.title} </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {
                isLoggedIn ? <Logout onClick={() => navigate("/")} ></Logout> :  <Button  className="bg-rose-800 hover:bg-rose-950 w-1/3" onClick={() => navigate("/login")} >Login</Button>
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
