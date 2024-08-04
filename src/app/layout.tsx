"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import { metadata } from "./metadata";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

interface User {
  email: string;
  userId: number;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [pathname, setPathname] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
      const loggedInUser = JSON.parse(localStorage.getItem("user") || "null") as User | null;
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const pageTitle =
    typeof metadata.title === "string" ? metadata.title : "Default Title";
  const pageDescription =
    typeof metadata.description === "string"
      ? metadata.description
      : "Default description";

  return (
    <html lang="en">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <body className={inter.className}>
        <header className="flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6 container">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <img
              src="/image.png"
              alt="Lepton Games"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold">Lepton Games</span>
          </Link>
          <nav className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Home
            </Link>
            {user && (
              <Link
                href="/invoices"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Invoices
              </Link>
            )}
            {user ? (
              <>
                <span className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium">
                  {user.email}
                </span>
                <Button
                  onClick={handleLogout}
                  className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium bg-red-500 text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              pathname !== "/login" && (
                <Link
                  href="/login"
                  className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Login
                </Link>
              )
            )}
          </div>
        </header>
        <main>{children}</main>
        <ToastContainer />
      </body>
    </html>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
