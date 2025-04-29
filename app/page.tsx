"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBasket, ArrowRight, Store, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation"

export default function Home() {
  const [hoverBuyer, setHoverBuyer] = useState(false);
  const [hoverSeller, setHoverSeller] = useState(false);
  const router = useRouter()

  const handleSignIn=()=>{
    router.push("/signin")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-green-50 to-teal-50 dark:from-gray-900 dark:to-slate-900">
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
        <div className="flex h-16 items-center justify-between mx-10">
          <div className="flex items-center gap-2">
            <ShoppingBasket className="h-6 w-6 text-green-600 dark:text-green-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-400 text-transparent bg-clip-text">
              Quick Basket
            </span>
          </div>

          <div className="flex items-center gap-4"></div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl px-4 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Welcome text */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-block rounded-full bg-green-100 dark:bg-green-900/30 px-4 py-1.5 text-sm font-medium text-green-700 dark:text-green-300 mb-6">
              Welcome to Quick Basket
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Shop{" "}
              <span className="bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-400 text-transparent bg-clip-text">
                Smarter
              </span>
              , Not Harder
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              Your one-stop marketplace connecting buyers with sellers for a
              seamless shopping experience. Sign in to get started!
            </p>
            <Button
              onClick={handleSignIn}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white border-0 shadow-lg"
            >
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Right side - User type selection */}
          <div className="lg:w-1/2 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-400 text-transparent bg-clip-text">
              Choose Your Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
              {/* Buyer Card */}
              <div
                className={`relative overflow-hidden rounded-2xl border border-green-100 dark:border-green-900 bg-white dark:bg-gray-800 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center cursor-pointer ${
                  hoverBuyer ? "scale-105" : ""
                }`}
                onMouseEnter={() => setHoverBuyer(true)}
                onMouseLeave={() => setHoverBuyer(false)}
                onClick={()=>router.push("/signin")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-4">
                  <ShoppingCart className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">I&apos;m a Buyer</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  Discover products and shop from verified sellers
                </p>
                <Button
                  variant="outline"
                  className="border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 mt-auto"
                >
                  Continue as Buyer
                </Button>
              </div>

              {/* Seller Card */}
              <div
                className={`relative overflow-hidden rounded-2xl border border-teal-100 dark:border-teal-900 bg-white dark:bg-gray-800 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center cursor-pointer ${
                  hoverSeller ? "scale-105" : ""
                }`}
                onMouseEnter={() => setHoverSeller(true)}
                onMouseLeave={() => setHoverSeller(false)}
                onClick={()=>router.push("/signin")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-green-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <div className="h-16 w-16 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center mb-4">
                  <Store className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">I&apos;m a Seller</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  List your products and reach customers worldwide
                </p>
                <Button
                  variant="outline"
                  className="border-teal-300 dark:border-teal-700 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 mt-auto"
                >
                  Continue as Seller
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full bg-white dark:bg-gray-800/50 py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-400 text-transparent bg-clip-text">
              Why Choose Quick Basket?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-4">
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
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Secure Transactions
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every transaction is protected with advanced security
                  measures. Shop with peace of mind.
                </p>
              </div>

              <div className="bg-teal-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center mb-4">
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
                    className="h-6 w-6 text-teal-600 dark:text-teal-400"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
                    <line x1="9.69" y1="8" x2="21.17" y2="8" />
                    <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
                    <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
                    <line x1="14.31" y1="16" x2="2.83" y2="16" />
                    <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Global Marketplace
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Connect with buyers and sellers from around the world,
                  expanding your market reach.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-4">
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
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Customer First</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our platform is designed with users in mind, providing
                  intuitive tools and excellent support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <ShoppingBasket className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-400 text-transparent bg-clip-text">
                Quick Basket
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm"
              >
                About Us
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Quick Basket. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
