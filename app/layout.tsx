import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import RootProvider from "@/components/providers/RootProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Tracking expenses made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
          lang="en"
          className="dark"
          style={{
              colorScheme: "dark",
          }}
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <RootProvider>
            {children}
          </RootProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
