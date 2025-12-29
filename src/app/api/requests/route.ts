import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const type = searchParams.get("type");

    if (!userId) return NextResponse.json({ message: "User ID required" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("skill_exchange");

    const query = type === "incoming" 
      ? { mentorId: userId } 
      : { learnerId: userId };

    const requests = await db.collection("requests")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}