import React from 'react';
import { cn } from '@/ui-kit/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  className = '', 
  variant = 'default' 
}) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full';
  const variantClasses = variant === 'outline' 
    ? 'border bg-white text-gray-700' 
    : 'bg-gray-100 text-gray-800';
  
  return (
    <span className={cn(baseClasses, variantClasses, className)}>
      {children}
    </span>
  );
};