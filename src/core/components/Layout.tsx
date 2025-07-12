import { Outlet } from "react-router-dom";
import { useAuth } from "@/core/hooks/useAuth";
import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "./site-header";

export default function Layout() {
  useAuth();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar variant="inset" />
        <SidebarInset>
         <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
