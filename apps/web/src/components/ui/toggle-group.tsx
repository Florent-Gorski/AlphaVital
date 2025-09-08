import * as React from 'react';
import { cn } from './cn';

type SingleOrMulti<T> = T[] | T | null;

export interface ToggleGroupProps<T extends string> extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  value: SingleOrMulti<T>;
  onValueChange?: (value: SingleOrMulti<T>) => void;
}

const TGContext = React.createContext<{
  type: 'single' | 'multiple';
  value: SingleOrMulti<string>;
  onValueChange?: (value: SingleOrMulti<string>) => void;
} | null>(null);

export function ToggleGroup<T extends string>({ type = 'multiple', value, onValueChange, className, children, ...props }: ToggleGroupProps<T>) {
  return (
    <TGContext.Provider value={{ type, value: value as SingleOrMulti<string>, onValueChange }}>
      <div role="group" className={cn('inline-flex flex-wrap gap-2', className)} {...props}>
        {children}
      </div>
    </TGContext.Provider>
  );
}

export interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const ctx = React.useContext(TGContext);
    const isPressed =
      ctx?.type === 'single'
        ? ctx.value === value
        : Array.isArray(ctx?.value) && ctx.value.includes(value);

    const base = 'rounded-md border px-3 py-2 text-sm transition';
    const pressed = 'bg-black text-white border-black';
    const idle = 'bg-white text-gray-800 border-gray-300 hover:border-black';

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isPressed}
        className={cn(base, isPressed ? pressed : idle, className)}
        onClick={() => {
          if (!ctx) return;
          if (ctx.type === 'single') {
            ctx.onValueChange?.(value);
          } else {
            const current = Array.isArray(ctx.value) ? ctx.value.slice() : [];
            const idx = current.indexOf(value);
            if (idx >= 0) current.splice(idx, 1);
            else current.push(value);
            ctx.onValueChange?.(current);
          }
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
ToggleGroupItem.displayName = 'ToggleGroupItem';
