"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastContext";
import { isValidEmail } from "@/lib/scripts/validators";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please fix the errors", "error");
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      if (!res.ok) {
        const data = await res.json();
        showToast(data.error || "Failed to send reset email", "error");
        return;
      }

      setSent(true);
      showToast("Password reset email sent", "success");
    } catch (err) {
      console.error(err);
      showToast("Network error. Try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex items-center justify-center min-h-screen overflow-hidden">

      {/* Glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4458DC]/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 -left-20 w-72 h-72 bg-[#4458DC]/20 blur-3xl rounded-full"></div>

      <div className="bg-white border rounded-2xl shadow-xl p-8 w-full max-w-md relative z-10">

        {!sent ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              Forgot Password
            </h1>
            <p className="text-gray-500 text-center mt-2">
              Enter your email and we’ll send you a reset link
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border rounded-xl pl-10 pr-4 py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <button
                disabled={loading}
                className={`w-full py-2 rounded-xl text-white transition cursor-pointer
                  ${loading ? "bg-gray-400" : "bg-[#082465] hover:bg-[#061b45]"}`}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-6">
              Remembered your password?{" "}
              <Link href="/auth/login" className="text-[#4458DC] hover:underline">
                Back to login
              </Link>
            </p>
          </>
        ) : (
          <div className="text-center py-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
              ✓
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Check your email
            </h3>
            <p className="text-gray-600 text-sm">
              If an account exists with that email, a password reset link has been sent.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
