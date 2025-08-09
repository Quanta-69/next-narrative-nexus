import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"; 

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarComp } from "@/components/dashboard"; 

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authResult = await auth();
  const { userId } = authResult; 

  let userRole: string = "user";

  if (userId) {
    try {
      const userProfile = await prisma.profiles.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      if (userProfile) {
        userRole = userProfile.role;
      }
    } catch (error) {
      console.error("Error fetching user role for dashboard layout:", error);
    }
  } else {
  }

  return (
    <>
      <SidebarProvider>
        <SidebarComp userRole={userRole} />
        <main className="flex-1 p-8 overflow-y-auto">
          <SidebarTrigger />
          {children}{" "}
        </main>
      </SidebarProvider>
    </>
  );
}
