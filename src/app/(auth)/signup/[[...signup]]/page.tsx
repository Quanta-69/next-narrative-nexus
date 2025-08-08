import { Metadata } from "next";
import { SignUpComp } from "@/components/auth";

export const metadata: Metadata = {
  title: "Sign Up | Narrative Nexus",
  description: "Create an account to start using Narrative Nexus",
};

export default function signupPage() {
  return (
    <>
      <h1>Create an account to read books!</h1>
      <SignUpComp />
    </>
  );
}
