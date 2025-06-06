import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthFormContainer from '@/components/auth/AuthFormContainer';
import SocialLoginButton from '@/components/auth/SocialLoginButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mail, Lock, LogIn, AlertCircle, Github } from 'lucide-react'; // Added Github for SocialLoginButton

const LoginPage = () => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log('LoginPage loaded');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log('Login attempt:', { email, password, rememberMe });
    // Simulate API call
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password123') {
        console.log('Login successful');
        // In a real app, you would redirect or set auth state
        // For now, just simulate success and clear loading
        navigate('/'); // Redirect to homepage on successful login
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setError(null);
    console.log(`Social login attempt with ${provider}`);
    // Simulate API call
    setTimeout(() => {
      console.log(`${provider} login successful (simulated)`);
      // navigate('/'); // Redirect on successful social login
      setIsLoading(false);
    }, 2000);
  };

  return (
    <AuthFormContainer
      title="Login to Your Account"
      description="Welcome back! Please enter your details."
      footer={
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/registration" className="font-medium text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      }
    >
      <form onSubmit={handleLogin} className="grid gap-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Login Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="ml-auto inline-block text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label htmlFor="remember-me" className="text-sm font-normal">
            Remember me
          </Label>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <LogIn className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogIn className="mr-2 h-4 w-4" />
          )}
          Login
        </Button>
      </form>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid gap-2">
        <SocialLoginButton
          provider="google"
          onClick={() => handleSocialLogin('Google')}
          isLoading={isLoading}
        />
        <SocialLoginButton
          provider="github"
          onClick={() => handleSocialLogin('GitHub')}
          isLoading={isLoading}
        >
           {/* Custom children can be passed, e.g. to override default text or icon handling in SocialLoginButton */}
        </SocialLoginButton>
      </div>
    </AuthFormContainer>
  );
};

export default LoginPage;