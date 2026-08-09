"use client";

import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const [showDetails, setShowDetails] = useState(false);

  // Fetch user when page loads
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/me");

        console.log("User details:", response.data);

        setUser(response.data.user);
      } catch (error: unknown) {
        console.error("Failed to fetch user details:", error);

        const axiosError = error as AxiosError<{
          error?: string;
        }>;

        toast.error(
          axiosError.response?.data?.error || "Failed to fetch user details",
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
      await axios.get("/api/users/logout");

      toast.success("Logout successful");

      router.push("/login");
    } catch (error: unknown) {
      console.error("Logout failed:", error);

      const axiosError = error as AxiosError<{
        error?: string;
      }>;

      toast.error(
        axiosError.response?.data?.error || "Something went wrong with logout",
      );
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">
        {/* Profile Title */}
        <h1 className="text-5xl font-bold mb-6">Profile</h1>

        {/* Welcome */}
        <p className="text-xl text-white mb-4">
          Welcome, {user?.name || "User"}!
        </p>

        <p className="text-gray-400 text-lg mb-8">
          Welcome to your profile page! Here you can view and manage your
          account information, update your settings, and access personalized
          features.
        </p>

        {/* User Details Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-white text-black py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          {showDetails ? "Hide User Details" : "User Details"}
        </button>

        {/* User Details */}
        {showDetails && user && (
          <div className="mt-8 p-6 rounded-2xl border border-gray-700 bg-gray-900 text-left">
            <h2 className="text-2xl font-bold mb-5">User Details</h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <p className="text-gray-500 text-sm">Name</p>

                <p className="text-white text-lg">{user.name}</p>
              </div>

              {/* Email */}
              <div>
                <p className="text-gray-500 text-sm">Email</p>

                <p className="text-white text-lg">{user.email}</p>
              </div>

              {/* Verified */}
              <div>
                <p className="text-gray-500 text-sm">Account Verified</p>

                <p className="text-white text-lg">
                  {user.isVerified ? "Yes" : "No"}
                </p>
              </div>

              {/* Admin */}
              <div>
                <p className="text-gray-500 text-sm">Admin</p>

                <p className="text-white text-lg">
                  {user.isAdmin ? "Yes" : "No"}
                </p>
              </div>

              {/* User ID */}
              <div>
                <p className="text-gray-500 text-sm">User ID</p>

                <p className="text-white text-sm break-all">{user._id}</p>
              </div>
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="mt-8">
          <button
            onClick={logout}
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
