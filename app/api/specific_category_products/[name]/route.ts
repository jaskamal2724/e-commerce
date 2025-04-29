import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
    console.log(req.method)
  const { name } = params;  // Extract the category name from the URL

  if (!name) {
    return NextResponse.json({ error: 'No category name provided' }, { status: 400 });
  }

  try {
    // Query the products based on the category name
    const products = await prisma.products.findMany({
      where: {
        category: name,  // Filter products by the category name
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({"error":error }, { status: 500 });
  }
}
