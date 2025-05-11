
import { Course, Career, GovernmentExam } from './types';

export const getRecommendations = (
  stream: string,
  courses: Course[],
  careers: Career[],
  governmentExams: GovernmentExam[]
) => {
  const recommendedCourses = courses.filter((course) => 
    course.streams.includes(stream)
  ).slice(0, 5);
  
  const recommendedCareers = careers.filter((career) => 
    career.streams.includes(stream)
  ).slice(0, 3);
  
  const recommendedExams = governmentExams.filter((exam) => 
    exam.streams.includes(stream)
  ).slice(0, 2);
  
  return {
    recommendedCourses,
    recommendedCareers,
    recommendedExams
  };
};
