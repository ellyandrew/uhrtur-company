import React from "react";
import { cn } from "@/lib/scripts/utils";

export const Input = React.forwardRef(function Input(
  { className, error, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      {...props}
      aria-invalid={error || undefined}
      className={cn(
        "w-full p-3 rounded-lg border text-base transition-all",
        "focus:outline-none focus:ring-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",

        // Default state
        !error &&
          "border-gray-600 font-size: 24 focus:border-[#3B8132] focus:ring-[#3B8132]/40",

        // Error state
        error &&
          "border-red-500 focus:border-red-500 focus:ring-red-500/40",

        className
      )}
    />
  );
});
