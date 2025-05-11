
import React, { createContext, useContext, useState, useEffect } from 'react';
import { DataContextType } from './data/types';
import { computerScienceCourses } from './data/computerScienceCourses';
import { biologyCourses } from './data/biologyCourses';
import { commerceCourses } from './data/commerceCourses';
import { artsCourses } from './data/artsCourses';
import { scienceCourses } from './data/scienceCourses';
import { colleges } from './data/colleges';
import { careers } from './data/careers';
import { governmentExams } from './data/governmentExams';
import { nirfRankings } from './data/nirfRankings';
import { getRecommendations as getRecommendationsUtil } from './data/recommendations';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Course, College, Career, GovernmentExam, NIRFRanking, lawCourses,
  mapDbCourse, mapDbCollege, mapDbCareer, mapDbGovernmentExam, mapDbNIRFRanking
} from '@/types/data';
import { toast } from 'sonner';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const [governmentExams, setGovernmentExams] = useState<GovernmentExam[]>([]);
  const [nirfRankings, setNirfRankings] = useState<NIRFRanking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch all data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch courses
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*');
        
        if (coursesError) throw new Error(`Error fetching courses: ${coursesError.message}`);
        
        // Log the number of courses to help with debugging
        console.log(`Fetched ${coursesData.length} courses from database`);
        console.log(`Law courses count:`, coursesData.filter(c => c.streams.includes('Law')).length);
        
        // Map the database courses
        const mappedCourses = coursesData.map(mapDbCourse);
        setCourses(mappedCourses);
        
        // Fetch colleges
        const { data: collegesData, error: collegesError } = await supabase
          .from('colleges')
          .select('*');
        
        if (collegesError) throw new Error(`Error fetching colleges: ${collegesError.message}`);
        setColleges(collegesData.map(mapDbCollege));
        
        // Fetch careers
        const { data: careersData, error: careersError } = await supabase
          .from('careers')
          .select('*');
        
        if (careersError) throw new Error(`Error fetching careers: ${careersError.message}`);
        setCareers(careersData.map(mapDbCareer));
        
        // Fetch government exams - adding pagination for larger dataset
        const { data: examsData, error: examsError } = await supabase
          .from('government_exams')
          .select('*')
          .order('title', { ascending: true });
        
        if (examsError) throw new Error(`Error fetching exams: ${examsError.message}`);
        
        // Log the number of exams to help with debugging
        console.log(`Fetched ${examsData.length} government exams from database`);
        console.log(`Law exams count:`, examsData.filter(e => e.streams.includes('Law')).length);
        
        setGovernmentExams(examsData.map(mapDbGovernmentExam));
        
        // Fetch NIRF rankings
        const { data: rankingsData, error: rankingsError } = await supabase
          .from('nirf_rankings')
          .select('*');
        
        if (rankingsError) throw new Error(`Error fetching rankings: ${rankingsError.message}`);
        setNirfRankings(rankingsData.map(mapDbNIRFRanking));
        
        toast.success('Successfully loaded educational data');
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        toast.error('Failed to fetch educational data');
        
        // Fallback to static data
        const allCourses = [
          ...computerScienceCourses, 
          ...biologyCourses, 
          ...commerceCourses, 
          ...artsCourses,
          ...scienceCourses,
          ...lawCourses  // Add the law courses here
        ];
        setCourses(allCourses);
        setColleges(colleges);
        setCareers(careers);
        setGovernmentExams(governmentExams);
        setNirfRankings(nirfRankings);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Create getRecommendations function that uses the utility
  const getRecommendations = (stream: string) => {
    // Add support for all academic streams when getting recommendations
    const normalizedStream = stream === 'Computer Science' ? 'Science' :
                            stream === 'Engineering' ? 'Science' :
                            stream === 'Medical' ? 'Science' :
                            stream === 'Humanities' ? 'Arts' :
                            stream === 'Management' ? 'Commerce' :
                            stream;
                            
    return getRecommendationsUtil(normalizedStream, courses, careers, governmentExams);
  };

  return (
    <DataContext.Provider value={{ 
      courses,
      colleges,
      careers,
      governmentExams,
      nirfRankings,
      getRecommendations,
      isLoading,
      error
    }}>
      {children}
    </DataContext.Provider>
  );
};

// Re-export types for ease of use elsewhere in the application
export type {
  Course,
  College,
  Career,
  GovernmentExam,
  NIRFRanking
} from '@/types/data';
