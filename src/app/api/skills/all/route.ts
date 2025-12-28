import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const client = await clientPromise;
    const db = client.db("skill_exchange");

    // Aggregation: Get all skills from all users
    const pipeline: any[] = [
      { $unwind: "$skills" }, // Break the skills array into individual documents
      {
        $project: {
          _id: 0,
          id: "$skills.id",
          name: "$skills.skillName",
          category: "$skills.category",
          level: "$skills.level",
          mentorName: "$fullName", // Link the skill to the mentor
          mentorId: "$_id",
          rating: { $literal: 4.8 }, // Placeholder until we build the review system
        },
      },
    ];

    // Filter by category if provided
    if (category && category !== "All") {
      pipeline.push({ $match: { category: category } });
    }

    const skills = await db.collection("users").aggregate(pipeline).toArray();

    return NextResponse.json(skills, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching explore skills" }, { status: 500 });
  }
}