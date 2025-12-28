import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req: Request) {
  try {
    const { id, fullName, bio, location } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "User ID required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("skill_exchange");

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          fullName,
          bio,
          location,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}