"use client"
import CategoryCard from "@/components/category-card";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import axios from "axios";
import { ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Category{
  id:number,
  name:string,
  image:string,
  itemCount:number,
}

const Page = () => {
  const [category, setCategory]=useState<Category[]>([])

  const categories=async () => {
    const response = await axios.get("/api/getcategories")
    try {
      if(response.status=200){
        setCategory(response.data.categories)
      }
    } catch (error) {
      console.log("error getiing categories ",error)
    }
  }

  const a="hi";

  useEffect(()=>{
    categories()
  },[a])

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


      <section
        id="categories"
        className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50 mx-10 rounded-3xl shadow-xl shadow-purple-200/10 dark:shadow-purple-900/5"
      >
        <div className="">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.map((item)=>(
              <div key={item.id} >
              <CategoryCard
                name={item.name}
                image={item.image}
                itemCount={item.itemCount}
              />
            </div>
          ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
