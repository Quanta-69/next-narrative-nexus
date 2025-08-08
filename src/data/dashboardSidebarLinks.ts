// src/data/dashboardLinks.ts

interface DashboardSidebarLink {
  id: string;
  name: string;
  path: string;
  icon: string; // Emoji for now, could be LucideReact icon later
  roles: string[]; // Roles that can see this link
}

export const dashboardSidebarLinks: DashboardSidebarLink[] = [
  // User/Reader Links
  {
    id: "user-overview",
    name: "Overview",
    path: "/dashboard",
    icon: "📊",
    roles: ["user", "author", "admin"],
  },
  {
    id: "my-library",
    name: "My Library",
    path: "/dashboard/my-library",
    icon: "📚",
    roles: ["user", "author", "admin"],
  },
  {
    id: "coin-balance",
    name: "Coins",
    path: "/dashboard/coins",
    icon: "💰",
    roles: ["user", "author", "admin"],
  },
  {
    id: "my-reviews",
    name: "My Reviews",
    path: "/dashboard/reviews",
    icon: "⭐",
    roles: ["user", "author", "admin"],
  },

  // Author Links
  {
    id: "author-books",
    name: "My Books",
    path: "/dashboard/author/books",
    icon: "✍️",
    roles: ["author", "admin"],
  },
  {
    id: "create-book",
    name: "New Book",
    path: "/dashboard/author/new-book",
    icon: "➕",
    roles: ["author", "admin"],
  },
  {
    id: "author-earnings",
    name: "Earnings",
    path: "/dashboard/author/earnings",
    icon: "📈",
    roles: ["author", "admin"],
  },

  // Admin Links
  {
    id: "admin-users",
    name: "User Management",
    path: "/dashboard/admin/users",
    icon: "👥",
    roles: ["admin"],
  },
  {
    id: "admin-books-review",
    name: "Book Review",
    path: "/dashboard/admin/book-review",
    icon: "✅",
    roles: ["admin"],
  },
  {
    id: "admin-archived-books",
    name: "Archived Books",
    path: "/dashboard/admin/archived",
    icon: "📦",
    roles: ["admin"],
  },
  {
    id: "admin-analytics",
    name: "Site Analytics",
    path: "/dashboard/admin/analytics",
    icon: "📊",
    roles: ["admin"],
  },
];
