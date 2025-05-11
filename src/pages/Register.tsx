
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import PageTransition from '@/components/layout/PageTransition';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50 p-4">
        <div className="w-full max-w-md scale-in-animation">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-2 bg-primary rounded-xl mb-4">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-muted-foreground mt-2">
              Join us to explore career opportunities
            </p>
          </div>
          
          <GlassCard className="p-6">
            <RegisterForm />
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;
