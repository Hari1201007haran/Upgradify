
import { Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  grade: string; // Will always be '12th'
  stream?: string | null;
  interests?: string[];
  age?: number | null;
  isAdmin?: boolean;
}

export interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

export interface RegisterData {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
}

// Enhanced email validation
export const isValidEmail = (email: string): boolean => {
  // Basic email format validation
  const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicEmailRegex.test(email)) return false;
  
  // Get the domain part (after @)
  const domain = email.split('@')[1].toLowerCase();
  
  // List of common valid email providers
  const validDomains = [
    // Gmail
    'gmail.com',
    // Yahoo
    'yahoo.com', 'yahoo.co.in', 'yahoo.co.uk',
    // Outlook/Hotmail/Live
    'outlook.com', 'hotmail.com', 'live.com', 'msn.com',
    // Other common providers
    'aol.com', 'icloud.com', 'protonmail.com', 'proton.me', 'mail.com',
    // Common educational domains
    'edu', 'ac.in', 'ac.uk',
    // Common organizational domains
    'org', 'org.in', 'org.uk',
    // Business domains
    'company.com',
    // For testing purposes
    'example.com'
  ];
  
  // Check if domain ends with any valid domain
  // This handles both exact matches and subdomains (e.g., school.edu)
  return validDomains.some(validDomain => 
    domain === validDomain || domain.endsWith('.' + validDomain)
  );
};
