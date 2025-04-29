import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  const cart = await prisma.cart.findMany({
    where:{userid:userId!}
  });
  return NextResponse.json({ cart: cart }, { status: 200 });
}
