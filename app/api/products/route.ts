import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.products.findMany();
  return NextResponse.json({ products: products }, { status: 200 });
}
