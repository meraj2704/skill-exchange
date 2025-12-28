import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { skillId, skillName, mentorId, mentorName, learnerId, learnerName } = await req.json();

    // Basic Validation
    if (!skillId || !learnerId || !mentorId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    if (learnerId === mentorId) {
      return NextResponse.json({ message: "You cannot request your own skill" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("skill_exchange");

    // Check if a pending request already exists to prevent spam
    const existingRequest = await db.collection("requests").findOne({
      skillId,
      learnerId,
      status: "pending"
    });

    if (existingRequest) {
      return NextResponse.json({ message: "Request already sent" }, { status: 409 });
    }

    const newRequest = {
      skillId,
      skillName,
      mentorId,
      mentorName,
      learnerId,
      learnerName,
      status: "pending", // pending, accepted, rejected, completed
      createdAt: new Date(),
    };

    await db.collection("requests").insertOne(newRequest);

    return NextResponse.json({ message: "Request sent successfully" }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}