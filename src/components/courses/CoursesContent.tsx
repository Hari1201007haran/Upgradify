
import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Course, Career, GovernmentExam, useData } from '@/contexts/DataContext';
import CourseCard from './CourseCard';
import CoursesTable from './CoursesTable';
import CourseDetailsModal from './CourseDetailsModal';

interface CoursesContentProps {
  isLoading: boolean;
  filteredCourses: Course[];
  viewMode: 'cards' | 'table';
  selectedStream: string | null;
}

const CoursesContent: React.FC<CoursesContentProps> = ({ 
  isLoading, 
  filteredCourses, 
  viewMode,
  selectedStream
}) => {
  const { careers, governmentExams } = useData();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // Find related careers and exams for the selected course
  const relatedCareers = selectedCourse 
    ? careers.filter(career => 
        // Match careers that share at least one stream with the course
        career.streams.some(stream => selectedCourse.streams.includes(stream))
      )
    : [];

  const relatedExams = selectedCourse
    ? governmentExams.filter(exam =>
        // Match exams that share at least one stream with the course
        exam.streams.some(stream => selectedCourse.streams.includes(stream))
      )
    : [];

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
        <h3 className="mt-4 text-lg font-medium">No courses found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          Found {filteredCourses.length} courses
          {selectedStream ? ` in ${selectedStream}` : ''}
        </h3>
      </div>
      
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <div key={course.id} onClick={() => handleCourseClick(course)}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      ) : (
        <CoursesTable courses={filteredCourses} selectedStream={selectedStream} onCourseClick={handleCourseClick} />
      )}

      <CourseDetailsModal
        course={selectedCourse}
        relatedCareers={relatedCareers}
        relatedExams={relatedExams}
        isOpen={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
      />
    </>
  );
};

export default CoursesContent;
