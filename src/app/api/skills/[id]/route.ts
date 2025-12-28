import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Define params as a Promise
) {
  try {
    // FIX: Unwrapping the params promise using await
    const resolvedParams = await params;
    const skillId = resolvedParams.id;

    const client = await clientPromise;
    const db = client.db("skill_exchange");

    // Find the user who owns this specific skill ID
    const user = await db.collection("users").findOne(
      { "skills.id": skillId },
      { projection: { fullName: 1, bio: 1, location: 1, skills: 1 } }
    );

    if (!user) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }

    // Extract the specific skill from the array
    const skill = user.skills.find((s: any) => s.id === skillId);

    return NextResponse.json({
      skillName: skill.skillName,
      category: skill.category,
      level: skill.level,
      mentorName: user.fullName,
      mentorId: user._id,
      mentorBio: user.bio,
      mentorLocation: user.location,
    }, { status: 200 });
    
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}