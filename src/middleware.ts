/* // src/middleware.ts

import { clerkMiddleware } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = ["/", "/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  // Skip middleware for static assets and public routes
  if (
    nextUrl.pathname.startsWith("/_next") ||
    publicRoutes.includes(pathname)
  ) {
    return;
  }

  // Authenticate the user
  const { userId } = await auth();

  // If no user is authenticated, redirect to sign-in
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Fetch the user's role from the database
  const prisma = (await import("@/lib/prisma")).default;
  const user = await prisma.profiles.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Check if the user has the required role for the requested path
  const requiredRole = getRequiredRoleForPath(pathname);
  if (requiredRole && user.role !== requiredRole) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return;
}

// Helper function to determine the required role for a given path
function getRequiredRoleForPath(pathname: string): string | null {
  const protectedRoutes = {
    admin: ["/dashboard/admin"],
    author: ["/dashboard/author"],
    user: ["/dashboard"],
  };

  for (const [role, paths] of Object.entries(protectedRoutes)) {
    if (paths.some((p) => pathname.startsWith(p))) {
      return role;
    }
  }
  return null;
}

// Wrap the middleware with clerkMiddleware()
export default clerkMiddleware(middleware);

// Define which paths the middleware should apply to
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
 */

export default function Middleware() {
  
}