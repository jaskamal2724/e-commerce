"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, ToastContainer } from "react-toastify";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      
      toast.success("You've been subscribed to our newsletter.",{autoClose:1000})
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md mx-auto gap-2"
      >
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-white/20 border-white/20 placeholder:text-white/70 text-white"
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-white text-primary hover:bg-white/90"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </>
  );
}
