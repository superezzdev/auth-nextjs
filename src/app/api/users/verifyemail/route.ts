import { connect } from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

async function processVerification(token: string | null | undefined) {
  if (!token) {
    return NextResponse.json(
      { error: "Token is required", success: false },
      { status: 400 },
    );
  }

  await connect();

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    verifyToken: hashedToken,
    verifyTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Invalid or expired token", success: false },
      { status: 400 },
    );
  }

  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;

  await user.save();

  return NextResponse.json(
    { message: "Email verified successfully", success: true },
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    return await processVerification(token);
  } catch (error: unknown) {
    console.error("Verify email POST error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong with verification",
        success: false,
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    return await processVerification(token);
  } catch (error: unknown) {
    console.error("Verify email GET error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong with verification",
        success: false,
      },
      { status: 500 },
    );
  }
}

