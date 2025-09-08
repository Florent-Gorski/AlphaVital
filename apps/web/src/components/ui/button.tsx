import * as React from 'react';
import { cn } from './cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    const variants = {
      default: 'bg-black text-white hover:bg-black/90 focus:ring-black',
      outline: 'border border-gray-300 bg-white text-gray-900 hover:border-black focus:ring-black',
      ghost: 'bg-transparent hover:bg-gray-50 text-gray-900 focus:ring-black',
    } as const;
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      default: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    } as const;
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
