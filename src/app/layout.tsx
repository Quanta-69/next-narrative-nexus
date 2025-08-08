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
      <html lang="en">
        <Navbar/>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
