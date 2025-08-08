import { Navbar } from "@/components/ui/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      {" "}
      <Navbar />
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
