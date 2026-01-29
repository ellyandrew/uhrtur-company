"use client";

export default function LoadingScreen({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex items-center gap-3">
        {/* Spinner */}
        <div className="w-6 h-6 border-2 border-[#4458DC] border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-gray-700 font-medium">{text}</p>
      </div>
    </div>
  );
}
