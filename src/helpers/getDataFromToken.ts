import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      throw new Error("Token not found");
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decodedToken = jwt.verify(token, jwtSecret) as {
      id: string;
      email: string;
      name: string;
    };

    return decodedToken.id;
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Something went wrong with token verification",
    );
  }
};
