// app/api/cart/add/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { userid, productId, name, image, category, price,rating,  quantity } = body;

    if (!userid || !productId || !name || !image || !category || !price || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if product is already in cart
    const existing = await prisma.cart.findFirst({
      where: { productId },
    });

    let cartItem;

    if (existing) {
      // If exists, increment stock
      cartItem = await prisma.cart.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + (quantity || 1) },
      });
    } else {
      // Otherwise, create new cart entry
      cartItem = await prisma.cart.create({
        data: {
          userid,
          productId,
          name,
          image,
          category,
          price,
          rating:rating,
          quantity:quantity        },
      });
    }

    return NextResponse.json(
      { message: "Product added to cart", cartItem },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ "failed to add to cart":err }, { status: 500 });
  }
}
