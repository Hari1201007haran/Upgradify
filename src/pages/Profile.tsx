
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import MainLayout from '@/components/layout/MainLayout';
import PageTransition from '@/components/layout/PageTransition';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import UserInteractionsPanel from '@/components/experts/UserInteractionsPanel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const STREAMS = [
  'Science', 'Commerce', 'Arts', 'Engineering', 'Medical', 
  'Law', 'Humanities', 'Computer Science', 'Management'
] as const;

interface ProfileData {
  fullName: string;
  email: string;
  mobile: string;
  grade: string;
  stream: string | null;
  interests: string[];
  age: number | null;
}

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: user?.fullName || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    grade: '12th', // Always set to '12th'
    stream: user?.stream || null,
    interests: user?.interests || [],
    age: user?.age || null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName || '',
        email: user.email || '',
        mobile: user.mobile || '',
        grade: '12th', // Always set to '12th' regardless of user data
        stream: user.stream || null,
        interests: user.interests || [],
        age: user.age || null
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = value ? parseInt(value, 10) : null;
    setProfileData(prevData => ({
      ...prevData,
      [name]: numberValue,
    }));
  };

  const handleStreamChange = (value: string) => {
    setProfileData(prevData => ({
      ...prevData,
      stream: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!user) {
        throw new Error("User not authenticated.");
      }

      // Always set grade to '12th' before submitting
      const dataToSubmit = {
        ...profileData,
        grade: '12th'
      };

      await updateProfile(dataToSubmit);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      console.error("Profile update failed:", error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your account settings and view your interactions</p>
          </div>
          
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={profileData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  type="number"
                  id="age"
                  name="age"
                  min="14"
                  max="100"
                  value={profileData.age || ''}
                  onChange={handleNumberChange}
                  placeholder="Enter your age"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Note: Government exam eligibility is typically for ages 16-24
                </p>
              </div>
              <div>
                <Label htmlFor="grade">Grade</Label>
                <Input
                  type="text"
                  id="grade"
                  name="grade"
                  value="12th"
                  disabled
                  className="bg-gray-100"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Grade is fixed at 12th for all students
                </p>
              </div>
              <div>
                <Label htmlFor="stream">Academic Stream</Label>
                <Select
                  value={profileData.stream || ''}
                  onValueChange={handleStreamChange}
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
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                    Updating...
                  </span>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </form>
          </div>
          
          {/* Expert Interactions Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Expert Interactions</h2>
            <p className="text-muted-foreground">Your consultations and messages with education experts</p>
            <UserInteractionsPanel />
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Profile;
