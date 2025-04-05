import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/DesignSection/Sidebar"
import App from "./App"

import { Toaster } from "@/components/ui/sonner"


export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <App>
        <main>
            {/* <Outlet /> Remove the space between the tags */}
        </main>
        
      </App>
      <Toaster />
    </SidebarProvider>
  )
}
