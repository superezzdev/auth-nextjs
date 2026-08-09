"use client";

import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Mail,
  ShieldCheck,
  ShieldAlert,
  LogOut,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  ArrowLeft,
  KeyRound,
  Lock,
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

interface User {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
}

export default function UserProfile() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Fetch user when page loads
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUser(response.data.user);
      } catch (error: unknown) {
        console.error("Failed to fetch user details:", error);
        const axiosError = error as AxiosError<{
          error?: string;
        }>;

        toast.error(
          axiosError.response?.data?.error || "Session expired, please login",
        );
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [router]);

  // Copy User ID
  const copyUserId = () => {
    if (user?._id) {
      navigator.clipboard.writeText(user._id);
      setCopied(true);
      toast.success("User ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoggingOut(true);
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: unknown) {
      console.error("Logout failed:", error);
      const axiosError = error as AxiosError<{
        error?: string;
      }>;
      toast.error(
        axiosError.response?.data?.error || "Something went wrong with logout",
      );
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
          AUTHENTICATING SESSION...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Navigation Header */}
      <header className="border-b border-[#27272a] bg-black px-6 py-4 sticky top-0 z-50">
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
              <span className="hidden sm:inline">Landing Page</span>
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

            <button
              onClick={logout}
              disabled={loggingOut}
              className="px-3 py-1.5 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-600/40 hover:bg-rose-600 hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loggingOut ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <LogOut className="w-3.5 h-3.5" />
              )}
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 flex-1 w-full animate-slide-up">
        {/* Top Account Header Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#09090b] border border-[#27272a] mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#27272a]">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-black text-white shadow-xl">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black uppercase tracking-tight text-white">
                    {user?.name || "User"}
                  </h1>
                  {user?.isAdmin && (
                    <span className="px-2.5 py-0.5 rounded bg-purple-600 text-white font-mono text-[10px] font-bold">
                      ADMIN
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm font-medium flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{user?.email}</span>
                </p>
              </div>
            </div>

            {/* Verification Badge */}
            <div>
              {user?.isVerified ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>VERIFIED ACCOUNT</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600/10 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>VERIFICATION PENDING</span>
                </div>
              )}
            </div>
          </div>

          {/* Account Attributes Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
            <div className="p-5 rounded-2xl bg-black border border-[#27272a]">
              <span className="text-[11px] font-mono uppercase text-gray-500 tracking-wider block mb-1 font-bold">
                Account Status
              </span>
              <p className="text-sm font-bold text-white flex items-center gap-2">
                {user?.isVerified ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Email Confirmed</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>Unverified Email</span>
                  </>
                )}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black border border-[#27272a]">
              <span className="text-[11px] font-mono uppercase text-gray-500 tracking-wider block mb-1 font-bold">
                Permission Role
              </span>
              <p className="text-sm font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400" />
                <span>{user?.isAdmin ? "Administrator" : "Standard Member"}</span>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black border border-[#27272a] sm:col-span-2 lg:col-span-1">
              <span className="text-[11px] font-mono uppercase text-gray-500 tracking-wider block mb-1 font-bold">
                Session Encryption
              </span>
              <p className="text-sm font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-purple-400" />
                <span>JWT HTTP-Only Cookie</span>
              </p>
            </div>
          </div>

          {/* User ID Box */}
          <div className="mt-6 p-5 rounded-2xl bg-black border border-[#27272a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase text-gray-500 tracking-wider block mb-1 font-bold">
                MongoDB Document ObjectId
              </span>
              <code className="text-xs font-mono text-blue-400 break-all">
                {user?._id}
              </code>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={copyUserId}
                className="px-3.5 py-2 rounded-lg bg-[#18181b] border border-[#27272a] hover:border-gray-600 text-xs font-mono text-gray-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copied ? "Copied" : "Copy ID"}</span>
              </button>

              <Link
                href={`/profile/${user?._id}`}
                className="px-3.5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 text-xs font-mono font-bold transition flex items-center gap-1.5"
              >
                <span>Dynamic View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links Card */}
        <div className="p-8 rounded-3xl bg-[#09090b] border border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">Need to Test Public Routes?</h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              You can return to the landing page or inspect the GitHub repository anytime.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto hc-btn-secondary px-5 py-2.5 rounded-xl text-xs font-bold text-center"
            >
              Landing Page
            </Link>
            <a
              href="https://github.com/superezzdev/auth-nextjs"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto hc-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
