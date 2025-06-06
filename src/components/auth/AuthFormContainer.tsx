import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthFormContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  description,
  children,
  footer,
  className,
}) => {
  console.log("Rendering AuthFormContainer with title:", title);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <Card className={`w-full max-w-md ${className}`}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
          {description && (
            <CardDescription className="mt-2">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="grid gap-4">
          {children}
        </CardContent>
        {footer && (
          <CardFooter className="flex flex-col items-center space-y-2">
            {footer}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AuthFormContainer;