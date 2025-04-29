import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const name = url.pathname.split("/").pop(); // Extract `[name]` param from URL

    if (!name) {
      return NextResponse.json({ error: "No category name provided" }, { status: 400 });
    }

    const products = await prisma.products.findMany({
      where: {
        category: name,
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
