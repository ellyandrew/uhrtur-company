"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastContext";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { isValidEmail, isValidLoginPassword } from "@/lib/scripts/validators";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();
  const router = useRouter();

  async function handleLogin(e) {

  e.preventDefault();

  if (loading) return;

  const newErrors = {};

  if (!email.trim()) {
    newErrors.email = "Email address is required";
  } else if (!isValidEmail(email)) {
    newErrors.email = "Enter a valid email address";
  }

  if (!password.trim()) {
    newErrors.password = "Password is required";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    showToast("Please fix the errors", "error");
    return;
  }

  setErrors({});
  setLoading(true);

  try {
    const result = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    if (result?.error) {
      showToast(result.error, "error");
      setLoading(false);
      return;
    }

    const session = await getSession();

    if (!session?.user) {
      showToast("Login failed. Try again.", "error");
      return;
    }

    const roles = session.user.roles || [];

    showToast("Login successful", "success");

    if (roles.includes("Admin") || roles.includes("User")) {
      router.push("/portal/dashboard");
    } 
    else if (roles.includes("Applicant")) {
      router.push("/applicant/dashboard");
    } 
    else {
      router.push("/auth/access");
    }

  } catch (err) {
    console.error(err);
    showToast("Network error. Please try again.", "error");
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="relative flex items-center justify-center min-h-screen overflow-hidden">

      {/* Glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4458DC]/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 -left-20 w-72 h-72 bg-[#4458DC]/20 blur-3xl rounded-full"></div>

      {/* Login Card */}
      <div className="bg-white border rounded-2xl shadow-xl p-8 w-full max-w-md relative z-10">

        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Login with your details
        </p>

        <form onSubmit={handleLogin}>
          <div className="mt-8 space-y-4">

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-[#4458DC] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
          />
          {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-[#4458DC] outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
          />
          {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            disabled={loading}
            className={`w-full py-2 rounded-xl bg-[#4458DC] text-white hover:bg-[#3647b3] transition cursor-pointer ${
              loading ? "bg-gray-400" : "bg-[#082465] hover:bg-[#061b45]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        </form>
        <p className="text-sm text-gray-500 text-center mt-6">
          Don’t have an account?{" "}
          <Link href="#" className="text-[#4458DC] hover:underline">
            Create one
          </Link>
        </p>

        <p className="text-sm text-gray-500 text-center mt-4">
            <Link href="/auth/forgot-password" className="text-[#4458DC] hover:underline mt-6">
            Forgot Password?
          </Link>
        </p>
      </div>
    </main>
  );
}
