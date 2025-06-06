import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthFormContainer from '@/components/auth/AuthFormContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mail, Send, AlertCircle, CheckCircle } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log('ForgotPasswordPage loaded');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setError(null);
    console.log('Forgot password request for:', email);

    // Simulate API call
    setTimeout(() => {
      if (email.includes('@')) { // Basic email validation simulation
        setMessage(`If an account exists for ${email}, a password reset link has been sent.`);
        console.log('Password reset link sent (simulated)');
      } else {
        setError('Please enter a valid email address.');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthFormContainer
      title="Forgot Your Password?"
      description="No worries! Enter your email below and we'll send you a link to reset it."
      footer={
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Remembered your password?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        {message && (
          <Alert variant="default" className="bg-blue-100 border-blue-400 text-blue-700 dark:bg-blue-900/30 dark:border-blue-600 dark:text-blue-400">
            <CheckCircle className="h-4 w-4 text-blue-500" />
            <AlertTitle>Check Your Email</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Send className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          Send Reset Link
        </Button>
      </form>
    </AuthFormContainer>
  );
};

export default ForgotPasswordPage;