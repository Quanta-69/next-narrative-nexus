import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation"; 

export default async function DashboardRootPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  let userRole: string = "user";

  try {
    const userProfile = await prisma.profiles.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (userProfile) {
      userRole = userProfile.role;
    }
  } catch (error) {
    console.error(
      "Error fetching user role for dashboard root page redirect:",
      error
    );
    userRole = "user"; 
  }

  if (userRole === "admin") {
    redirect("/dashboard/admin/overview");
  } else if (userRole === "author") {
    redirect("/dashboard/author/overview");
  } else {
    redirect("/dashboard/overview");
  }
    
  return null;
}
