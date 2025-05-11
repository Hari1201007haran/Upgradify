import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import MainLayout from '@/components/layout/MainLayout';
import PageTransition from '@/components/layout/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SearchBar from '@/components/courses/SearchBar';
import StreamFilter from '@/components/courses/StreamFilter';
import CoursesContent from '@/components/courses/CoursesContent';
import CollegesContent from '@/components/courses/CollegesContent';
import CoursesDecoration from '@/components/courses/CoursesDecoration';

const Courses = () => {
  const { user } = useAuth();
  const { courses, colleges, isLoading } = useData();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState<string | null>(user?.stream || null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table'); // Default to table view
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStream = selectedStream ? course.streams.includes(selectedStream) : true;
    
    return matchesSearch && matchesStream;
  });
  
  const filteredColleges = colleges.filter(college => {
    return college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Group courses by stream for easier navigation
  const streamOptions = ['Computer Science', 'Biology', 'Commerce', 'Arts', 'Science', 'Law'];
  
  // Count courses per stream
  const courseCounts = {
    'Computer Science': courses.filter(course => course.streams.includes('Computer Science')).length,
    'Biology': courses.filter(course => course.streams.includes('Biology')).length,
    'Commerce': courses.filter(course => course.streams.includes('Commerce')).length,
    'Arts': courses.filter(course => course.streams.includes('Arts')).length,
    'Science': courses.filter(course => course.streams.includes('Science')).length,
    'Law': courses.filter(course => course.streams.includes('Law')).length,
    'All': courses.length
  };

  // Add console logs to help with debugging
  useEffect(() => {
    console.log("Total courses:", courses.length);
    console.log("Computer Science courses:", courses.filter(course => course.streams.includes('Computer Science')).length);
    console.log("Law courses:", courses.filter(course => course.streams.includes('Law')).length);
    console.log("Filtered courses:", filteredCourses.length);
    console.log("Selected stream:", selectedStream);
  }, [courses, filteredCourses, selectedStream]);
  
  return (
    <MainLayout>
      <PageTransition>
        <div className="space-y-8">
          <section className="space-y-4">
            <div className="flex flex-wrap justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">Courses & Colleges</h1>
                <p className="text-muted-foreground mt-1">
                  Explore {courses.length} courses and top colleges in India
                </p>
              </div>
              <div className="hidden md:block w-[300px]">
                <CoursesDecoration />
              </div>
            </div>
            
            {/* Search and Filters */}
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
            
            <StreamFilter 
              streamOptions={streamOptions}
              selectedStream={selectedStream}
              setSelectedStream={setSelectedStream}
              courseCounts={courseCounts}
            />
          </section>
          
          {/* Tabs */}
          <Tabs defaultValue="courses" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="colleges">Colleges</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses" className="space-y-6">
              <CoursesContent 
                isLoading={isLoading}
                filteredCourses={filteredCourses}
                viewMode={viewMode}
                selectedStream={selectedStream}
              />
            </TabsContent>
            
            <TabsContent value="colleges" className="space-y-6">
              <CollegesContent 
                isLoading={isLoading}
                filteredColleges={filteredColleges}
                viewMode={viewMode}
              />
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Courses;
