
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'subtle';
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}) => {
  const baseStyles = "glass-panel rounded-lg transition-all duration-300";
  
  const variantStyles = {
    default: "bg-white/80 backdrop-blur-md border border-white/20 shadow-md",
    elevated: "bg-white/90 backdrop-blur-lg border border-white/30 shadow-lg hover:shadow-xl",
    subtle: "bg-white/60 backdrop-blur-sm border border-white/10 shadow-sm"
  };
  
  return (
    <div 
      className={cn(
        baseStyles,
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
