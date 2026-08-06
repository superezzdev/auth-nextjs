
"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",});

  const onLogin = async () => {};

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <div className="text-center">
          {/* Replace with your logo */}
          <div className="w-32 h-32 mx-auto rounded-3xl bg-white flex items-center justify-center">
            <span className="text-6xl font-bold text-black">B</span>
          </div>

          <p className="mt-4 text-xl text-gray-400">
            Build Faster. Grow Smarter.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h2 className="text-5xl font-bold mb-10">Login to your account</h2>

          <form className="space-y-5">
           

            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-white text-black py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="mx-4 text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          <button className="w-full border border-gray-700 rounded-full py-4 hover:bg-gray-900 transition">
            Continue with Google
          </button>

          <button className="w-full border border-gray-700 rounded-full py-4 mt-4 hover:bg-gray-900 transition">
            Continue with GitHub
          </button>

          <p 
          onClick={onLogin}
          className="text-gray-500 mt-8 text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
