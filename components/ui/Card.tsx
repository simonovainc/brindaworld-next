import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export function Card({ children, className, hoverable = false, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg bg-white shadow-md p-6',
        hoverable && 'hover:shadow-lg transition-shadow duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('border-b border-gray-200 pb-4 mb-4', className)}>{children}</div>;
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('border-t border-gray-200 pt-4 mt-4 flex gap-2', className)}>
      {children}
    </div>
  );
}
