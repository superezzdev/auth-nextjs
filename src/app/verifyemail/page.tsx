"use client";

import axios from "axios";
import Link from "next/link";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, ArrowRight, MailCheck } from "lucide-react";

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
    <div className="w-full max-w-md p-8 rounded-3xl border border-gray-800 bg-gray-950/80 backdrop-blur-xl shadow-2xl text-center">
      {/* Icon Badge */}
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-gray-900 border border-gray-800">
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

      {/* Header */}
      <h1 className="text-3xl font-bold tracking-tight mb-3 text-white">
        {loading
          ? "Verifying Email..."
          : verified
            ? "Email Verified!"
            : error
              ? "Verification Failed"
              : "Verify Your Email"}
      </h1>

      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
        {loading
          ? "Please wait while we validate your verification token."
          : verified
            ? "Your email has been successfully confirmed. You can now access your account."
            : error
              ? error
              : "No token was provided in the URL. Please click the link sent to your inbox."}
      </p>

      {/* Token preview */}
      {token && (
        <div className="p-3 mb-6 rounded-xl bg-gray-900/60 border border-gray-800/80 text-xs font-mono text-gray-400 truncate">
          <span className="text-gray-500 mr-2">Token:</span>
          {token.slice(0, 16)}...
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {verified && (
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-semibold bg-white text-black hover:bg-gray-200 transition shadow-lg"
          >
            <span>Proceed to Login</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}

        {error && (
          <div className="flex flex-col gap-2">
            {token && (
              <button
                onClick={() => handleVerify(token)}
                className="w-full py-3.5 px-6 rounded-full font-semibold bg-white text-black hover:bg-gray-200 transition cursor-pointer"
              >
                Try Again
              </button>
            )}
            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-full font-semibold border border-gray-800 text-gray-300 hover:bg-gray-900 transition"
            >
              Back to Login
            </Link>
          </div>
        )}

        {!token && !loading && !verified && (
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-full font-semibold bg-white text-black hover:bg-gray-200 transition"
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <Suspense
        fallback={
          <div className="w-full max-w-md p-8 rounded-3xl border border-gray-800 bg-gray-950 text-center text-gray-400">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
            <p>Loading verification page...</p>
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
