"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  ShieldCheck,
  LockKeyhole,
  KeyRound,
  MailCheck,
  UserCheck,
  ArrowRight,
  Globe,
  Server,
  Terminal,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  const authFlowSteps = [
    {
      step: "01",
      title: "User Registration",
      desc: "User submits credentials. Password is encrypted with salt-hashed bcryptjs (10 rounds) and stored in MongoDB Atlas.",
      badge: "POST /api/users/signup",
      icon: UserCheck,
      color: "bg-blue-600",
    },
    {
      step: "02",
      title: "Email Verification",
      desc: "Cryptographic SHA-256 token is generated with a 1-hour expiration timestamp and dispatched via SMTP Nodemailer.",
      badge: "GET & POST /api/users/verifyemail",
      icon: MailCheck,
      color: "bg-emerald-600",
    },
    {
      step: "03",
      title: "JWT Cookie Issuance",
      desc: "Upon authentication, a signed JWT payload is embedded in a secure, SameSite, HTTP-only cookie inaccessible to client scripts.",
      badge: "POST /api/users/login",
      icon: KeyRound,
      color: "bg-purple-600",
    },
    {
      step: "04",
      title: "Middleware Guard",
      desc: "Next.js Edge Middleware intercepts requests to /profile, verifies cookie tokens, and blocks unauthorized route access.",
      badge: "middleware.ts",
      icon: ShieldCheck,
      color: "bg-amber-600",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
      {/* Top Banner Ticker */}
      <div className="border-b border-[#27272a] bg-[#09090b] px-4 py-2 text-xs font-mono text-gray-400 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white font-semibold">PRODUCTION-READY</span>
            <span className="hidden sm:inline text-gray-500">|</span>
            <span className="hidden sm:inline text-gray-400">
              Next.js 16 + MongoDB Atlas + JWT Cookies + Nodemailer
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-gray-500">
              Zero Glassmorphism • Flat Design • High Contrast
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="border-b border-[#27272a] bg-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-black text-black text-xl group-hover:bg-blue-500 group-hover:text-white transition-colors duration-200">
              A
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-wider block leading-tight">
                AUTH<span className="text-blue-500">.NEXT</span>
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-widest block uppercase">
                Enterprise Identity
              </span>
            </div>
          </Link>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#flow" className="hover:text-white transition-colors">
              Architecture
            </a>
            <a href="#api" className="hover:text-white transition-colors">
              API Specs
            </a>
            <Link href="/profile" className="hover:text-white transition-colors">
              Dashboard
            </Link>
          </nav>

          {/* Right Action & GitHub Repo Link */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-gray-300 hover:text-white px-4 py-2 transition-colors hidden sm:block"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="hc-btn-primary text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-lg flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* GitHub Repo Button (Corner Highlight) */}
            <a
              href="https://github.com/superezzdev/auth-nextjs"
              target="_blank"
              rel="noopener noreferrer"
              className="hc-btn-secondary px-3.5 py-2.5 rounded-lg flex items-center gap-2 text-xs font-mono group"
              title="View auth-nextjs on GitHub"
            >
              <GithubIcon className="w-4 h-4 text-white group-hover:text-blue-400 transition-colors" />
              <span className="hidden lg:inline font-bold">auth-nextjs</span>
              <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-28 border-b border-[#27272a] bg-gradient-to-b from-black via-[#050508] to-black">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#27272a] bg-[#09090b] text-xs font-mono text-gray-300 mb-8 animate-slide-up">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-white font-semibold">NEXT.JS FULL-STACK AUTHENTICATION</span>
            <span className="text-gray-500">•</span>
            <span className="text-blue-400">v1.0 Ready</span>
          </div>

          {/* HUGE Impact Tagline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.95] max-w-6xl mx-auto mb-8 animate-slide-up-delay-1">
            BULLETPROOF <span className="text-blue-500">AUTH</span>
            <br />
            <span className="text-white">FOR MODERN WEBS.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg sm:text-2xl max-w-3xl mx-auto font-normal leading-relaxed mb-12 animate-slide-up-delay-2">
            A high-performance, rock-solid authentication foundation with Next.js App Router, MongoDB Atlas connection pooling, cryptographic token verification, and HTTP-Only JWT security.
          </p>

          {/* Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16 animate-slide-up-delay-3">
            <Link
              href="/signup"
              className="w-full sm:w-auto hc-btn-primary px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2 shadow-2xl"
            >
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/profile"
              className="w-full sm:w-auto hc-btn-secondary px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2"
            >
              <span>View Dashboard</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#27272a]">
            <div className="p-4 bg-[#09090b] border border-[#27272a] rounded-xl text-left">
              <span className="text-xs font-mono text-gray-500 uppercase block mb-1">
                Security Engine
              </span>
              <span className="text-xl font-bold text-white block">Bcrypt (10 Rounds)</span>
            </div>
            <div className="p-4 bg-[#09090b] border border-[#27272a] rounded-xl text-left">
              <span className="text-xs font-mono text-gray-500 uppercase block mb-1">
                Cookie Storage
              </span>
              <span className="text-xl font-bold text-white block">HTTP-Only / SameSite</span>
            </div>
            <div className="p-4 bg-[#09090b] border border-[#27272a] rounded-xl text-left">
              <span className="text-xs font-mono text-gray-500 uppercase block mb-1">
                Serverless DB
              </span>
              <span className="text-xl font-bold text-white block">Mongoose Cache</span>
            </div>
            <div className="p-4 bg-[#09090b] border border-[#27272a] rounded-xl text-left">
              <span className="text-xs font-mono text-gray-500 uppercase block mb-1">
                Verification
              </span>
              <span className="text-xl font-bold text-white block">SHA-256 Tokens</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Architecture Flow Section */}
      <section id="flow" className="py-24 px-6 border-b border-[#27272a] bg-[#050507]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold block mb-2">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
              How the Auth Pipeline Works
            </h2>
            <p className="text-gray-400 mt-4 text-base sm:text-lg">
              Explore the four-stage lifecycle powering secure user authentication, token dispatch, and route protection.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Step Selector List */}
            <div className="lg:col-span-5 space-y-3">
              {authFlowSteps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = activeStep === idx;
                return (
                  <button
                    key={step.step}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer ${
                      isActive
                        ? "bg-[#141419] border-blue-500 shadow-lg"
                        : "bg-[#09090b] border-[#27272a] hover:border-gray-700 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shrink-0 ${step.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono text-gray-400 font-bold">
                          STAGE {step.step}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-xs text-gray-400 line-clamp-2">{step.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Interactive Detail Display */}
            <div className="lg:col-span-7 hc-card-static rounded-3xl p-8 border border-[#27272a] bg-[#09090b]">
              <div className="flex items-center justify-between pb-6 border-b border-[#27272a] mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${authFlowSteps[activeStep].color}`}
                  >
                    {React.createElement(authFlowSteps[activeStep].icon, {
                      className: "w-5 h-5",
                    })}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-400 block">
                      STAGE {authFlowSteps[activeStep].step}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {authFlowSteps[activeStep].title}
                    </h3>
                  </div>
                </div>
                <code className="text-xs font-mono px-3 py-1.5 rounded-lg bg-black border border-[#27272a] text-blue-400">
                  {authFlowSteps[activeStep].badge}
                </code>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-2">
                    Mechanism Description
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {authFlowSteps[activeStep].desc}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black border border-[#27272a] font-mono text-xs text-gray-300">
                  <div className="flex items-center justify-between text-gray-500 text-[10px] pb-2 border-b border-[#27272a] mb-3">
                    <span>SECURITY IMPLEMENTATION</span>
                    <span className="text-emerald-400">VERIFIED</span>
                  </div>
                  {activeStep === 0 && (
                    <div className="space-y-1 text-gray-400">
                      <p className="text-blue-400">{"// 1. Validate payload fields"}</p>
                      <p>const {`{ name, email, password }`} = await request.json();</p>
                      <p className="text-purple-400">{"// 2. Hash with 10 salt rounds"}</p>
                      <p>const hashedPassword = await bcrypt.hash(password, 10);</p>
                      <p className="text-emerald-400">{"// 3. Save to MongoDB"}</p>
                      <p>await newUser.save();</p>
                    </div>
                  )}
                  {activeStep === 1 && (
                    <div className="space-y-1 text-gray-400">
                      <p className="text-blue-400">{"// 1. Generate 32-byte secure random token"}</p>
                      <p>const token = crypto.randomBytes(32).toString(&quot;hex&quot;);</p>
                      <p className="text-purple-400">{"// 2. Store sha256 hash in User document"}</p>
                      <p>const hashedToken = crypto.createHash(&quot;sha256&quot;).update(token).digest(&quot;hex&quot;);</p>
                      <p className="text-emerald-400">{"// 3. Send email with verification URL"}</p>
                      <p>await transporter.sendMail(mailOptions);</p>
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div className="space-y-1 text-gray-400">
                      <p className="text-blue-400">{"// 1. Compare credentials with bcrypt"}</p>
                      <p>const valid = await bcrypt.compare(password, user.password);</p>
                      <p className="text-purple-400">{"// 2. Generate signed JWT token"}</p>
                      <p>const token = jwt.sign(tokenData, process.env.JWT_SECRET, {`{ expiresIn: "1h" }`});</p>
                      <p className="text-emerald-400">{"// 3. Set HTTP-only secure cookie"}</p>
                      <p>response.cookies.set(&quot;token&quot;, token, {`{ httpOnly: true, sameSite: "strict" }`});</p>
                    </div>
                  )}
                  {activeStep === 3 && (
                    <div className="space-y-1 text-gray-400">
                      <p className="text-blue-400">{"// 1. Read token from incoming request"}</p>
                      <p>const token = request.cookies.get(&quot;token&quot;)?.value;</p>
                      <p className="text-purple-400">{"// 2. Guard protected profile routes"}</p>
                      <p>if (!token &amp;&amp; path.startsWith(&quot;/profile&quot;)) return redirect(&quot;/login&quot;);</p>
                      <p className="text-emerald-400">{"// 3. Allow verified access"}</p>
                      <p>return NextResponse.next();</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-500 font-mono">
                    Ready to test this in action?
                  </span>
                  <Link
                    href="/signup"
                    className="hc-btn-primary px-5 py-2 rounded-lg text-xs flex items-center gap-1.5"
                  >
                    <span>Test Flow Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="py-24 px-6 border-b border-[#27272a] bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold block mb-2">
              CORE CAPABILITIES
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
              Engineered for Production
            </h2>
            <p className="text-gray-400 mt-4 text-base sm:text-lg">
              High-contrast, robust components designed for zero downtime, strict security, and clean separation of concerns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="hc-card p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  HTTP-Only JWT Security
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Tokens are never exposed in JavaScript runtime storage (LocalStorage/SessionStorage), preventing XSS token harvesting attacks completely.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-gray-500">
                <span>SameSite=Strict</span>
                <span className="text-blue-400">Zero XSS Leak</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="hc-card p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white mb-6">
                  <Server className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Serverless Connection Cache
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Mongoose connection pooling cached across global execution scope for Vercel Lambdas, preventing database socket exhaustion.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-gray-500">
                <span>Global Connection Pool</span>
                <span className="text-emerald-400">Vercel Ready</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="hc-card p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white mb-6">
                  <MailCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Token Verification Flow
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Automated SHA-256 token hashing with 1-hour expiration. Direct email verification link with Suspense query param parsing.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-gray-500">
                <span>Nodemailer + Mailtrap</span>
                <span className="text-purple-400">Auto Expire</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="hc-card p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-600 flex items-center justify-center text-white mb-6">
                  <LockKeyhole className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Edge Middleware Protection
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Edge-computed path matcher intercepting incoming requests at the Vercel edge before running costly serverless functions.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-gray-500">
                <span>Next.js Edge</span>
                <span className="text-amber-400">&lt; 10ms Latency</span>
              </div>
            </div>

            {/* Card 5 */}
            <div className="hc-card p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-rose-600 flex items-center justify-center text-white mb-6">
                  <KeyRound className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Bcrypt 10 Salt Rounds
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Adaptive one-way cryptographic hashing guaranteeing raw passwords are never saved, logged, or exposed in plaintext.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-gray-500">
                <span>One-way Hash</span>
                <span className="text-rose-400">Salt Encrypted</span>
              </div>
            </div>

            {/* Card 6 */}
            <div className="hc-card p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-cyan-600 flex items-center justify-center text-white mb-6">
                  <Terminal className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Strict TypeScript &amp; ESLint
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Zero TypeScript errors, zero ESLint warnings, fully typed Mongoose schemas, and Next.js 16 App Router standards.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-gray-500">
                <span>Type Check Clean</span>
                <span className="text-cyan-400">100% Validated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference Preview Section */}
      <section id="api" className="py-24 px-6 border-b border-[#27272a] bg-[#050508]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold block mb-2">
              REST INTERFACE
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
              Standardized API Endpoints
            </h2>
            <p className="text-gray-400 mt-4 text-base sm:text-lg">
              Clean HTTP endpoints returning structured JSON responses for seamless client integration.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto font-mono text-xs">
            <div className="p-5 bg-[#09090b] border border-[#27272a] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold text-[11px]">
                  POST
                </span>
                <span className="text-white font-bold text-sm">/api/users/signup</span>
              </div>
              <span className="text-gray-400">Registers new user, hashes password, triggers email</span>
            </div>

            <div className="p-5 bg-[#09090b] border border-[#27272a] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold text-[11px]">
                  POST
                </span>
                <span className="text-white font-bold text-sm">/api/users/login</span>
              </div>
              <span className="text-gray-400">Validates credentials &amp; sets HTTP-only JWT cookie</span>
            </div>

            <div className="p-5 bg-[#09090b] border border-[#27272a] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold text-[11px]">
                  GET
                </span>
                <span className="text-white font-bold text-sm">/api/users/me</span>
              </div>
              <span className="text-gray-400">Reads cookie token &amp; returns sanitized user data</span>
            </div>

            <div className="p-5 bg-[#09090b] border border-[#27272a] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-purple-600 text-white font-bold text-[11px]">
                  POST &amp; GET
                </span>
                <span className="text-white font-bold text-sm">/api/users/verifyemail</span>
              </div>
              <span className="text-gray-400">Validates SHA-256 token and marks account verified</span>
            </div>

            <div className="p-5 bg-[#09090b] border border-[#27272a] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-rose-600 text-white font-bold text-[11px]">
                  GET &amp; POST
                </span>
                <span className="text-white font-bold text-sm">/api/users/logout</span>
              </div>
              <span className="text-gray-400">Clears auth cookie and destroys active session</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="py-20 px-6 border-b border-[#27272a] bg-black">
        <div className="max-w-5xl mx-auto hc-card-static rounded-3xl p-10 sm:p-14 border border-[#27272a] bg-[#09090b] text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Ready to Deploy to Vercel?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Get the source code, configure your MongoDB Atlas URI, and deploy in less than 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/superezzdev/auth-nextjs"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto hc-btn-primary px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-bold"
            >
              <GithubIcon className="w-5 h-5" />
              <span>Clone Repository</span>
            </a>
            <Link
              href="/signup"
              className="w-full sm:w-auto hc-btn-secondary px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-semibold"
            >
              <span>Test Live Auth</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer with Required Author GitHub & Portfolio Links */}
      <footer className="bg-black py-16 px-6 border-t border-[#27272a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#27272a]">
            {/* Col 1: Brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center font-black text-black text-lg">
                  A
                </div>
                <span className="text-lg font-extrabold tracking-wider">
                  AUTH<span className="text-blue-500">.NEXT</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                A modern, production-ready authentication template for Next.js App Router applications with MongoDB Atlas and Nodemailer.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://github.com/superezzdev/auth-nextjs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-xs font-mono text-gray-300 hover:text-white hover:border-gray-600 transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>auth-nextjs</span>
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-white transition-colors">
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-white transition-colors">
                    User Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/verifyemail" className="hover:text-white transition-colors">
                    Verify Email
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Author & Portfolio Info */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold mb-4">
                Creator &amp; Portfolio
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="https://github.com/superezzdev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <GithubIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                    <span className="font-semibold">@superezzdev</span>
                    <ExternalLink className="w-3 h-3 text-gray-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://superezz.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <Globe className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                    <span className="font-semibold">superezz.dev</span>
                    <ExternalLink className="w-3 h-3 text-gray-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/superezzdev/auth-nextjs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-xs font-mono pt-1"
                  >
                    <span>⭐ Star repo on GitHub</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom copyright line */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
            <p>
              Designed and built by{" "}
              <a
                href="https://superezz.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white underline font-semibold"
              >
                superezz.dev
              </a>{" "}
              (
              <a
                href="https://github.com/superezzdev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white underline font-semibold"
              >
                @superezzdev
              </a>
              ). Open source under MIT license.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Next.js 16 Turbopack</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}