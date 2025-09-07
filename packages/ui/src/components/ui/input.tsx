import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border-2 border-ink-200/70 dark:border-ink-700/50 bg-white dark:bg-ink-800 px-4 py-3 text-sm font-medium placeholder:font-normal placeholder:text-ink-400 focus:border-accent-500 focus:ring-4 focus:ring-accent-200/60 dark:focus:ring-accent-600/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };