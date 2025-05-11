
import React from 'react';
import { Course } from '@/contexts/DataContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

interface CoursesTableProps {
  courses: Course[];
  selectedStream: string | null;
  onCourseClick: (course: Course) => void;
}

const CoursesTable: React.FC<CoursesTableProps> = ({ courses, selectedStream, onCourseClick }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Course Name</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Streams</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow 
              key={course.id}
              className="cursor-pointer hover:bg-secondary/20"
              onClick={() => onCourseClick(course)}
            >
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-primary" />
                  {course.title}
                </div>
              </TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {course.streams.map((stream) => (
                    <Badge 
                      key={stream} 
                      variant={stream === selectedStream ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {stream}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onCourseClick(course);
                  }}
                >
                  View Careers
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CoursesTable;
