import { cn } from "@/lib/scripts/utils";

export function TextArea({ className, ...props }) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full px-4 py-2 border border-gray-300 rounded-xl h-32 " +
          "focus:outline-none focus:ring-2 focus:ring-[#082465]/40 " +
          "transition-all resize-none",
        className
      )}
    />
  );
}
