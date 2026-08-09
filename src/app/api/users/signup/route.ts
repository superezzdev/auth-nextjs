import { connect } from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const reqBody = await request.json();

    const { name, email, password } = reqBody;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Name, email and password are required",
        },
        {
          status: 400,
        },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    console.log("User created:", savedUser._id);

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        user: {
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error: unknown) {
    console.error("Signup error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
