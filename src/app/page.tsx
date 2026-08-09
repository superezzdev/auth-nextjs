"use client";

import Link from "next/link";
import React from "react";
import { ShieldCheck, UserCheck, MailCheck, ArrowRight, LockKeyhole } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-16 relative">
        {/* Navigation / Header */}
        <header className="flex items-center justify-between mb-24">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-black">B</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Auth NextJS</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-full transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-sm font-semibold bg-white text-black px-5 py-2.5 rounded-full hover:bg-gray-200 transition shadow-md"
            >
              Get Started
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-800 bg-gray-950/80 text-gray-300 text-xs font-medium mb-8 backdrop-blur-md">
            <LockKeyhole className="w-3.5 h-3.5 text-blue-400" />
            <span>Production-Ready Next.js Authentication</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Secure Full-Stack Authentication
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            A complete authentication architecture built with Next.js App Router, MongoDB Atlas, JSON Web Tokens, and Nodemailer email verification.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-semibold hover:bg-gray-200 transition shadow-lg text-sm"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/profile"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-gray-800 bg-gray-950/60 px-8 py-3.5 rounded-full font-semibold text-gray-300 hover:text-white hover:bg-gray-900 transition text-sm"
            >
              Go to Profile
            </Link>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid md:grid-cols-3 gap-6 mt-28">
          <div className="border border-gray-800/80 rounded-3xl p-7 bg-gray-950/60 backdrop-blur-md hover:border-gray-700 transition">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-lg font-bold mb-2.5 text-white">
              JWT &amp; HTTP-Only Cookies
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Cryptographically signed tokens stored in secure, SameSite, HTTP-only cookies with automatic Next.js middleware protection.
            </p>
          </div>

          <div className="border border-gray-800/80 rounded-3xl p-7 bg-gray-950/60 backdrop-blur-md hover:border-gray-700 transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
              <UserCheck className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-lg font-bold mb-2.5 text-white">
              User Profile Management
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dedicated user dashboard fetching real-time MongoDB profile data, role attributes, and dynamic routing for identifiers.
            </p>
          </div>

          <div className="border border-gray-800/80 rounded-3xl p-7 bg-gray-950/60 backdrop-blur-md hover:border-gray-700 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <MailCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-lg font-bold mb-2.5 text-white">
              Email Token Verification
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Automated hash token generation, expiration tracking, and one-click verification workflows with Nodemailer &amp; Mailtrap.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-28 pt-8 border-t border-gray-800/80 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Auth NextJS. Production-ready Next.js &amp; MongoDB.</p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-gray-400 transition">
              Sign In
            </Link>
            <Link href="/signup" className="hover:text-gray-400 transition">
              Sign Up
            </Link>
            <Link href="/profile" className="hover:text-gray-400 transition">
              Profile
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}