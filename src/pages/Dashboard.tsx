
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import MainLayout from '@/components/layout/MainLayout';
import GlassCard from '@/components/ui/GlassCard';
import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, GraduationCap, BookOpen, School, Clock, Database, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Dashboard = () => {
  const { user } = useAuth();
  const { getRecommendations, colleges, isLoading, error, courses, careers, governmentExams } = useData();
  const navigate = useNavigate();
  
  const stream = user?.stream || 'Science';
  const interests = user?.interests || [];
  
  const { recommendedCareers, recommendedCourses, recommendedExams } = getRecommendations(stream);
  
  return (
    <MainLayout>
      <PageTransition>
        <div className="space-y-8">
          {/* Welcome Section */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Welcome, {user?.fullName}</h1>
              <p className="text-muted-foreground">
                {stream} Stream • 12th Grade
              </p>
            </div>
            
            <GlassCard className="p-6 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border-none">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-xl font-medium">Your journey begins here!</h2>
                  <p className="text-muted-foreground">
                    Explore careers, courses, and colleges based on your interests.
                  </p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => navigate('/profile')}
                    className="button-hover"
                  >
                    Edit Profile
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => navigate('/careers')}
                    className="button-hover"
                  >
                    Explore Careers
                  </Button>
                </div>
              </div>
            </GlassCard>
          </section>
          
          {/* Loading state */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Loading educational data...</p>
            </div>
          )}
          
          {/* Error state */}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error loading data</AlertTitle>
              <AlertDescription>
                {error}. Using fallback data instead.
              </AlertDescription>
            </Alert>
          )}
          
          {/* Database Status */}
          {!isLoading && (
            <GlassCard className="p-6 bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-none">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <Database className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-medium">Database Status</h2>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <p className="text-sm"><span className="font-semibold">Courses:</span> {courses.length}</p>
                    <p className="text-sm"><span className="font-semibold">Colleges:</span> {colleges.length}</p>
                    <p className="text-sm"><span className="font-semibold">Careers:</span> {careers.length}</p>
                    <p className="text-sm"><span className="font-semibold">Government Exams:</span> {governmentExams.length}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}
          
          {/* Stats Overview */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <GlassCard className="p-4 slide-up-animation" style={{animationDelay: '0.1s'}}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Career Options</p>
                  <h3 className="text-2xl font-bold mt-1">10+</h3>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Based on your {stream} stream
              </p>
            </GlassCard>
            
            <GlassCard className="p-4 slide-up-animation" style={{animationDelay: '0.2s'}}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Courses Available</p>
                  <h3 className="text-2xl font-bold mt-1">50+</h3>
                </div>
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Across top colleges in Chennai
              </p>
            </GlassCard>
            
            <GlassCard className="p-4 slide-up-animation" style={{animationDelay: '0.3s'}}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Govt Exams</p>
                  <h3 className="text-2xl font-bold mt-1">25+</h3>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Opportunities for 12th students
              </p>
            </GlassCard>
            
            <GlassCard className="p-4 slide-up-animation" style={{animationDelay: '0.4s'}}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Application Deadlines</p>
                  <h3 className="text-2xl font-bold mt-1">5</h3>
                </div>
                <div className="p-2 bg-red-100 rounded-lg">
                  <Clock className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Upcoming in the next 30 days
              </p>
            </GlassCard>
          </section>
          
          {/* Recommendations */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Personalized Recommendations</h2>
            
            {/* Career Recommendations */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Recommended Careers</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/careers')}
                  className="text-primary"
                >
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedCareers.slice(0, 3).map((career, index) => (
                  <GlassCard 
                    key={career.id}
                    className="p-4 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => navigate(`/careers/${career.id}`)}
                    variant="elevated"
                  >
                    <div className="space-y-2">
                      <div className="p-2 w-fit rounded-lg bg-primary/10">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-semibold">{career.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {career.description}
                      </p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
            
            {/* Course Recommendations */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Recommended Courses</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/courses')}
                  className="text-primary"
                >
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedCourses.slice(0, 3).map((course) => (
                  <GlassCard 
                    key={course.id} 
                    className="p-4 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => navigate(`/courses/${course.id}`)}
                    variant="elevated"
                  >
                    <div className="space-y-2">
                      <div className="p-2 w-fit rounded-lg bg-indigo-100">
                        <BookOpen className="h-5 w-5 text-indigo-600" />
                      </div>
                      <h4 className="font-semibold">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Duration: {course.duration}
                      </p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
            
            {/* Government Exam Recommendations */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Government Exams</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/government-exams')}
                  className="text-primary"
                >
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedExams.slice(0, 3).map((exam) => (
                  <GlassCard 
                    key={exam.id} 
                    className="p-4 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => navigate(`/government-exams/${exam.id}`)}
                    variant="elevated"
                  >
                    <div className="space-y-2">
                      <div className="p-2 w-fit rounded-lg bg-purple-100">
                        <GraduationCap className="h-5 w-5 text-purple-600" />
                      </div>
                      <h4 className="font-semibold">{exam.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {exam.description}
                      </p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
            
            {/* NIRF Rankings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Top Colleges in Chennai</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/nirf-rankings')}
                  className="text-primary"
                >
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {colleges.slice(0, 4).map((college) => (
                  <GlassCard 
                    key={college.id} 
                    className="p-4 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => navigate(`/nirf-rankings/${college.id}`)}
                    variant="elevated"
                  >
                    <div className="flex gap-4">
                      <div className="p-2 w-fit h-fit rounded-lg bg-blue-100">
                        <School className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold">{college.name}</h4>
                        <p className="text-sm text-muted-foreground">{college.location}</p>
                        <div className="flex items-center">
                          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            Rank #{college.ranking}
                          </span>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Dashboard;
