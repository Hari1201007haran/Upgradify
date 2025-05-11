
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Lock, Loader2, AlertCircle } from 'lucide-react';
import { isValidEmail } from '@/types/auth';
import { toast } from 'sonner';
import FormFieldWithIcon from './FormFieldWithIcon';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobileError, setMobileError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  // Validate email whenever it changes
  useEffect(() => {
    if (formData.email && !isValidEmail(formData.email)) {
      setEmailError("Please enter a valid email from a recognized provider");
    } else {
      setEmailError('');
    }
  }, [formData.email]);

  // Validate passwords whenever either changes
  useEffect(() => {
    if (formData.password && formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError('');
    }
  }, [formData.password, formData.confirmPassword]);

  // Validate mobile number
  useEffect(() => {
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      setMobileError("Mobile number should be 10 digits");
    } else {
      setMobileError('');
    }
  }, [formData.mobile]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateForm = () => {
    setError('');
    
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email from a recognized provider");
      toast.error("Invalid email address");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      toast.error("Passwords don't match");
      return false;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters");
      return false;
    }
    
    if (!/^\d{10}$/.test(formData.mobile)) {
      setError("Mobile number should be 10 digits");
      toast.error("Mobile number should be 10 digits");
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password
      });
      
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isFormValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.email.trim() !== '' &&
      isValidEmail(formData.email) &&
      formData.mobile.trim() !== '' &&
      !mobileError &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      !passwordError
    );
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4 flex items-start gap-2">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      <FormFieldWithIcon
        id="fullName"
        name="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={handleChange}
        icon={<User size={18} />}
        required
      />
      
      <FormFieldWithIcon
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        icon={<Mail size={18} />}
        error={emailError}
        required
      />
      
      <FormFieldWithIcon
        id="mobile"
        name="mobile"
        label="Mobile Number"
        placeholder="Enter your 10-digit mobile number"
        value={formData.mobile}
        onChange={handleChange}
        icon={<Phone size={18} />}
        error={mobileError}
        required
      />
      
      <FormFieldWithIcon
        id="password"
        name="password"
        label="Password"
        type="password"
        placeholder="Create a password (min. 6 characters)"
        value={formData.password}
        onChange={handleChange}
        icon={<Lock size={18} />}
        error={formData.password ? passwordError : ''}
        required
      />
      
      <FormFieldWithIcon
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        icon={<Lock size={18} />}
        error={formData.confirmPassword ? passwordError : ''}
        required
      />
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting || !isFormValid()}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;
