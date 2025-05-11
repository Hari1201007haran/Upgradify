
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { UserProfile, isValidEmail } from '@/types/auth';

export const login = async (email: string, password: string): Promise<void> => {
  try {
    // Validate email first
    if (!isValidEmail(email)) {
      throw new Error('Invalid email address. Please use a valid email from a recognized provider.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      throw error;
    }
    
    toast.success('Login successful!');
  } catch (error: any) {
    toast.error(error.message || 'Failed to login');
    throw error;
  }
};

export const register = async ({ email, password, fullName, mobile }: { 
  email: string;
  password: string;
  fullName: string;
  mobile: string;
}): Promise<void> => {
  try {
    // Validate email first
    if (!isValidEmail(email)) {
      throw new Error('Invalid email address. Please use a valid email from a recognized provider.');
    }

    // Validate password
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      throw new Error('Mobile number must be 10 digits');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          mobile
        }
      }
    });
    
    if (error) {
      throw error;
    }
    
    toast.success('Registration successful! You can now log in.');
  } catch (error: any) {
    toast.error(error.message || 'Registration failed');
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
    toast.info('You have been logged out');
  } catch (error: any) {
    toast.error(error.message || 'Failed to log out');
    console.error('Logout error:', error);
  }
};

export const updateProfile = async (user: UserProfile | null, setUser: (user: UserProfile) => void, data: Partial<UserProfile>): Promise<void> => {
  if (!user) {
    toast.error('You must be logged in to update your profile');
    return;
  }

  // Validate email if it's being updated
  if (data.email && !isValidEmail(data.email)) {
    toast.error('Invalid email address. Please use a valid email from a recognized provider.');
    return;
  }

  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: data.fullName,
        mobile: data.mobile,
        grade: data.grade,
        stream: data.stream,
        interests: data.interests,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) {
      throw error;
    }

    setUser({
      ...user,
      ...data
    });
    
    toast.success('Profile updated successfully');
  } catch (error: any) {
    toast.error(error.message || 'Failed to update profile');
    console.error('Update profile error:', error);
  }
};
