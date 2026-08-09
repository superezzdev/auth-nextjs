"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);
  const buttonDisabled =
    user.name.length === 0 || user.email.length === 0 || user.password.length === 0;

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);

      console.log("Signup successful:", response.data);

      toast.success("Signup successful! Redirecting to login...");

      router.push("/login");
    } catch (error: unknown) {
      console.log(error);

      const axiosError = error as AxiosError<{ error?: string }>;

      toast.error(
        axiosError.response?.data?.error || "Something went wrong with signup",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <div className="text-center">
          {/* Logo */}
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
          <h2 className="text-5xl font-bold mb-10">Create your account</h2>

          <form onSubmit={onSignup} className="space-y-5">
            {/* Name */}
            <input
              type="text"
              value={user.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
              placeholder="Full Name"
              className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Email */}
            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              placeholder="Email"
              className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Password */}
            <input
              type="password"
              value={user.password}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
              placeholder="Password"
              className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Create Account */}
            <button
              type="submit"
              disabled={buttonDisabled || loading}
              className="w-full py-4 rounded-full font-bold text-lg transition-all bg-white text-black hover:bg-gray-200 disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-700"></div>

            <span className="mx-4 text-gray-400">or</span>

            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full border border-gray-700 rounded-full py-4 hover:bg-gray-900 transition"
          >
            Continue with Google
          </button>

          {/* GitHub */}
          <button
            type="button"
            className="w-full border border-gray-700 rounded-full py-4 mt-4 hover:bg-gray-900 transition"
          >
            Continue with GitHub
          </button>

          {/* Login */}
          <div className="text-center mt-8 text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
