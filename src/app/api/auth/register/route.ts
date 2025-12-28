// app/api/auth/register/route.ts
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs"; // npm install bcryptjs
import clientPromise from "@/src/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { fullName, email, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("skill_exchange");

    // 1. Check if user exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Save User
    const newUser = await db.collection("users").insertOne({
      fullName,
      email,
      password: hashedPassword,
      role: "Learner", // default role
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User created", userId: newUser.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}