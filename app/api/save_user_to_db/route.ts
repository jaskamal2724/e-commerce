import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { clerkid, email, name, phone, address, pincode, city } = body;

    // Create user in Neon using Prisma
    const user = await prisma.user.create({
      data: {
        clerkid,
        email,
        name,
        phone,
        address,
        pincode,
        city,
      },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
