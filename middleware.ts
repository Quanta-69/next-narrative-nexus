// src/middleware.ts
import {
  clerkMiddleware,
  ClerkMiddlewareAuth,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

// Define your public routes here using createRouteMatcher for better type safety and matching.
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/clerk-webhook",
  "/api/stripe(.*)",
  "/books(.*)",
]);

// This is the main Clerk authentication middleware function.
// It wraps your custom logic to ensure authentication and authorization happen first.
export default clerkMiddleware(
  async (auth: ClerkMiddlewareAuth, req: NextRequest) => {
    const pathname = req.nextUrl.pathname;

    // Call auth() to get the authentication data
    const { userId, redirectToSignIn, sessionClaims } = await auth();

    // --- Step 1: Handle Unauthenticated Access to Protected Routes ---
    if (!userId && !isPublicRoute(req)) {
      return redirectToSignIn({ returnBackUrl: pathname });
    }

    // --- Step 2: Implement Role-Based Authorization for Dashboard Routes ---
    if (userId && pathname.startsWith("/dashboard")) {
      // @ts-expect-error - Clerk types are inconsistent
      const userRole: string | undefined = sessionClaims?.publicMetadata?.role;

      const generalDashboardPaths = [
        "/dashboard",
        "/dashboard/my-library",
        "/dashboard/coins",
        "/dashboard/reviews",
      ];

      if (generalDashboardPaths.includes(pathname)) {
        return NextResponse.next();
      }

      // --- Admin-Specific Dashboard Routes ---
      if (pathname.startsWith("/dashboard/admin")) {
        if (userRole !== "admin") {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      }

      // --- Author-Specific Dashboard Routes ---
      if (pathname.startsWith("/dashboard/author")) {
        if (userRole !== "author" && userRole !== "admin") {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      }
    }

    // --- Step 3: Allow Other Authenticated Routes to Proceed ---
    return NextResponse.next();
  }
);

// config: A standard Next.js configuration object that defines which paths
// the middleware should apply to.
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
