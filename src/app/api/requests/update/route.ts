import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(req: Request) {
  try {
    const { requestId, status } = await req.json();

    const client = await clientPromise;
    const db = client.db("skill_exchange");

    const result = await db.collection("requests").updateOne(
      { _id: new ObjectId(requestId) },
      { $set: { status: status } } // status will be 'accepted' or 'rejected'
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "Update failed" }, { status: 400 });
    }

    return NextResponse.json({ message: `Request ${status}` });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}