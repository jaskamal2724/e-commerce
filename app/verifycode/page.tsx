"use client";
import React, { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function VerifyEmailPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Handle input change for the verification code
  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setCode(e.target.value);
  };

  // Handle verification form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);

    try {
      // Attempt to verify the email address with the provided code
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (result.status === "complete") {
        console.log(result);

        // Set the session as active
        await setActive({ session: result.createdSessionId });
        console.log("verified");
        router.replace("/userrole");
      }
    } catch (err) {
      console.error("Verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle resending the verification code
  const handleResendCode = async () => {
    if (!isLoaded) return;

    setResendLoading(true);

    try {
      // Re-prepare email verification
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      alert("A new verification code has been sent to your email.");
    } catch (err) {
      console.error("Resend code error:", err);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter the verification code sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Verification Code
            </label>
            <input
              type="text"
              name="code"
              id="code"
              value={code}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter 6-digit code"
              required
              autoFocus
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading || !isLoaded || !code.trim()}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading || !isLoaded || !code.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={resendLoading || !isLoaded}
            className={`text-sm font-medium text-blue-600 hover:text-blue-500 ${
              resendLoading || !isLoaded ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {resendLoading ? "Resending..." : "Resend Code"}
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Back to{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
