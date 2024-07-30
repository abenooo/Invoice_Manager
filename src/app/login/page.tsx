"use client"
import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Component() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-background">
      <div className="w-full max-w-4xl bg-card rounded-lg shadow-lg md:h-[500px] md:grid md:grid-cols-2 md:gap-8">
        <div className="hidden md:block">
          <img
            src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=2048x2048&w=is&k=20&c=_yhJ8HvUCQo9VxRUNxdVduv815OfzyEXx4pnMfUUNzI="
            width={600}
            height={500}
            alt="Login Image"
            className="h-full w-full object-cover rounded-l-lg"
          />
        </div>
        <div className="p-6 space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>
          <form className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="example@email.com" required />
            </div>
            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
              <Button variant="ghost" size="icon" className="absolute bottom-1 right-1 h-7 w-7">
                <EyeIcon className="h-4 w-4" />
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <div className="text-center text-muted-foreground">
              <Link href="#" className="font-medium hover:underline" prefetch={false}>
                Forgot your password?
              </Link>
            </div>
          </form>
          <div className="text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium hover:underline" prefetch={false}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function EyeIcon(props: any) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function XIcon(props: any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
