import * as React from 'react';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'type'> {
  min: number;
  max: number;
  step?: number;
  value: number[];
  onValueChange?: (value: number[]) => void;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ min, max, step = 1, value, onValueChange, className, ...props }, ref) => (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0] ?? min}
      onChange={(e) => onValueChange?.([parseFloat(e.target.value)])}
      className={['w-full cursor-pointer', className].filter(Boolean).join(' ')}
      {...props}
    />
  )
);
Slider.displayName = 'Slider';
