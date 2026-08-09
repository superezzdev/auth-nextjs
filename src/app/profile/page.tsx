"use client";

import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  ShieldAlert,
  LogOut,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

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
  const [showDetails, setShowDetails] = useState(true);
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
        <p className="text-sm text-gray-400">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation bar */}
      <nav className="border-b border-gray-800/80 bg-gray-950/60 backdrop-blur-md sticky top-0 z-10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
              <span className="text-lg font-bold text-black">B</span>
            </div>
            <span className="font-semibold tracking-tight text-base">Auth NextJS</span>
          </Link>

          <button
            onClick={logout}
            disabled={loggingOut}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border border-gray-800 hover:bg-gray-900 text-gray-300 hover:text-white transition disabled:opacity-50"
          >
            {loggingOut ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <LogOut className="w-3.5 h-3.5" />
            )}
            <span>Log out</span>
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="p-8 rounded-3xl border border-gray-800 bg-gray-950/80 backdrop-blur-xl shadow-2xl">
          {/* User Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-gray-800/80">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>{user?.name || "User"}</span>
                  {user?.isAdmin && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      ADMIN
                    </span>
                  )}
                </h1>
                <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-gray-500" />
                  <span>{user?.email}</span>
                </p>
              </div>
            </div>

            {/* Verification Status */}
            <div>
              {user?.isVerified ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Account</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Unverified Email</span>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Account Information
              </h2>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition"
              >
                <span>{showDetails ? "Collapse" : "Expand"}</span>
                {showDetails ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {showDetails && user && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                    <UserIcon className="w-3.5 h-3.5 text-gray-500" />
                    <span>Display Name</span>
                  </div>
                  <p className="text-sm font-medium text-white">{user.name}</p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    <span>Email Address</span>
                  </div>
                  <p className="text-sm font-medium text-white">{user.email}</p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                    {user.isVerified ? (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    <span>Verification Status</span>
                  </div>
                  <p className="text-sm font-medium text-white">
                    {user.isVerified ? "Email is confirmed" : "Verification pending"}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                    <span>Role Permission</span>
                  </div>
                  <p className="text-sm font-medium text-white">
                    {user.isAdmin ? "Administrator" : "Standard User"}
                  </p>
                </div>

                <div className="sm:col-span-2 p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="block text-xs text-gray-500 font-medium mb-1">
                      Unique Account Identifier
                    </span>
                    <code className="text-xs font-mono text-gray-300 break-all">
                      {user._id}
                    </code>
                  </div>
                  <Link
                    href={`/profile/${user._id}`}
                    className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium transition whitespace-nowrap"
                  >
                    <span>View Dynamic Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
