"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroAnimation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative h-[400px] w-full">
        <Image
          src="/placeholder.svg?height=600&width=600"
          alt="Hero product"
          width={600}
          height={600}
          className="object-cover rounded-lg"
          priority
        />
      </div>
    );
  }

  return (
    <div className="relative h-[400px] w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute z-10 top-0 left-0 w-full h-full"
      >
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 mix-blend-overlay"></div>
          <Image
            src="https://imgs.search.brave.com/mz6b7ob6x7jePkH75-0jIOtr5kCn5TGIQEe8HtVuPv4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9vbmlp/c2FhYi5jb20vY2Ru/L3Nob3AvZmlsZXMv/c29sb19iYWNrLnBu/Zz92PTE3MzkyNjM3/OTMmd2lkdGg9MTQ0/NQ"
            alt="Hero product"
            width={300}
            height={400}
            className="object-cover rounded-lg mt-10 mx-60"
            priority
          />
          <p className="mx-70 mt-5">Solo Levelling Oversized T-shirt</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute -bottom-10 -right-10 w-40 h-40 md:w-60 md:h-60"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-green-400 to-blue-500 text-white backdrop-blur-sm flex items-center justify-center animate-pulse">
          <div className="text-center">
            <div className="font-bold text-xl md:text-2xl">30% OFF</div>
            <div className="text-sm md:text-base">New Arrivals</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute top-10 -left-5 md:-left-10 w-20 h-20 md:w-28 md:h-28"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-green-400 to-blue-500 text-white backdrop-blur-sm flex items-center justify-center animate-bounce">
          <div className="text-center">
            <div className="font-bold text-sm md:text-base">Limited</div>
            <div className="text-xs">Edition</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
