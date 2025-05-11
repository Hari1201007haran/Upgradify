import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import PageTransition from '@/components/layout/PageTransition';

const STREAMS = [
  'Science', 'Commerce', 'Arts', 'Engineering', 'Medical', 
  'Law', 'Humanities', 'Computer Science', 'Management'
] as const;

const INTERESTS = [
  'Technology', 'Coding', 'Mathematics', 'Problem Solving',
  'Biology', 'Chemistry', 'Physics', 'Research',
  'Finance', 'Economics', 'Business', 'Management',
  'Literature', 'History', 'Psychology', 'Sociology',
  'Design', 'Art', 'Music', 'Communication',
  'Law', 'Medicine', 'Engineering', 'Architecture'
];

const ProfileSetup = () => {
  const [stream, setStream] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      if (selectedInterests.length < 5) {
        setSelectedInterests([...selectedInterests, interest]);
      }
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stream) return;
    
    setIsSubmitting(true);
    
    try {
      // Update user profile
      updateProfile({
        grade: '12th',
        stream: stream as 'Science' | 'Commerce' | 'Arts' | 'Engineering' | 'Medical' | 'Law' | 'Humanities' | 'Computer Science' | 'Management',
        interests: selectedInterests
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50 p-4">
        <div className="w-full max-w-2xl scale-in-animation">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Set Up Your Profile</h1>
            <p className="text-muted-foreground mt-2">
              Let's personalize your experience, {user?.fullName}
            </p>
          </div>
          
          <GlassCard className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Academic Stream */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-medium">Select Your Academic Stream</h2>
                  <p className="text-sm text-muted-foreground">
                    This helps us suggest relevant careers and courses
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <Select
                    value={stream || ''}
                    onValueChange={setStream}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your academic stream" />
                    </SelectTrigger>
                    <SelectContent>
                      {STREAMS.map((streamOption) => (
                        <SelectItem key={streamOption} value={streamOption}>
                          {streamOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Interests */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-medium">Select Your Interests</h2>
                  <p className="text-sm text-muted-foreground">
                    Choose up to 5 interests to help us provide better recommendations
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {INTERESTS.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`relative rounded-lg border-2 p-3 text-sm font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-muted bg-white hover:border-primary/50 text-foreground'
                        }`}
                      >
                        <span>{interest}</span>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={!stream || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting Up...
                  </>
                ) : (
                  <>
                    Continue to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProfileSetup;
