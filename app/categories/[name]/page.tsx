"use client";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import axios from "axios";
import { ShoppingBag } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Products {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
}

const page = () => {
  const [Products, setProducts] = useState<Products[]>([]);

  const { name } = useParams();
  const products = async () => {
    try {
      const res = await axios.get(`/api/specific_category_products/${name}`);
      setProducts(res.data.products);
    } catch (error) {
      console.log("error in getting products based on category", error);
    }
  };

  const addtocart=async () => {
    
  }

  useEffect(() => {
    products();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
        <div className="flex h-16 items-center justify-between mx-10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              ShopVibe
            </span>
          </div>

          <div className="flex items-center gap-4 cursor-pointer">
            <div className="cursor-pointer">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white border-0 shadow-md shadow-purple-200 dark:shadow-purple-900/20">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Cart (0)
            </Button>
          </div>
        </div>
      </header>
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
          {name}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
        {Products.map((item) => (
          <div key={item.id}>
            <ProductCard
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              category={item.category}
              rating={item.rating}
              stock={item.stock}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
