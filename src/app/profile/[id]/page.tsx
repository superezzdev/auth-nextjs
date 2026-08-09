import Link from "next/link";
import { ArrowLeft, User as UserIcon } from "lucide-react";

export default async function UserProfileDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl p-8 rounded-3xl border border-gray-800 bg-gray-950/80 backdrop-blur-xl shadow-2xl">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </Link>

        <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mb-6">
          <UserIcon className="w-8 h-8 text-blue-400" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">
          User Profile
        </h1>

        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Welcome to the user profile details view. Below is the registered identifier for this account.
        </p>

        <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 mb-6">
          <span className="block text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">
            User ID
          </span>
          <code className="text-sm font-mono text-blue-400 break-all">{id}</code>
        </div>

        <Link
          href="/profile"
          className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-full font-semibold bg-white text-black hover:bg-gray-200 transition shadow-lg text-sm"
        >
          Return to Dashboard
        </Link>
      </div>
    </main>
  );
}
