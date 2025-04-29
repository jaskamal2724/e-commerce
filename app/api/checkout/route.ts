// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

interface Cart {
  id: number;
  userid: string;
  productId: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  quantity: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: body.items.map((item: Cart) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * item.quantity * 100, // convert to paisa
        },
        quantity: 1,
      })),
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cart",
    });

    return NextResponse.json({ url: session.url },{status:200});
  } catch (err) {
    return NextResponse.json({ "payment failed ":err }, { status: 500 });
  }
}
