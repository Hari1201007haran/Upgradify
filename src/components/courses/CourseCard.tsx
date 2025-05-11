
import React from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Course } from '@/contexts/DataContext';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <GlassCard 
      className="p-5 hover:shadow-lg transition-all cursor-pointer scale-in-animation"
      variant="elevated"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-lg bg-indigo-100">
            <BookOpen className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="flex flex-wrap gap-1">
            {course.streams.map((stream) => (
              <span 
                key={stream} 
                className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full"
              >
                {stream}
              </span>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        </div>
        
        <div className="pt-2 flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-sm text-muted-foreground">{course.duration}</span>
          </div>
          <Button size="sm" variant="ghost" className="text-primary p-0">
            <span className="mr-1">View Careers</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};

export default CourseCard;
