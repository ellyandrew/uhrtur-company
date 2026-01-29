"use client";

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",       // sm | md | lg | xl | full
  height = "auto",   // auto | sm | md | lg | full
}) {
  if (!open) return null;

  // Width map
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    full: "max-w-7xl",
  };

  // Height map
  const heightClasses = {
    auto: "",
    sm: "max-h-[40vh]",
    md: "max-h-[60vh]",
    lg: "max-h-[80vh]",
    full: "h-[90vh]",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className={`
          bg-white rounded-xl shadow-lg w-full 
          ${sizeClasses[size]} 
          ${heightClasses[height]}
          overflow-y-auto
          p-6 relative
        `}
      >
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
