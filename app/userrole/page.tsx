"use client";
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export default function ChooseRole() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const { user } = useUser();

  const handleRoleSelect = (role: string) => {
    console.log(user);
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    if (!selectedRole) {
      alert("Please select a role to continue");
      return;
    }

    try {
      const response = await axios.post("/api/setrole", { role: selectedRole });
      if (response.status == 200) {
        if (selectedRole === "buyer") {
          router.replace("/home");
        } else {
          router.replace("/seller");
        }
      }
    } catch (error) {
      console.log("error in setting role ", error)
    }
  };

  return (
    <>
      <Head>
        <title>Choose Your Role | E-Commerce Store</title>
        <meta
          name="description"
          content="Select how you want to use our platform"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Quick Basket
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            How would you like to proceed today?
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  Select your role
                </p>
                <p className="text-xs text-gray-500">
                  You can always change this later
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Buyer Option */}
                <div
                  onClick={() => handleRoleSelect("buyer")}
                  className={`relative border-2 rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all duration-200 ${
                    selectedRole === "buyer"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="p-3 rounded-full bg-blue-100 mb-4">
                    {/* Replace with actual SVG or image */}
                    <div className="w-12 h-12 flex items-center justify-center text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8"
                      >
                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    I want to Shop
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 text-center">
                    Browse products and make purchases
                  </p>

                  {selectedRole === "buyer" && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Seller Option */}
                <div
                  onClick={() => handleRoleSelect("seller")}
                  className={`relative border-2 rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all duration-200 ${
                    selectedRole === "seller"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div className="p-3 rounded-full bg-green-100 mb-4">
                    {/* Replace with actual SVG or image */}
                    <div className="w-12 h-12 flex items-center justify-center text-green-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8"
                      >
                        <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                        <path
                          fillRule="evenodd"
                          d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    I want to Sell
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 text-center">
                    List products and grow your business
                  </p>

                  {selectedRole === "seller" && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleContinue}
                  disabled={!selectedRole}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    selectedRole === "buyer"
                      ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                      : selectedRole === "seller"
                      ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                      : "bg-gray-400 cursor-not-allowed"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}
                >
                  Continue as{" "}
                  {selectedRole
                    ? selectedRole === "buyer"
                      ? "Buyer"
                      : "Seller"
                    : "Selected Role"}
                </button>
              </div>

              <div className="text-center mt-4">
                <p className="text-xs text-gray-500">
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/signin"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
