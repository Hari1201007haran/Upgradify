
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

interface FormFieldWithIconProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  error?: string;
  required?: boolean;
}

const FormFieldWithIcon = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  error,
  required = false,
}: FormFieldWithIconProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
        <Input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`pl-10 ${error ? 'border-red-500' : ''}`}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
};

export default FormFieldWithIcon;
