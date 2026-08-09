# 🔐 AUTH.NEXT — Production-Grade Next.js Authentication System

A rock-solid, production-ready, full-stack authentication web application engineered with **Next.js (App Router)**, **TypeScript**, **MongoDB Atlas (Mongoose)**, **HTTP-Only JWT Cookies**, and **Nodemailer**.

Designed with **high contrast, flat UI aesthetics, zero glassmorphism, zero blur effects**, and smooth micro-animations.

---

## 🌟 Live Demo & Links

- **Repository**: [https://github.com/superezzdev/auth-nextjs](https://github.com/superezzdev/auth-nextjs)
- **Author GitHub**: [https://github.com/superezzdev/](https://github.com/superezzdev/)
- **Author Portfolio**: [https://superezz.dev](https://superezz.dev)

---

## 📖 What This Application Does

This application provides a complete, production-ready identity and authentication system for Next.js web applications. It includes end-to-end user registration, password encryption, automated email verification, JWT session issuance, and route guarding.

### Core Features & Architecture

1. **User Registration (`/signup` & `POST /api/users/signup`)**:
   - Accepts user name, email, and password.
   - Encrypts password using **bcryptjs with 10 salt rounds** (adaptive one-way hashing).
   - Generates a secure, 32-byte cryptographic verification token.
   - Stores the SHA-256 hash of the token in MongoDB alongside a 1-hour expiration timestamp.
   - Dispatches a verification email to the user with a direct confirmation URL.

2. **Email Verification (`/verifyemail` & `POST /api/users/verifyemail`)**:
   - User clicks the link received in their email (`/verifyemail?token=<token>`).
   - The application computes the SHA-256 hash of the incoming token and checks MongoDB for a non-expired matching record.
   - Sets `isVerified: true`, invalidates the token, and prompts the user to log in.

3. **User Authentication (`/login` & `POST /api/users/login`)**:
   - Compares raw candidate password with the stored bcrypt hash.
   - Signs a secure JSON Web Token (JWT) containing user ID, email, and name.
   - Attaches the JWT in an **HTTP-Only, SameSite=Strict cookie**, rendering the session completely immune to client-side XSS token theft.

4. **Edge Route Protection (`middleware.ts`)**:
   - Next.js Edge Middleware intercepts incoming requests to `/profile` and sub-paths.
   - Validates presence of the session token before allowing route execution.
   - Automatically redirects unauthenticated traffic to `/login`, and redirects logged-in users visiting `/login` or `/signup` to `/profile`.

5. **Authenticated User Profile (`/profile` & `GET /api/users/me`)**:
   - Reads the HTTP-only cookie, decodes user credentials, and fetches sanitized account attributes from MongoDB.
   - Displays verification status, permission level, and MongoDB document ID.
   - Includes dynamic route segment `/profile/[id]` for resolving specific user records.

6. **Secure Session Destruction (`GET & POST /api/users/logout`)**:
   - Clears the HTTP-only `token` cookie with `maxAge: 0`, safely terminating the authenticated session.

---

## 🏗️ Technical Architecture & Workflow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Browser as Browser Client
    participant Edge as Edge Middleware
    participant API as Next.js Route Handlers
    participant DB as MongoDB Atlas
    participant SMTP as Nodemailer / Mailtrap

    %% Signup Flow
    Note over User,SMTP: 1. User Registration Flow
    User->>Browser: Enters Name, Email & Password
    Browser->>API: POST /api/users/signup
    API->>API: bcrypt.hash(password, 10)
    API->>API: crypto.randomBytes(32) & sha256 hash
    API->>DB: Save User { password: hash, verifyToken: sha256, isVerified: false }
    API->>SMTP: sendEmail(type: "VERIFY", token)
    SMTP-->>User: Delivers Verification Link (/verifyemail?token=...)
    API-->>Browser: 201 Created

    %% Verification Flow
    Note over User,DB: 2. Email Verification Flow
    User->>Browser: Clicks Email Link
    Browser->>API: POST /api/users/verifyemail { token }
    API->>API: sha256(token)
    API->>DB: findOne({ verifyToken: hashedToken, verifyTokenExpiry: > now })
    API->>DB: user.isVerified = true, delete tokens
    API-->>Browser: 200 Email Verified

    %% Login Flow
    Note over User,Browser: 3. Authentication & Cookie Issuance
    User->>Browser: Enters Credentials
    Browser->>API: POST /api/users/login
    API->>DB: findOne({ email })
    API->>API: bcrypt.compare(password, user.password)
    API->>API: jwt.sign({ id, email, name }, JWT_SECRET, { expiresIn: "1h" })
    API-->>Browser: Set-Cookie: token=JWT; HttpOnly; SameSite=Strict; Path=/
    Browser->>Browser: Redirects to /profile

    %% Protected Route
    Note over Browser,DB: 4. Protected Route Interception
    Browser->>Edge: Request /profile
    Edge->>Edge: Validate request.cookies.get("token")
    alt Token Present
        Edge-->>Browser: Allow Request to /profile
        Browser->>API: GET /api/users/me
        API->>DB: findById(token.id)
        API-->>Browser: Returns User Profile Data
    else No Token
        Edge-->>Browser: 307 Redirect -> /login
    end
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | React Server Components, Turbopack, Route Handlers, Edge Middleware |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end static type safety |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) + [Mongoose](https://mongoosejs.com/) | Persistent document storage with serverless connection pooling |
| **Security** | [bcryptjs](https://www.npmjs.com/package/bcryptjs) + [jsonwebtoken](https://jwt.io/) | Salt-hashed password storage & cryptographically signed tokens |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | High contrast, flat, modern dark design with custom keyframe motions |
| **Icons & Alerts**| [Lucide React](https://lucide.dev/) + [React Hot Toast](https://react-hot-toast.com/) | Flat vector iconography & toast notifications |
| **Email Service**| [Nodemailer](https://nodemailer.com/) + [Mailtrap](https://mailtrap.io/) | SMTP email dispatcher for verification links |

---

## 🚀 How to Use This Project

### Prerequisites
- Node.js 18.18+ or Node.js 20+
- A MongoDB database (local or free cloud cluster on [MongoDB Atlas](https://cloud.mongodb.com))
- Mailtrap account (or any custom SMTP credentials) for email testing

### Step 1: Clone the Repository
```bash
git clone https://github.com/superezzdev/auth-nextjs.git
cd auth-nextjs
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Configure your environment keys:
```env
# MongoDB Atlas Connection URI
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/auth-nextjs?retryWrites=true&w=majority

# JWT Signing Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Base Application Domain (used for verification links)
DOMAIN=http://localhost:3000

# Mailtrap / SMTP Credentials
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_KEY=your_mailtrap_password
```

### Step 4: Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel (Step-by-Step)

### 1. Import Project to Vercel
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
3. Select your `auth-nextjs` repository and import.

### 2. Configure Environment Variables in Vercel
Under the **Environment Variables** tab, add:
- `MONGO_URI`: Your MongoDB Atlas connection URI.
- `JWT_SECRET`: A secure random string for signing tokens.
- `DOMAIN`: `https://<your-project-name>.vercel.app`
- `MAILTRAP_HOST`, `MAILTRAP_PORT`, `MAILTRAP_USER`, `MAILTRAP_KEY`: Your SMTP credentials.

### 3. Configure MongoDB Atlas Network Access
In your [MongoDB Atlas Dashboard](https://cloud.mongodb.com/):
1. Go to **Security > Network Access**.
2. Click **Add IP Address**.
3. Select **Allow Access From Anywhere (`0.0.0.0/0`)** to allow Vercel Serverless Lambdas to connect.

### 4. Deploy
Click **Deploy**. Vercel will build and deploy your app.

---

## 📡 REST API Reference

### 1. `POST /api/users/signup`
Creates a new user account, encrypts password, and sends an email verification link.
- **Request Body**:
  ```json
  {
    "name": "Alex Morgan",
    "email": "alex@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "message": "User created successfully",
    "success": true,
    "user": {
      "id": "65cb7a...",
      "name": "Alex Morgan",
      "email": "alex@example.com"
    }
  }
  ```

---

### 2. `POST & GET /api/users/verifyemail`
Verifies an email using the cryptographic token.
- **POST Request Body**:
  ```json
  {
    "token": "4f8a3c9b..."
  }
  ```
- **GET Request Query**: `/api/users/verifyemail?token=4f8a3c9b...`
- **Response (200 OK)**:
  ```json
  {
    "message": "Email verified successfully",
    "success": true
  }
  ```

---

### 3. `POST /api/users/login`
Authenticates credentials and sets the HTTP-only JWT cookie.
- **Request Body**:
  ```json
  {
    "email": "alex@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "message": "Login successful",
    "success": true
  }
  ```
- **Set-Cookie Header**:
  ```
  token=<jwt-token>; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600; Secure
  ```

---

### 4. `GET /api/users/me`
Fetches the currently authenticated user profile from the JWT cookie.
- **Response (200 OK)**:
  ```json
  {
    "message": "User fetched successfully",
    "success": true,
    "user": {
      "_id": "65cb7a...",
      "name": "Alex Morgan",
      "email": "alex@example.com",
      "isVerified": true,
      "isAdmin": false,
      "createdAt": "2026-08-09T17:00:00.000Z",
      "updatedAt": "2026-08-09T17:05:00.000Z"
    }
  }
  ```

---

### 5. `GET & POST /api/users/logout`
Destroys the session by expiring the HTTP-only cookie.
- **Response (200 OK)**:
  ```json
  {
    "message": "Logout successful",
    "success": true
  }
  ```

---

## 👨‍💻 Author & Credits

- **Creator**: [superezz.dev](https://superezz.dev)
- **GitHub Profile**: [@superezzdev](https://github.com/superezzdev/)
- **Repository**: [auth-nextjs](https://github.com/superezzdev/auth-nextjs)

Open source under the [MIT License](LICENSE).
