"use client";

import Link from "next/link";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");

      toast.success("Logout successful");

      router.push("/login");
    } catch (error: unknown) {
      console.error("Logout failed:", error);

      const axiosError = error as AxiosError<{ error?: string }>;

      toast.error(
        axiosError.response?.data?.error || "Something went wrong with logout",
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-6">Profile</h1>

        <p className="text-gray-400 text-lg mb-8">
          Welcome to your profile page! Here you can view and manage your
          account information, update your settings, and access personalized
          features.
        </p>

        <button
          onClick={logout}
          className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
