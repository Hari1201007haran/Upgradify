
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight, BookOpen, CompassIcon, Award } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import PageTransition from '@/components/layout/PageTransition';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
        {/* Header */}
        <header className="fixed top-0 w-full z-10 bg-white/80 backdrop-blur-md border-b">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">After School Opportunity</h1>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="button-hover"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="button-hover"
              >
                Register
              </Button>
            </div>
          </div>
        </header>
        
        {/* Hero Section */}
        <section className="pt-28 pb-20 md:pt-40 md:pb-32 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center gap-12">
              <div className="flex-1 space-y-6">
                <div>
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                    For Chennai 12th Standard Students
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Your Guide to <span className="text-gradient">Future Opportunities</span>
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Discover career paths, explore courses, and find top colleges in Chennai tailored to your interests and academic stream.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/register')}
                    className="button-hover group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => navigate('/login')}
                    className="button-hover"
                  >
                    Login to Your Account
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl transform rotate-3 scale-95 opacity-70"></div>
                <GlassCard className="p-8 mx-auto max-w-md scale-in-animation">
                  <div className="space-y-8">
                    <div className="p-3 bg-primary/10 w-fit rounded-xl">
                      <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold">Personalized Guidance</h3>
                      <p className="text-muted-foreground">
                        After School Opportunity provides personalized recommendations based on your academic interests.
                      </p>
                      <div className="grid grid-cols-2 gap-3 pt-4">
                        <div className="bg-white/70 p-3 rounded-lg border border-blue-100">
                          <p className="font-medium">50+ Courses</p>
                        </div>
                        <div className="bg-white/70 p-3 rounded-lg border border-blue-100">
                          <p className="font-medium">Top Colleges</p>
                        </div>
                        <div className="bg-white/70 p-3 rounded-lg border border-blue-100">
                          <p className="font-medium">Career Paths</p>
                        </div>
                        <div className="bg-white/70 p-3 rounded-lg border border-blue-100">
                          <p className="font-medium">NIRF Rankings</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">How We Help You Succeed</h2>
              <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
                Discover the tools and resources that will guide you toward the right educational path after 12th grade.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GlassCard className="p-6 flex flex-col items-center text-center scale-in-animation" style={{animationDelay: '0.1s'}}>
                <div className="p-3 bg-primary/10 rounded-xl mb-4">
                  <CompassIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Discovery</h3>
                <p className="text-muted-foreground">
                  Explore career options tailored to your academic stream and personal interests.
                </p>
              </GlassCard>
              
              <GlassCard className="p-6 flex flex-col items-center text-center scale-in-animation" style={{animationDelay: '0.2s'}}>
                <div className="p-3 bg-indigo-100 rounded-xl mb-4">
                  <BookOpen className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Course Guidance</h3>
                <p className="text-muted-foreground">
                  Find the right courses and educational paths that align with your career goals.
                </p>
              </GlassCard>
              
              <GlassCard className="p-6 flex flex-col items-center text-center scale-in-animation" style={{animationDelay: '0.3s'}}>
                <div className="p-3 bg-blue-100 rounded-xl mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Top Colleges</h3>
                <p className="text-muted-foreground">
                  Discover Chennai's top-rated colleges based on NIRF rankings and student feedback.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <GlassCard className="p-8 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border-none">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
                  <p className="text-muted-foreground">
                    Create your account today and get personalized guidance for your educational journey.
                  </p>
                </div>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/register')}
                  className="button-hover"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </GlassCard>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-white py-12 px-4 border-t">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">After School Opportunity</h2>
              </div>
              <div className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} After School Opportunity. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Index;
