import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "border-transparent bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    secondary: "border-transparent bg-white/10 text-gray-300",
    outline: "text-gray-300 border border-white/15",
    success: "border-transparent bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "border-transparent bg-amber-500/10 text-amber-400 border border-amber-500/20",
    destructive: "border-transparent bg-rose-500/10 text-rose-400 border border-rose-500/20",
  }[variant];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantStyles,
        className,
      )}
      {...props}
    />
  );
}
