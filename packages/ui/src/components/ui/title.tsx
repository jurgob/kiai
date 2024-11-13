import React from 'react';
import { cn } from "@repo/ui/lib/utils"

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    size?: 'small' | 'medium' | 'large';
}

const Title: React.FC<TitleProps> = ({ size = 'medium', className, children, ...props }) => {
    const sizeClasses = {
        small: 'text-lg',
        medium: 'text-2xl',
        large: 'text-3xl ',
    };

    return (
        <h1 className={cn(sizeClasses[size], "font-bold",className)} {...props}>
            {children}
        </h1>
    );
};

export default Title;