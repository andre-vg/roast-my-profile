import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function SideBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      {/* <AppSidebar /> */}
      {/* <SidebarTrigger /> */}
      {children}
    </SidebarProvider>
  );
}
