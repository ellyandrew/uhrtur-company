import { cn } from "@/lib/scripts/utils";

export function Button({
  children,
  className,
  onClick,
  type = "button",
  variant = "primary", // primary | secondary | outline
  size = "md",         // sm | md | lg | icon
  disabled = false,
  ...props
}) {
  const baseClasses =
    "rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all active:scale-95 inline-flex items-center justify-center";

  const variantClasses = {
    primary:
      "bg-[#082465] text-white hover:bg-[#0a2e80] focus:ring-[#082465]",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    outline:
      "border border-gray-300 text-gray-700 hover:border-[#082465] hover:text-[#082465] focus:ring-[#082465]"
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "w-10 h-10 p-0"
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabledClasses,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
