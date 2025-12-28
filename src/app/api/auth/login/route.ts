import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import clientPromise from "@/src/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("skill_exchange");

    // 1. Find user by email
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 2. Compare password with the hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3. Return user data (excluding password)
    // In a real app, you would set a JWT or Session cookie here
    return NextResponse.json(
      { 
        message: "Login successful", 
        user: { id: user._id, name: user.fullName, email: user.email } 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}