import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Loader2 } from 'lucide-react'; // Using Github as an example, more can be added

// A simple type for common providers, extendable
type SocialProvider = 'google' | 'github' | 'facebook' | string;

interface SocialLoginButtonProps {
  provider: SocialProvider;
  onClick: () => void;
  isLoading?: boolean;
  children?: React.ReactNode; // To allow text like "Sign in with Google"
  className?: string;
}

// Helper to get icon based on provider
const getProviderIcon = (provider: SocialProvider): React.ReactNode => {
  switch (provider.toLowerCase()) {
    case 'google':
      // Placeholder for Google icon - typically an SVG or a different icon component
      // For now, let's use a generic string or import a Google icon from lucide if available
      // return <GoogleIcon className="mr-2 h-4 w-4" />; (Assuming GoogleIcon exists)
      return <span className="mr-2 font-bold">G</span>; // Simple placeholder
    case 'github':
      return <Github className="mr-2 h-4 w-4" />;
    // Add more cases for other providers like Facebook, Twitter etc.
    default:
      return null; // No icon for unknown providers or handle as needed
  }
};

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onClick,
  isLoading = false,
  children,
  className,
}) => {
  console.log(`Rendering SocialLoginButton for provider: ${provider}, isLoading: ${isLoading}`);

  const providerIcon = getProviderIcon(provider);
  const defaultText = children || `Sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`;

  return (
    <Button
      variant="outline"
      type="button"
      className={`w-full ${className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        providerIcon
      )}
      {defaultText}
    </Button>
  );
};

export default SocialLoginButton;