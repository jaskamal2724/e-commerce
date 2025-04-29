"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

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

export default function CartPage() {
  const [cart, setCart] = useState<Cart[]>([]);

  const handleRemove = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getcart = async () => {
    try {
        const response = await axios.get("/api/get_cart_items");
        if (response.status == 200) {
          setCart(response.data.cart);
        }
    } catch (error) {
        console.log("error getting cart",error)
    }
  };

  const handleBuyNow = async (item: Cart) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [item] }),
      });
  
      const data = await res.json();
  
      if (res.ok && data.url) {
        // ✅ Redirect to Stripe-hosted checkout page
        window.location.href = data.url;
      } else {
        console.error("Stripe error:", data.error);
        alert("Failed to create payment session.");
      }
      
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong during checkout.");
    }
  };

  const a="hi";

  useEffect(() => {
    getcart();
  }, [a]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">₹{item.price}</p>
                  <p className="text-sm text-gray-500">
                    Stock: {item.quantity}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mt-6">Total Price</p>
                  <p className="text-sm text-gray-500">
                    {item.price*item.quantity}
                  </p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex gap-4">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleBuyNow(item)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
