import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AuthFormContainer from '@/components/auth/AuthFormContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lock, KeyRound, AlertCircle, CheckCircle } from 'lucide-react';

const PasswordResetPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Example: Get token from URL

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log('PasswordResetPage loaded. Token:', token);

  // useEffect(() => {
  //   if (!token) {
  //     setError("Invalid or missing reset token. Please request a new password reset link.");
  //   }
  // }, [token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setError(null);

    if (!token) {
        setError("Invalid or missing reset token. Please request a new password reset link.");
        setIsLoading(false);
        return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }
    if (newPassword.length < 6) {
        setError('Password must be at least 6 characters long.');
        setIsLoading(false);
        return;
    }

    console.log('Password reset attempt with token:', token);
    // Simulate API call
    setTimeout(() => {
      setMessage('Your password has been successfully reset! You can now login with your new password.');
      console.log('Password reset successful (simulated)');
      // In a real app, you might redirect to login page after a delay
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthFormContainer
      title="Reset Your Password"
      description="Enter your new password below. Make sure it's strong and memorable."
      footer={
        message ? (
          <Link to="/login" className="font-medium text-primary hover:underline">
            Proceed to Login
          </Link>
        ) : null
      }
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        {!token && !message && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Invalid Link</AlertTitle>
                <AlertDescription>The password reset link is invalid or has expired. Please <Link to="/forgot-password" className="underline">request a new one</Link>.</AlertDescription>
            </Alert>
        )}
        {message && (
          <Alert variant="default" className="bg-green-100 border-green-400 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-400">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle>Password Reset</AlertTitle>
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
        {token && !message && (
        <>
            <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                id="new-password"
                type="password"
                placeholder="••••••••"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-10"
                />
            </div>
            </div>
            <div className="grid gap-2">
            <Label htmlFor="confirm-new-password">Confirm New Password</Label>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                id="confirm-new-password"
                type="password"
                placeholder="••••••••"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="pl-10"
                />
            </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || !token}>
            {isLoading ? (
                <KeyRound className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <KeyRound className="mr-2 h-4 w-4" />
            )}
            Reset Password
            </Button>
        </>
        )}
      </form>
    </AuthFormContainer>
  );
};

export default PasswordResetPage;