import { cn } from "@/lib/scripts/utils";

export function Card({ children, className }) {
  return (
    <div className={cn("bg-white rounded-2xl shadow p-5", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h2 className={cn("text-lg font-semibold text-gray-800", className)}>
      {children}
    </h2>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  );
}
