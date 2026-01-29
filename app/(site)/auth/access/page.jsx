"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="bg-white border rounded-xl shadow-sm p-8 max-w-md text-center">
        
        <div className="flex justify-center mb-4">
          <ShieldAlert size={50} className="text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Access Denied
        </h1>

        <p className="text-gray-600 mb-6">
          You do not have permission to access this page.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Go Home
          </Link>

          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-lg bg-[#4458DC] text-white hover:bg-[#3647b8] transition"
          >
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
}
