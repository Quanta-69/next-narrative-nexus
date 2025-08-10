import { SignUp } from "@clerk/nextjs";

export function SignUpComp() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp
        appearance={{
          elements: {
            footerAction: "hidden", // Hides "Already have an account?" link
          },
        }}
      />
    </div>
  );
}
