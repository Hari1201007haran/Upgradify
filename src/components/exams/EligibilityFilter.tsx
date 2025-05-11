
import React from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen } from 'lucide-react';

interface EligibilityFilterProps {
  selectedEligibility: string | null;
  onEligibilityChange: (eligibility: string | null) => void;
}

const EligibilityFilter: React.FC<EligibilityFilterProps> = ({
  selectedEligibility,
  onEligibilityChange,
}) => {
  const eligibilityOptions = [
    { id: '12th-pass', label: 'Class 12 Pass', value: 'Class 12' },
    { id: 'graduate', label: 'Graduates', value: 'graduation' },
    { id: 'all', label: 'All Eligibility', value: null }
  ];
  
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">Eligibility Filter</h3>
      <div className="flex flex-wrap gap-2">
        {eligibilityOptions.map(option => (
          <Button 
            key={option.id}
            variant={selectedEligibility === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => onEligibilityChange(option.value)}
            className="flex items-center gap-1"
          >
            {option.id === '12th-pass' ? (
              <GraduationCap className="h-4 w-4" />
            ) : option.id === 'graduate' ? (
              <BookOpen className="h-4 w-4" />
            ) : null}
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EligibilityFilter;
