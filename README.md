# Next.js Full-Stack Authentication System

A secure, production-ready full-stack authentication web application built with **Next.js (App Router)**, **TypeScript**, **MongoDB (Mongoose)**, **JWT Cookies**, and **Nodemailer**.

---

## Features

- **Authentication**: Secure Signup, Login, and Logout flows using bcryptjs password hashing and JWT.
- **HTTP-Only Cookies**: JWT tokens stored securely in HTTP-only, SameSite cookies.
- **Route Protection**: Next.js Middleware guarding protected dashboard routes (`/profile`, `/profile/:id`).
- **Email Verification**: Token-based email verification using crypto sha-256 hashes and Nodemailer / Mailtrap.
- **Serverless-Ready Database**: Mongoose connection caching configured for Vercel Serverless Functions.
- **Modern UI**: Dark aesthetic with Tailwind CSS v4, Lucide icons, and React Hot Toast notifications.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons & Notifications**: [Lucide React](https://lucide.dev/) & [React Hot Toast](https://react-hot-toast.com/)
- **Email Delivery**: [Nodemailer](https://nodemailer.com/) & [Mailtrap](https://mailtrap.io/)

---

## Getting Started

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`):

```bash
cp .env.example .env
```

Fill in your configuration:

```env
# MongoDB Connection String (Atlas or Local)
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/auth-nextjs?retryWrites=true&w=majority

# JWT Signing Secret
JWT_SECRET=your_jwt_secret_key_here

# Base Domain
DOMAIN=http://localhost:3000

# Mailtrap / SMTP Credentials
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_KEY=your_mailtrap_password
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploying to Vercel

Follow these steps to deploy this project on [Vercel](https://vercel.com):

### Step 1: Push Code to GitHub / GitLab / Bitbucket
Ensure your repository has all latest code and is pushed to your Git provider.

### Step 2: Import Project into Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New" > "Project"**.
2. Select your `auth-nextjs` repository and click **Import**.
3. Framework Preset will be automatically detected as **Next.js**.

### Step 3: Configure Environment Variables on Vercel
Under the **Environment Variables** section, add the following keys:

| Key | Description | Example |
|---|---|---|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `your-secure-random-string` |
| `DOMAIN` | Production domain | `https://your-project.vercel.app` |
| `MAILTRAP_HOST` | SMTP Host | `smtp.mailtrap.io` or `live.smtp.mailtrap.io` |
| `MAILTRAP_PORT` | SMTP Port | `2525` or `587` |
| `MAILTRAP_USER` | SMTP User | `<username>` |
| `MAILTRAP_KEY` | SMTP Password / Key | `<password>` |

### Step 4: MongoDB Atlas Network Access (Crucial for Vercel)
In your [MongoDB Atlas Dashboard](https://cloud.mongodb.com/):
1. Navigate to **Security > Network Access**.
2. Click **Add IP Address**.
3. Select **Allow Access From Anywhere (`0.0.0.0/0`)** so Vercel Serverless Functions can connect to your database.

### Step 5: Deploy
Click **Deploy**. Vercel will build and deploy your application.

---

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/users/
│   │   │   ├── login/route.ts       # POST /api/users/login
│   │   │   ├── logout/route.ts      # GET & POST /api/users/logout
│   │   │   ├── me/route.ts          # GET /api/users/me
│   │   │   ├── signup/route.ts      # POST /api/users/signup
│   │   │   └── verifyemail/route.ts # POST & GET /api/users/verifyemail
│   │   ├── login/page.tsx           # Login page
│   │   ├── signup/page.tsx          # Signup page
│   │   ├── profile/
│   │   │   ├── page.tsx             # User profile dashboard
│   │   │   └── [id]/page.tsx        # Dynamic profile view
│   │   ├── verifyemail/page.tsx     # Email verification handler
│   │   ├── globals.css              # Tailwind CSS styles
│   │   ├── layout.tsx               # Root layout with Toaster
│   │   └── page.tsx                 # Landing page
│   ├── dbConfig/
│   │   └── db.ts                    # Global cached Mongoose connection
│   ├── helpers/
│   │   ├── getDataFromToken.ts      # JWT extraction helper
│   │   └── mailer.ts                # Nodemailer email dispatcher
│   ├── models/
│   │   └── userModel.ts             # Mongoose User Schema
│   └── middleware.ts                # Next.js route protection middleware
├── .env.example                     # Environment variables template
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies and scripts
└── tsconfig.json                    # TypeScript configuration
```

---

## Available Scripts

- `npm run dev`: Starts the Turbopack development server.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Runs the built app in production mode.
- `npm run lint`: Runs ESLint checks.
