"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold text-green-600">
        ✅ Payment Successful!
      </h1>
      <p className="mt-2">Thank you for your purchase.</p>
      <div className="mt-10">
        <Button onClick={()=>router.replace("/home")}>NEXT</Button>
      </div>
    </div>
  );
};

export default Page;
