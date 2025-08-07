// src/components/auth/SignInComponent.tsx
"use client"; // This component uses Clerk's client-side components

import { SignIn } from "@clerk/nextjs";

export function LoginComp() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
            card: "bg-gray-800 text-white rounded-lg shadow-xl border border-purple-700",
            headerTitle: "text-purple-300",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton:
              "bg-gray-700 hover:bg-gray-600 border border-gray-600",
            socialButtonsBlockButtonText: "text-gray-200",
            formFieldLabel: "text-gray-300",
            formFieldInput:
              "bg-gray-700 text-white border border-gray-600 focus:ring-purple-500 focus:border-purple-500",
            footerActionText: "text-gray-400",
            footerActionLink: "text-purple-400 hover:text-purple-300",
          },
        }}
        // Optional: Redirect users after successful sign-in
        // If not specified, Clerk redirects to the value of CLERK_AFTER_SIGN_IN_URL
        // or CLERK_SIGN_IN_URL if that's not set.
        // You might want to redirect to a user dashboard, e.g., "/dashboard"
        // afterSignInUrl="/dashboard"
      />
    </div>
  );
}
