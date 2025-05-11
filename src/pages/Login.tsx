
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import PageTransition from '@/components/layout/PageTransition';
import { isValidEmail } from '@/types/auth';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Validate email whenever it changes
  useEffect(() => {
    if (email && !isValidEmail(email)) {
      setEmailError('Please enter a valid email address from a recognized provider');
    } else {
      setEmailError('');
    }
  }, [email]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isValidEmail(email)) {
      toast.error('Invalid email address. Please use a valid email from a recognized provider.');
      setEmailError('Please enter a valid email address from a recognized provider');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50 p-4">
        <div className="w-full max-w-md scale-in-animation">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-2 bg-primary rounded-xl mb-4">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to continue your education journey
            </p>
          </div>
          
          <GlassCard className="p-6">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4 flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`pl-10 ${emailError ? 'border-red-500' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {emailError && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {emailError}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || !email || !password || !!emailError}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline">
                  Create an account
                </Link>
              </p>
            </div>
          </GlassCard>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>For demo, use:</p>
            <p>Email: student@gmail.com (or any valid email)</p>
            <p>Password: (any password will work)</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
