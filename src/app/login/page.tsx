"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import {
  Loader2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

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
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Header with GitHub Repo Link */}
      <header className="border-b border-[#27272a] bg-black px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-black text-black text-base group-hover:bg-blue-500 group-hover:text-white transition-colors duration-200">
              A
            </div>
            <span className="font-extrabold tracking-wider text-sm">
              AUTH<span className="text-blue-500">.NEXT</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#27272a] hover:border-gray-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back Home</span>
            </Link>

            <a
              href="https://github.com/superezzdev/auth-nextjs"
              target="_blank"
              rel="noopener noreferrer"
              className="hc-btn-secondary px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-mono group"
              title="View auth-nextjs repository"
            >
              <GithubIcon className="w-3.5 h-3.5 text-white group-hover:text-blue-400 transition-colors" />
              <span className="hidden sm:inline font-bold">auth-nextjs</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex">
        {/* Left Hero Sidebar (Desktop) */}
        <div className="hidden lg:flex w-5/12 bg-[#09090b] border-r border-[#27272a] p-12 flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-[#27272a] text-[11px] font-mono text-blue-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SECURE IDENTITY GATEWAY</span>
            </div>

            <h1 className="text-4xl font-black uppercase tracking-tight leading-tight">
              SIGN IN TO YOUR <br />
              <span className="text-blue-500">AUTHENTICATED</span> DASHBOARD.
            </h1>

            <p className="text-gray-400 text-sm leading-relaxed">
              Experience cryptographic token validation, automatic Edge Middleware protection, and real-time MongoDB session tracking.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-black border border-[#27272a] font-mono text-xs text-gray-400 space-y-2">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest pb-1 border-b border-[#27272a]">
              SESSION SECURITY SPEC
            </div>
            <p className="text-emerald-400 font-bold">✓ HTTP-Only Cookie Signing</p>
            <p className="text-blue-400">✓ SameSite: Strict Protection</p>
            <p className="text-purple-400">✓ 60-Minute Expiration Window</p>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-black">
          <div className="w-full max-w-md bg-[#09090b] border border-[#27272a] rounded-3xl p-8 sm:p-10 shadow-2xl animate-slide-up">
            <div className="mb-8">
              <span className="text-xs font-mono text-blue-400 uppercase font-bold tracking-wider block mb-1">
                ACCESS ACCOUNT
              </span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                Welcome Back
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                Enter your verified credentials to sign in.
              </p>
            </div>

            <form onSubmit={onLogin} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5 font-bold">
                  Email Address
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
                    className="w-full bg-black border border-[#27272a] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm font-medium"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5 font-bold">
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
                    className="w-full bg-black border border-[#27272a] rounded-xl pl-11 pr-11 py-3.5 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition cursor-pointer"
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
                className="w-full mt-3 hc-btn-primary py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <span>SIGN IN</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-[#27272a]" />
              <span className="mx-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">
                or
              </span>
              <div className="flex-1 h-px bg-[#27272a]" />
            </div>

            <p className="text-gray-400 text-xs sm:text-sm text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-400 hover:text-blue-300 font-bold underline transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
