"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight, ShoppingBag, Truck, ArrowRight } from "lucide-react";
import ProductCard from "@/components/product-card";
import CategoryCard from "@/components/category-card";
import TestimonialCard from "@/components/testimonial-card";
import NewsletterForm from "@/components/newsletter-form";
import HeroAnimation from "@/components/hero-animation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SignInButton } from "@clerk/nextjs";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { prisma } from "@/lib/prisma";
import { useRouter } from "next/navigation";

interface FeaturedProducts {
  id: number;
  name: string;
  image: string;
  category: string;
  rating: number;
  price: number;
  stock: number;
}

interface Category {
  id: number;
  name: string;
  image: string;
  itemCount: number;
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProducts[]>(
    []
  );

  const [category, setCategory] = useState<Category[]>([]);

  const router = useRouter();
  const products = async () => {
    try {
      const response = await axios.get("/api/products");
      setFeaturedProducts(response.data.products.slice(0, 4));
    } catch (error) {
      console.log("error in getting products ", error);
    }
  };

  const categoryitem = async () => {
    try {
      const response = await axios.get("/api/getcategories");
      setCategory(response.data.categories.slice(0,4));
    } catch (error) {
      console.log("error in getting products ", error);
    }
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop;
      window.scrollTo({
        top: offsetTop - 80, // Adjust for header height
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Add smooth scrolling behavior
    products();
    categoryitem();
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-slate-900">
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
        <div className="flex h-16 items-center justify-between mx-10">
          <div className="flex items-center gap-2 cursor-pointer">
            <ShoppingBag className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              <button onClick={() => router.replace("/home")}>
                Quick Basket
              </button>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#"
              onClick={(e) => scrollToSection(e, "hero")}
              className="text-sm font-medium text-purple-600 dark:text-purple-400 transition-colors hover:text-pink-500 dark:hover:text-pink-400"
            >
              Home
            </Link>
            <Link
              href="#products"
              onClick={(e) => scrollToSection(e, "products")}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-purple-600 dark:hover:text-purple-400"
            >
              Products
            </Link>
            <Link
              href="#categories"
              onClick={(e) => scrollToSection(e, "categories")}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-purple-600 dark:hover:text-purple-400"
            >
              Categories
            </Link>
            <Link
              href="#testimonials"
              onClick={(e) => scrollToSection(e, "testimonials")}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-purple-600 dark:hover:text-purple-400"
            >
              Testimonials
            </Link>
          </nav>

          <div className="flex items-center gap-4 cursor-pointer">
            <div className="cursor-pointer">
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 mx-10 rounded-3xl mt-10 shadow-xl shadow-purple-200/20 dark:shadow-purple-900/10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex flex-col space-y-4 md:w-1/2">
              <div className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-sm text-white font-medium shadow-md">
                Summer Collection 2024
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Discover Your{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                  Perfect
                </span>{" "}
                Style
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Elevate your wardrobe with our curated collection of trendy and
                timeless pieces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white border-0 shadow-lg shadow-purple-200 dark:shadow-purple-900/20"
                >
                  Shop Now
                  <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  Explore Collections
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative ">
              <div className="mt-10 absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-500 opacity-20 blur-2xl rounded-full"></div>
              <HeroAnimation />
            </div>
          </div>

          <div className="mt-16 md:mt-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="flex flex-col items-center p-4 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <Truck className="h-8 w-8 mb-2 text-purple-600 dark:text-purple-400" />
                <h3 className="font-medium">Free Shipping</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  On orders over $50
                </p>
              </div>
              <div className="flex flex-col items-center p-4 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 mb-2 text-pink-500 dark:text-pink-400"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <h3 className="font-medium">Satisfaction Guaranteed</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  30-day money back
                </p>
              </div>
              <div className="flex flex-col items-center p-4 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 mb-2 text-indigo-500 dark:text-indigo-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 14.14 14.14" />
                </svg>
                <h3 className="font-medium">Secure Payments</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Protected checkout
                </p>
              </div>
              <div className="flex flex-col items-center p-4 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 mb-2 text-teal-500 dark:text-teal-400"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
                <h3 className="font-medium">Quality Products</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Curated selection
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="products" className="py-20 mx-10">
          <div className="">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
                  Featured Products
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Discover our most popular items
                </p>
              </div>
              <Link
                href="/categories"
                className="group inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-pink-500 dark:hover:text-pink-400 mt-4 md:mt-0 font-medium"
              >
                View all products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="flex justify-center gap-20">
              {featuredProducts.map((item) => (
                <div key={item.id}>
                  <ProductCard
                    id={item.id.toString()}
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
          </div>
        </section>

        {/* Categories */}
        <section
          id="categories"
          className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50 mx-10 rounded-3xl shadow-xl shadow-purple-200/10 dark:shadow-purple-900/5"
        >
          <div className="">
            <h2 className="text-3xl font-bold tracking-tight mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Shop by Category
            </h2>
            <div className="flex justify-center gap-20">
              {category.map((item) => (
                <div key={item.id} className="flex justify-center gap-20">
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

        {/* Testimonials */}
        <section id="testimonials" className="py-20 mx-10">
          <div className="">
            <h2 className="text-3xl font-bold tracking-tight mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              What Our Customers Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TestimonialCard
                name="Alex Johnson"
                avatar="/placeholder.svg?height=100&width=100"
                rating={5}
                text="The quality of the products exceeded my expectations. Fast shipping and excellent customer service!"
              />
              <TestimonialCard
                name="Sarah Williams"
                avatar="/placeholder.svg?height=100&width=100"
                rating={5}
                text="I've been shopping here for years and have never been disappointed. The new summer collection is amazing!"
              />
              <TestimonialCard
                name="Michael Chen"
                avatar="/placeholder.svg?height=100&width=100"
                rating={4}
                text="Great selection of products at reasonable prices. The website is easy to navigate and checkout is seamless."
              />
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-3xl mx-10 mb-10 shadow-xl shadow-purple-200/10 dark:shadow-purple-900/5">
          <div className="">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
                Join Our Newsletter
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Subscribe to get special offers, free giveaways, and
                once-in-a-lifetime deals.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-white dark:bg-gray-900">
        <div className="mx-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
                  Quick Basket
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Elevating your shopping experience with curated collections and
                exceptional service.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-4 text-gray-900 dark:text-white">
                Shop
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Sale
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4 text-gray-900 dark:text-white">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4 text-gray-900 dark:text-white">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Quick Basket. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
