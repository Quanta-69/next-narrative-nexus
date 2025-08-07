import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Narrative Nexus",
    description: "Log in to your Narrative Nexus account to continue reading",
}

export default function loginPage() {
    return (
        <>
            <h1>Welcome back! Please log in to continue reading.</h1>
        </>
    );
}