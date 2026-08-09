"use client";

import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
              <span className="text-2xl font-bold text-black">B</span>
            </div>

            <span className="text-xl font-bold">Auth NextJS</span>
          </div>

          <Link
            href="/profile"
            className="border border-gray-700 px-5 py-2.5 rounded-full hover:bg-gray-900 transition"
          >
            Profile
          </Link>
        </div>

        {/* Hero */}
        <section className="text-center">
          <div className="inline-block px-4 py-2 rounded-full border border-gray-800 text-gray-400 text-sm mb-6">
            Authentication Dashboard
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Welcome back
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-8">
            Your account is authenticated successfully. Manage your profile and
            account information from your dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/profile"
              className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition"
            >
              View Profile
            </Link>

            <Link
              href="/profile"
              className="border border-gray-700 px-8 py-4 rounded-full font-bold hover:bg-gray-900 transition"
            >
              User Details
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-6 mt-24">
          <div className="border border-gray-800 rounded-2xl p-6 bg-gray-950">
            <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center mb-5">
              🔐
            </div>

            <h2 className="text-xl font-bold mb-3">Secure Authentication</h2>

            <p className="text-gray-400 leading-7">
              Your authentication is protected using JWT tokens and secure
              HTTP-only cookies.
            </p>
          </div>

          <div className="border border-gray-800 rounded-2xl p-6 bg-gray-950">
            <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center mb-5">
              👤
            </div>

            <h2 className="text-xl font-bold mb-3">User Profile</h2>

            <p className="text-gray-400 leading-7">
              View your account information and manage your personal profile.
            </p>
          </div>

          <div className="border border-gray-800 rounded-2xl p-6 bg-gray-950">
            <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center mb-5">
              ✉️
            </div>

            <h2 className="text-xl font-bold mb-3">Email Verification</h2>

            <p className="text-gray-400 leading-7">
              Verify your email address and securely reset your password when
              needed.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© 2026 Auth NextJS. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
  