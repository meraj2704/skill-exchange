import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const client = await clientPromise;
    const db = client.db("skill_exchange");

    // 1. Get User Data for the welcome message
    const user = await db.collection("users").findOne({ id: userId });

    // 2. Count Active Skills (the ones the user added to their profile)
    const activeSkillsCount = user?.skills?.length || 0;

    // 3. Count Pending Incoming Requests
    const pendingRequests = await db.collection("requests").countDocuments({
      mentorId: userId,
      status: "pending"
    });

    // 4. Count Completed Sessions (Accepted or Completed)
    const completedSessions = await db.collection("requests").countDocuments({
      $or: [{ mentorId: userId }, { learnerId: userId }],
      status: "accepted"
    });

    // 5. Get Recent Incoming Activity (limit to 3)
    const recentActivity = await db.collection("requests")
      .find({ mentorId: userId })
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();

    return NextResponse.json({
      userName: user?.fullName || "User",
      stats: {
        activeSkills: activeSkillsCount,
        pending: pendingRequests,
        completed: completedSessions,
        rating: 4.9 // Dummy for now
      },
      recentActivity
    });
  } catch (error) {
    return NextResponse.json({ message: "Dashboard data error" }, { status: 500 });
  }
}