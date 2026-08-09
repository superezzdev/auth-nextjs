import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/db";

export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connect();

    // Get user ID from JWT
    const userId = getDataFromToken(request);

    // Find user
    const user = await User.findById(userId).select(
      "-password -forgotPasswordToken -verifyToken",
    );

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
          success: false,
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "User fetched successfully",
        success: true,
        user,
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    console.error("Get user error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching user",
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
