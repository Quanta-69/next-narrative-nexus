// src/components/SidebarComp.tsx
"use client"; // This component needs client-side interactivity

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/pages/homePage/NewsLetter/ui/sidebar";

import Link from "next/link"; // For Next.js client-side navigation
import { usePathname } from "next/navigation"; // To highlight the active link

import { sidebarLinks } from "@/data/dashboardSidebarLinks"; // Import your external link data

// Define the props interface for SidebarComp
interface SidebarCompProps {
  userRole: string; // The role of the currently logged-in user ('user', 'author', 'admin')
}

export function SidebarComp({ userRole }: SidebarCompProps) {
  const pathname = usePathname(); // Get the current active URL path

  // Filter the links based on the user's role
  // Only links whose 'roles' array includes the current 'userRole' will be displayed.
  const filteredLinks = sidebarLinks.filter((link) =>
    link.roles.includes(userRole)
  );

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Narrative Nexus</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredLinks.map((item) => (
                <SidebarMenuItem key={item.id}>
                  {" "}
                  {/* Use item.id as key for uniqueness */}
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                                  ${
                                    pathname === item.url
                                      ? "bg-purple-700 text-white font-semibold shadow-inner"
                                      : "text-gray-500"
                                  }`}
                    >
                      {/* Render the LucideReact icon component */}
                      <item.icon className="h-5 w-5" />{" "}
                      {/* Adjust size as needed */}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
