// This layout will be the one handling the styles and passing the parallel routes as props
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarComp } from "@/components/dashboard";

export default function dashboardLayout({
    children,

}: {
        children: React.ReactNode;
        stats: React.ReactNode;
        revenue: React.ReactNode;
    }) {
    return (
      <>
        <SidebarProvider>
          <SidebarComp userRole="user" />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </>
    );
}