"use client";

import axios from "axios";
import Link from "next/link";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  MailCheck,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manual retry function
  const handleVerify = useCallback(async (tokenToVerify: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/users/verifyemail", {
        token: tokenToVerify,
      });

      if (response.data.success) {
        setVerified(true);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Email verification failed");
      } else {
        setError("An unexpected error occurred during email verification");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-verify when token is detected in URL
  useEffect(() => {
    if (!token) return;

    let isSubscribed = true;

    axios
      .post("/api/users/verifyemail", { token })
      .then((response) => {
        if (isSubscribed && response.data.success) {
          setVerified(true);
        }
      })
      .catch((err: unknown) => {
        if (isSubscribed) {
          if (axios.isAxiosError(err)) {
            setError(err.response?.data?.error || "Email verification failed");
          } else {
            setError("An unexpected error occurred during email verification");
          }
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [token]);

  return (
    <div className="w-full max-w-lg p-8 sm:p-12 rounded-3xl bg-[#09090b] border border-[#27272a] shadow-2xl text-center animate-slide-up">
      {/* Icon Badge */}
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-black border border-[#27272a]">
        {loading ? (
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        ) : verified ? (
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        ) : error ? (
          <XCircle className="w-10 h-10 text-rose-500" />
        ) : (
          <MailCheck className="w-10 h-10 text-gray-400" />
        )}
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-[#27272a] text-[11px] font-mono text-blue-400 font-semibold mb-4">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>SHA-256 TOKEN VALIDATOR</span>
      </div>

      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-3 text-white">
        {loading
          ? "Verifying Token..."
          : verified
            ? "Email Verified!"
            : error
              ? "Verification Failed"
              : "Email Verification"}
      </h1>

      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
        {loading
          ? "Validating cryptographic token hash against database records..."
          : verified
            ? "Your email address has been confirmed successfully. You can now access your authenticated account."
            : error
              ? error
              : "No verification token found in URL. Please click the link sent to your registered email inbox."}
      </p>

      {/* Token preview */}
      {token && (
        <div className="p-4 mb-6 rounded-2xl bg-black border border-[#27272a] text-xs font-mono text-gray-400 text-left">
          <span className="text-gray-500 uppercase text-[10px] font-bold block mb-1">
            Incoming Token Hash
          </span>
          <code className="text-blue-400 break-all">{token}</code>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {verified && (
          <Link
            href="/login"
            className="w-full hc-btn-primary py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 text-sm"
          >
            <span>Proceed to Login</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}

        {error && (
          <div className="flex flex-col sm:flex-row gap-3">
            {token && (
              <button
                onClick={() => handleVerify(token)}
                className="flex-1 hc-btn-primary py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm cursor-pointer"
              >
                Retry Validation
              </button>
            )}
            <Link
              href="/login"
              className="flex-1 hc-btn-secondary py-3.5 px-6 rounded-xl font-bold text-center text-xs sm:text-sm"
            >
              Return to Login
            </Link>
          </div>
        )}

        {!token && !loading && !verified && (
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl font-bold hc-btn-primary text-sm"
          >
            Go to Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
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
      <main className="flex-1 flex items-center justify-center p-6">
        <Suspense
          fallback={
            <div className="w-full max-w-lg p-10 rounded-3xl bg-[#09090b] border border-[#27272a] text-center font-mono text-xs text-gray-400">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
              <p>LOADING VERIFICATION MODULE...</p>
            </div>
          }
        >
          <VerifyEmailContent />
        </Suspense>
      </main>
    </div>
  );
}
