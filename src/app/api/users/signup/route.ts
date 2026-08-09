import { connect } from "@/dbConfig/db";
import User from "@/models/userMosel";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
 



connect();


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody; 
    console.log("Received data:", { name, email, password });
// Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("User created successfully:", savedUser);

    return NextResponse.json({ message: "User created successfully", 
      success: true,
      savedUser
    }, { status: 201 });




  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }

}