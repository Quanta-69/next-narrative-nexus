import { SignIn } from "@clerk/nextjs";

export function LoginComp() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn
        appearance={{
          elements: {
            footerAction: "hidden", // Hides "Don't have an account?" link
          },
        }}
      />
    </div>
  );
}
