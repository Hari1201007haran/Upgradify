
import React from 'react';
import { School, ArrowRight } from 'lucide-react';
import { College } from '@/contexts/DataContext';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';

interface CollegeCardProps {
  college: College;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {
  return (
    <GlassCard 
      className="p-5 hover:shadow-lg transition-all cursor-pointer scale-in-animation"
      variant="elevated"
    >
      <div className="flex gap-4">
        <div className="p-2 h-fit rounded-lg bg-blue-100">
          <School className="h-6 w-6 text-blue-600" />
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{college.name}</h3>
            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              Rank #{college.ranking}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{college.location}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {college.description}
          </p>
          <div className="pt-2 flex justify-between items-center">
            <div className="flex flex-wrap gap-1">
              {college.courses.slice(0, 2).map((course, index) => (
                <span 
                  key={index} 
                  className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"
                >
                  {course.split(' ')[0]}
                </span>
              ))}
              {college.courses.length > 2 && (
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                  +{college.courses.length - 2}
                </span>
              )}
            </div>
            <Button size="sm" variant="ghost" className="text-primary p-0">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default CollegeCard;
