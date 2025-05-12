'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // Basic mock login: set a cookie and redirect
    // In a real app, this would involve an API call
    document.cookie = "session_token=mock_token; path=/"; // Replace with actual token
    router.push('/'); // Redirect to home page after login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="user@example.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="********" />
          </div>
          <Button onClick={handleLogin} className="w-full">
            Log In
          </Button>
        </div>
        {/* Add links for password reset or sign up if needed */}
        {/* <div className="mt-4 text-center text-sm">
          <p>Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a></p>
          <p><a href="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</a></p>
        </div> */}
      </div>
    </div>
  );
} 