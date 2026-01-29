"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastContext";
import { Lock } from "lucide-react";
import { isValidSignupPassword } from "@/lib/scripts/validators";   

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const [errors, setErrors] = useState({});

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e) {
    e.preventDefault();

    const newErrors = {};

    if (!password.trim()) {
        newErrors.password = "New password is required";
    } else if (!isValidSignupPassword(password)) {
        newErrors.password = "Include special characters and numbers too";
    }

    if (!confirm.trim()) {
        newErrors.confirm = "Password is incorrect";
    } else if (!isValidSignupPassword(confirm)) {
        newErrors.confirm = "Include special characters and numbers too";
    }

    if (!password || !confirm) {
      showToast("All fields are required", "error");
      return;
    }

    if (password !== confirm) {
      showToast("Passwords do not match", "error");
      return;
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        showToast("Please fix the errors", "error");
        return;
    }

    setErrors({});
    setLoading(true);

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      showToast(data.error || "Reset failed", "error");
      setLoading(false);
      return;
    }

    showToast("Password reset successful", "success");
    router.push("/auth/login");
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white border rounded-2xl shadow-xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Reset Password
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Enter your new password
        </p>

        <form onSubmit={handleReset} className="mt-8 space-y-4">

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              type="password"
              placeholder="New Password"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              type="password"
              placeholder="Confirm Password"
              className="pl-10"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            {errors.confirm && (
              <p className="text-sm text-red-500 mt-1">{errors.confirm}</p>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full py-2 rounded-xl bg-[#4458DC] text-white hover:bg-[#3647b3] cursor-pointer"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </main>
  );
}
