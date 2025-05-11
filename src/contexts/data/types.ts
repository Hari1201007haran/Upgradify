
// Data type definitions for the application

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  streams: string[];
}

export interface College {
  id: string;
  name: string;
  description: string;
  location: string;
  ranking: number;
  courses: string[];
  category?: string; // Add category field here too
}

export interface Career {
  id: string;
  title: string;
  description: string;
  skills: string[];
  education: string[];
  jobOutlook: string;
  salary: string;
  streams: string[];
  interests: string[]; // Added interests field
}

export interface GovernmentExam {
  id: string;
  title: string;
  description: string;
  eligibility: string[] | string;
  streams: string[];
  preparationTime: string;
}

export interface NIRFRanking {
  id: string;
  name: string;
  rank: number;
  location: string;
  category: string;
  score: number;
  description: string;
}

export interface DataContextType {
  courses: Course[];
  colleges: College[];
  careers: Career[];
  governmentExams: GovernmentExam[];
  nirfRankings: NIRFRanking[];
  getRecommendations: (stream: string) => {
    recommendedCourses: Course[];
    recommendedCareers: Career[];
    recommendedExams: GovernmentExam[];
  };
  isLoading: boolean;
  error: string | null;
}
