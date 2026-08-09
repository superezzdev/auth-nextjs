import Link from "next/link";
import { ArrowLeft, User as UserIcon, ShieldCheck } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

export default async function UserProfileDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
              href="/profile"
              className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#27272a] hover:border-gray-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Profile</span>
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
        <div className="w-full max-w-xl p-8 sm:p-10 rounded-3xl bg-[#09090b] border border-[#27272a] shadow-2xl animate-slide-up">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6">
            <UserIcon className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-[#27272a] text-[11px] font-mono text-blue-400 font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DYNAMIC ROUTE PARAMETER</span>
          </div>

          <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">
            User Record
          </h1>

          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            This view resolves the dynamic identifier from the App Router URL segment and displays the verified identifier.
          </p>

          <div className="p-5 rounded-2xl bg-black border border-[#27272a] mb-8">
            <span className="text-[11px] font-mono uppercase text-gray-500 tracking-wider block mb-1 font-bold">
              Account ObjectId
            </span>
            <code className="text-sm font-mono text-blue-400 break-all font-bold">
              {id}
            </code>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/profile"
              className="w-full sm:w-auto flex-1 hc-btn-primary py-3.5 px-6 rounded-xl font-bold text-center text-xs sm:text-sm"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto hc-btn-secondary py-3.5 px-6 rounded-xl font-bold text-center text-xs sm:text-sm"
            >
              Landing Page
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
