import { Metadata } from "next";
import { LoginComp } from "@/components/auth";

export const metadata: Metadata = {
  title: "Login | Narrative Nexus",
  description: "Login to your Narrative Nexus account",
};

export default function loginPage() {
  return (
    <>
      <h1>Login to continue reading!</h1>
      <LoginComp />
    </>
  );
}
