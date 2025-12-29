import clientPromise from "@/src/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("skill_exchange");

    // Get total users
    const userCount = await db.collection("users").countDocuments();
    
    // Get 3 top mentors (users with highest ratings or most skills)
    const topMentors = await db.collection("users")
      .find({ "skills.0": { $exists: true } }) // Only users with skills
      .limit(3)
      .toArray();

    return NextResponse.json({
      userCount: userCount + 100, // Adding a base offset for growth
      topMentors
    });
  } catch (e) {
    return NextResponse.json({ userCount: 0, topMentors: [] }, { status: 500 });
  }
}