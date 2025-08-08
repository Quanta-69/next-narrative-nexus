// src/components/Sidebar.tsx
"use client"; // This component will have client-side interactivity (e.g., active link styling)

import Link from "next/link";
import { usePathname } from "next/navigation"; // To highlight active link
import { UserButton } from "@clerk/nextjs"; // For the user button/logout
import { dashboardSidebarLinks } from "@/data/dashboardSidebarLinks"; // Import your static data

interface SidebarProps {
  userRole: string; // Will be 'user', 'author', or 'admin'
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname(); // Get current path for active link styling

  // Filter links based on the user's role
  const filteredLinks = dashboardSidebarLinks.filter((link) =>
    link.roles.includes(userRole)
  );

  return (
    <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between shadow-2xl rounded-r-xl">
      <div>
        <h2 className="text-3xl font-extrabold text-purple-400 mb-8 text-center">
          Dashboard
        </h2>
        <nav>
          <ul className="space-y-3">
            {filteredLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                              ${
                                pathname === link.path
                                  ? "bg-purple-700 text-white font-semibold shadow-inner"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                              }`}
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span className="text-lg">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* User profile / Logout at the bottom of the sidebar */}
      <div className="mt-auto pt-6 border-t border-gray-700 flex items-center justify-center">
        <UserButton afterSignOutUrl="/" />
      </div>
    </aside>
  );
}
