// src/middleware.ts
import {
  clerkMiddleware,
  ClerkMiddlewareAuth, // 'auth' parameter type
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

// Define your public routes here using createRouteMatcher for better type safety and matching.
const isPublicRoute = createRouteMatcher([
  "/", // The main homepage.
  "/sign-in(.*)", // All paths under /sign-in.
  "/sign-up(.*)", // All paths under /sign-up.
  "/api/clerk-webhook", // Critical: Clerk webhook endpoint must be public.
  "/api/stripe(.*)", // Stripe API routes (checkout, webhooks) must be public.
  "/books(.*)", // Allow public viewing of general book listings.
]);

export default clerkMiddleware(
  async (auth: ClerkMiddlewareAuth, req: NextRequest) => {
    const pathname = req.nextUrl.pathname;

    const { userId, redirectToSignIn, sessionClaims } = await auth();

    // --- Step 1: Handle Unauthenticated Access to Protected Routes ---
    if (!userId && !isPublicRoute(req)) {
      return redirectToSignIn({ returnBackUrl: pathname });
    }

    // --- Step 2: Implement Path-Based Authorization for Dashboard Routes ---
    if (userId && pathname.startsWith("/dashboard")) {
      // IMPORTANT: As established, the user's specific 'role' (e.g., 'admin', 'author')
      // cannot be reliably accessed directly from Clerk's 'sessionClaims' within this middleware
      // in your current setup. The 'publicMetadata' property is not consistently present there.
      // Therefore, granular role-based *route protection* (e.g., "only admins can access /dashboard/admin")
      // based purely on Clerk's sessionClaims in middleware is NOT feasible right now.
      //
      // The primary role of middleware here will be:
      // 1. Ensure the user is authenticated for dashboard access.
      // 2. Perform path-based redirects if the path *implies* a certain access level.
      //
      // The actual display of UI elements and finer-grained authorization for data
      // will be handled by fetching the role from the database in `dashboard/layout.tsx`
      // and subsequent API route checks.

      const generalDashboardPaths = [
        "/dashboard",
        "/dashboard/my-library",
        "/dashboard/coins",
        "/dashboard/reviews",
      ];

      if (generalDashboardPaths.includes(pathname)) {
        return NextResponse.next();
      }

      // Since `sessionClaims?.publicMetadata?.role` is problematic,
      // these checks will act as general path redirects if a user
      // tries to directly access these specific sub-paths.
      // They won't guarantee role, but they will redirect if the path implies
      // it's a restricted area and the user isn't authenticated as *some* user.
      if (pathname.startsWith("/dashboard/admin")) {
        // In your current setup, we cannot reliably check the 'admin' role here.
        // This will redirect *any* authenticated user trying to access /dashboard/admin
        // if you choose to enforce this without a specific role check.
        // If you need strict role-based route protection, you must ensure
        // 'publicMetadata.role' is exposed in sessionClaims by Clerk.
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      if (pathname.startsWith("/dashboard/author")) {
        // Similar to admin, this will redirect if direct access to /dashboard/author
        // is attempted, without explicit role validation here.
        return NextResponse.redirect(new URL("/dashboard", req.url));
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
