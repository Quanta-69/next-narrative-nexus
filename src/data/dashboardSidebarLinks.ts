// src/data/sidebarLinks.ts

import {
  Calendar,
  Home,
  UsersRound,
  Search,
  Settings,
  BookText,
  PlusSquare,
  BarChart3,
  Package,
  FileCheck,
} from "lucide-react";
import { LucideIcon } from "lucide-react"; // Import LucideIcon type

// Define the interface for a sidebar link item
interface SidebarLink {
  id: string; // Unique identifier for the link
  title: string; // Display title
  url: string; // URL path
  icon: LucideIcon; // The LucideReact icon component itself
  roles: string[]; // Array of roles that can see this link ('user', 'author', 'admin')
}

// Array of all dashboard sidebar links with their associated roles
export const sidebarLinks: SidebarLink[] = [
  // General User/Reader Links (visible to all authenticated roles)
  {
    id: "dashboard-home",
    title: "Overview",
    url: "/dashboard",
    icon: Home,
    roles: ["user", "author", "admin"],
  },
  {
    id: "my-library",
    title: "My Library",
    url: "/dashboard/my-library",
    icon: BookText,
    roles: ["user", "author", "admin"],
  },
  {
    id: "my-reviews",
    title: "My Reviews",
    url: "/dashboard/reviews",
    icon: Calendar, // Using Calendar as a placeholder icon for reviews
    roles: ["user", "author", "admin"],
  },
  {
    id: "buy-coins",
    title: "Buy Coins",
    url: "/dashboard/coins", // Assuming this is your coin purchase page
    icon: Search, // Using Search as a placeholder icon for coins
    roles: ["user", "author", "admin"],
  },

  // Author Specific Links (visible to 'author' and 'admin' roles)
  {
    id: "my-books",
    title: "My Books",
    url: "/dashboard/author/books",
    icon: BookText,
    roles: ["author", "admin"],
  },
  {
    id: "create-new-book",
    title: "New Book",
    url: "/dashboard/author/new-book",
    icon: PlusSquare,
    roles: ["author", "admin"],
  },
  {
    id: "author-earnings",
    title: "Earnings",
    url: "/dashboard/author/earnings",
    icon: BarChart3,
    roles: ["author", "admin"],
  },

  // Admin Specific Links (visible only to 'admin' role)
  {
    id: "user-management",
    title: "User Management",
    url: "/dashboard/admin/users",
    icon: UsersRound,
    roles: ["admin"],
  },
  {
    id: "book-review",
    title: "Book Review",
    url: "/dashboard/admin/book-review",
    icon: FileCheck,
    roles: ["admin"],
  },
  {
    id: "archived-books",
    title: "Archived Books",
    url: "/dashboard/admin/archived",
    icon: Package,
    roles: ["admin"],
  },
  {
    id: "settings",
    title: "Settings",
    url: "/dashboard/admin/settings", // Admin-specific settings
    icon: Settings,
    roles: ["admin"],
  },
];
