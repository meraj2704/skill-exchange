import { NextResponse } from "next/server";

import { ObjectId } from "mongodb";
import clientPromise from "@/src/lib/mongodb";

export async function POST(req: Request) {
    try {
        const { userId, skillName, category, level } = await req.json();

        if (!userId || !skillName) {
            return NextResponse.json({ message: "Missing data" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("skill_exchange");

        // Push the new skill object into the user's 'skills' array
        const updateOperation: any = {
            $push: {
                skills: {
                    id: crypto.randomUUID(),
                    skillName,
                    category,
                    level,
                    addedAt: new Date(),
                },
            },
        };

        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            updateOperation
        );
        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Skill added successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ message: "User ID required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("skill_exchange");

        const user = await db.collection("users").findOne(
            { _id: new ObjectId(userId) },
            { projection: { skills: 1 } } // Only fetch the skills field
        );

        return NextResponse.json(user?.skills || [], { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching skills" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { userId, skillId } = await req.json();

        if (!userId || !skillId) {
            return NextResponse.json({ message: "Missing required IDs" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("skill_exchange");

        // FIX: Cast the update object to 'any' to resolve the TS(2322) error
        const deleteOperation: any = {
            $pull: {
                skills: { id: skillId }
            }
        };

        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            deleteOperation
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "Skill not found or already deleted" }, { status: 404 });
        }

        return NextResponse.json({ message: "Skill deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}