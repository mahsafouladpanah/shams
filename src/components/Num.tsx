import React from 'react';

export interface NumProps extends React.HTMLAttributes<HTMLSpanElement> {
  value?: number | string;
  children?: React.ReactNode;
  unit?: string;
  prefix?: string;
  variant?: 'default' | 'large' | 'small' | 'badge';
}

/**
 * Num — Clean + Modern + Minimal + Premium Numeric Display Component
 * Enforces Inter font for all numeric/data-focused UI elements, with tabular numbers
 * and proper RTL directional isolation.
 */
export const Num: React.FC<NumProps> = ({
  value,
  children,
  unit,
  prefix,
  variant = 'default',
  className = '',
  ...props
}) => {
  const content = value !== undefined ? value : children;
  
  const variantClass = 
    variant === 'large' ? 'metric-large text-2xl md:text-3xl' :
    variant === 'small' ? 'metric-small text-xs md:text-sm' :
    variant === 'badge' ? 'metric-small text-[11px] font-bold' :
    'font-numeric';

  return (
    <span
      className={`inline-flex items-baseline gap-1 font-numeric tabular-nums ${variantClass} ${className}`}
      dir="ltr"
      {...props}
    >
      {prefix && <span className="font-vazirmatn text-xs font-normal opacity-80 mr-0.5">{prefix}</span>}
      <span className="font-numeric">{content}</span>
      {unit && <span className="font-vazirmatn text-xs font-normal opacity-80 ml-0.5">{unit}</span>}
    </span>
  );
};

export default Num;
