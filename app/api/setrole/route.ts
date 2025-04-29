import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { Clerk } from "@clerk/clerk-sdk-node";

const clerk = Clerk({ apiKey: process.env.CLERK_SECRET_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { role } = await req.json();
  
    const { userId } = await auth();
  
    await clerk.users.updateUserMetadata(userId!, {
      unsafeMetadata: {
        role: role,
      },
    });
  
    return NextResponse.json(
      { message: "User role updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in setting role ", error)
  }
}
