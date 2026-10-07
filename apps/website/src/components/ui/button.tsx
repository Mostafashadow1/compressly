import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 active:bg-indigo-700",
      secondary: "bg-white/10 text-white hover:bg-white/15 active:bg-white/20",
      outline: "border border-white/15 bg-transparent hover:bg-white/5 active:bg-white/10 text-white",
      ghost: "hover:bg-white/5 active:bg-white/10 text-gray-300 hover:text-white",
      destructive: "bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700",
    }[variant];

    const sizeStyles = {
      default: "h-9 px-4 py-2 text-sm",
      sm: "h-8 rounded-lg px-3 text-xs",
      lg: "h-11 rounded-xl px-6 text-base",
      icon: "size-9",
    }[size];

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
          variantStyles,
          sizeStyles,
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
