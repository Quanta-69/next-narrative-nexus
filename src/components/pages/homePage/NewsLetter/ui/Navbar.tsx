"use client";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link href="/">Narrative Nexus</Link>
      <div className="flex items-center space-x-4">
        <Link href="/books">Books</Link>
        {isSignedIn ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <>
            <SignInButton mode="modal">
              <button className="btn btn-outline">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn btn-primary">Sign Up</button>
            </SignUpButton>
          </>
        )}
      </div>
    </nav>
  );
}
