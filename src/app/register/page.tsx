"use client";
import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
});

export default function RegisterComponent() {
  const [isClient, setIsClient] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
    setFormErrors({ ...formErrors, [id]: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formValues.email, password: formValues.password }),
      });

      if (response.ok) {
        toast.success("Registration successful");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000); // Redirect after 2 seconds
      } else {
        const result = await response.json();
        toast.error(result.error);
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors: { [key: string]: string } = {};
        err.inner.forEach(error => {
          errors[error.path || ''] = error.message;
        });
        setFormErrors(errors);
      }
    }
  };

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
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="text-muted-foreground">Sign up for a new account</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="example@email.com" 
                value={formValues.email}
                onChange={handleChange}
                required 
              />
              {formErrors.email && <div className="text-red-500 text-sm">{formErrors.email}</div>}
            </div>
            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                value={formValues.password}
                onChange={handleChange}
                required 
              />
              <Button variant="ghost" size="icon" className="absolute bottom-1 right-1 h-7 w-7">
                <EyeIcon className="h-4 w-4" />
                <span className="sr-only">Toggle password visibility</span>
              </Button>
              {formErrors.password && <div className="text-red-500 text-sm">{formErrors.password}</div>}
            </div>
            <div className="relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password"
                value={formValues.confirmPassword}
                onChange={handleChange}
                required 
              />
              <Button variant="ghost" size="icon" className="absolute bottom-1 right-1 h-7 w-7">
                <EyeIcon className="h-4 w-4" />
                <span className="sr-only">Toggle password visibility</span>
              </Button>
              {formErrors.confirmPassword && <div className="text-red-500 text-sm">{formErrors.confirmPassword}</div>}
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <div className="text-center text-muted-foreground">
              <Link href="/login" className="font-medium hover:underline" prefetch={false}>
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
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
