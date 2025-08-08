// src/components/Navbar.tsx
"use client"; // This component needs client-side interactivity

import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs"; // Import useAuth and UserButton
import { navLinks } from "@/data/navLinks"; // Import your static navigation data

export function Navbar() {
  const { userId, isLoaded } = useAuth(); // Get the user's ID and loading state from Clerk

  // Determine if the user is authenticated
  const isAuthenticated = !!userId;

  // In a real application, you would fetch the user's 'role' from your
  // 'public.profiles' table in the database to determine if they are an admin.
  // For now, we'll use a placeholder.
  const isAdmin = false; // Placeholder: Replace with actual logic to check user's role from DB

  if (!isLoaded) {
    // Return a minimal loading state or null while Clerk initializes
    // This prevents hydration errors if auth state is not yet determined
    return (
      <nav className="bg-gray-900 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-2xl font-bold text-purple-400">Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Site Logo/Name */}
        <Link
          href="/"
          className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors"
        >
          Narrative Nexus
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 items-center">
          {navLinks.map((link) => {
            // Conditional rendering logic for each link based on authentication and role
            if (link.id === "admin-dashboard" && !isAdmin) {
              return null; // Hide Admin Dashboard if not an admin
            }

            if (
              ["my-library", "buy-coins", "profile"].includes(link.id) &&
              !isAuthenticated
            ) {
              return null; // Hide user-specific links if not logged in
            }

            // You might also decide to hide 'Sign In/Sign Up' from navLinks data
            // and handle them separately below for more control.
            // For now, if it's a general public link, show it.
            if (["home", "browse-books"].includes(link.id)) {
              return (
                <li key={link.id}>
                  <Link
                    href={link.path}
                    className="text-gray-300 hover:text-purple-400 transition-colors flex items-center space-x-2"
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            }
            // For authenticated users, show all their relevant links
            if (
              isAuthenticated &&
              ["my-library", "buy-coins", "profile"].includes(link.id)
            ) {
              return (
                <li key={link.id}>
                  <Link
                    href={link.path}
                    className="text-gray-300 hover:text-purple-400 transition-colors flex items-center space-x-2"
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            }
            return null; // Default to hide if no conditions met
          })}

          {/* Conditional rendering for authentication buttons or user menu */}
          {!isAuthenticated ? (
            <>
              <li>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors shadow-md"
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <li>
              {/* Clerk's UserButton provides a dropdown for user management and logout */}
              <UserButton afterSignOutUrl="/" />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
