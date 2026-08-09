"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { Loader2, Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const buttonDisabled =
    user.email.trim().length === 0 || user.password.length === 0 || loading;

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);

      toast.success(response.data.message || "Login successful!");
      router.push("/profile");
    } catch (error: unknown) {
      console.error("Login failed:", error);
      const axiosError = error as AxiosError<{ error?: string }>;
      toast.error(
        axiosError.response?.data?.error || "Invalid email or password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-gray-950 via-black to-blue-950/30 p-12 relative border-r border-gray-800/60">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-white flex items-center justify-center shadow-2xl">
            <span className="text-5xl font-bold text-black">B</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Build Faster. Grow Smarter.
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Secure, token-based authentication with Next.js App Router and MongoDB Atlas.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-4xl font-bold tracking-tight mb-2">Welcome back</h2>
            <p className="text-gray-400 text-sm">
              Please enter your credentials to log in to your account.
            </p>
          </div>

          <form onSubmit={onLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      email: e.target.value,
                    })
                  }
                  placeholder="name@example.com"
                  required
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      password: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-11 pr-11 py-3.5 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={buttonDisabled}
              className="w-full mt-2 bg-white text-black py-3.5 rounded-full font-semibold text-sm hover:bg-gray-200 transition flex items-center justify-center gap-2 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="mx-4 text-xs uppercase tracking-wider text-gray-500">
              or
            </span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          <div className="space-y-2.5">
            <button
              type="button"
              className="w-full border border-gray-800 rounded-full py-3 text-sm font-medium text-gray-300 hover:bg-gray-900 transition flex items-center justify-center"
            >
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full border border-gray-800 rounded-full py-3 text-sm font-medium text-gray-300 hover:bg-gray-900 transition flex items-center justify-center"
            >
              Continue with GitHub
            </button>
          </div>

          <p className="text-gray-400 text-sm mt-8 text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-400 hover:text-blue-300 font-medium transition"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
