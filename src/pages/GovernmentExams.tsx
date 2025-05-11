import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useData, GovernmentExam } from '@/contexts/DataContext';
import MainLayout from '@/components/layout/MainLayout';
import GlassCard from '@/components/ui/GlassCard';
import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, GraduationCap, Clock, Users, BookOpenCheck, Award, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EligibilityFilter from '@/components/exams/EligibilityFilter';
import ExamDetailsModal from '@/components/exams/ExamDetailsModal';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const GovernmentExams = () => {
  const { user } = useAuth();
  const { governmentExams, isLoading } = useData();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState<string | null>(user?.stream || null);
  const [selectedEligibility, setSelectedEligibility] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table'); // Default to table view
  const [selectedExam, setSelectedExam] = useState<GovernmentExam | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  
  // Close modal function
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExam(null);
  };

  // Open modal function
  const handleExamClick = (exam: GovernmentExam) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };
  
  const filteredExams = governmentExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStream = selectedStream ? exam.streams.includes(selectedStream) : true;
    
    // Filter by eligibility
    const matchesEligibility = selectedEligibility ? 
      (typeof exam.eligibility === 'string' ? 
        exam.eligibility.toLowerCase().includes(selectedEligibility.toLowerCase()) : 
        exam.eligibility.some(e => e.toLowerCase().includes(selectedEligibility.toLowerCase()))) : 
      true;
    
    return matchesSearch && matchesStream && matchesEligibility;
  });
  
  // Calculate pagination values
  const totalPages = Math.ceil(filteredExams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExams = filteredExams.slice(startIndex, endIndex);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStream, selectedEligibility]);
  
  const generalExams = paginatedExams.filter(exam => 
    exam.streams.length >= 3
  );
  
  const streamSpecificExams = paginatedExams.filter(exam => 
    exam.streams.length < 3 && 
    (selectedStream ? exam.streams.includes(selectedStream) : true)
  );
  
  // Count exams per stream
  const examCounts = {
    'Computer Science': governmentExams.filter(exam => exam.streams.includes('Computer Science')).length,
    'Biology': governmentExams.filter(exam => exam.streams.includes('Biology')).length,
    'Commerce': governmentExams.filter(exam => exam.streams.includes('Commerce')).length,
    'Arts': governmentExams.filter(exam => exam.streams.includes('Arts')).length,
    'Science': governmentExams.filter(exam => exam.streams.includes('Science')).length,
    'Law': governmentExams.filter(exam => exam.streams.includes('Law')).length,
    'Engineering': governmentExams.filter(exam => exam.streams.includes('Engineering')).length,
    'All': governmentExams.length
  };

  // Count exams by eligibility
  const class12ExamsCount = governmentExams.filter(exam => {
    return typeof exam.eligibility === 'string' ? 
      exam.eligibility.toLowerCase().includes('class 12') : 
      exam.eligibility.some(e => e.toLowerCase().includes('class 12'));
  }).length;

  // Define stream options
  const streamOptions = ['Computer Science', 'Biology', 'Commerce', 'Arts', 'Science', 'Law', 'Engineering'];
  
  // Generate pagination links
  const generatePaginationLinks = () => {
    const links = [];
    
    // Always show first page
    links.push(
      <PaginationItem key="first">
        <PaginationLink 
          onClick={() => setCurrentPage(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Show ellipsis if needed
    if (currentPage > 3) {
      links.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Show current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last as they're always shown
      links.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => setCurrentPage(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      links.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      links.push(
        <PaginationItem key="last">
          <PaginationLink 
            onClick={() => setCurrentPage(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return links;
  };
  
  // Add console logs to help with debugging
  useEffect(() => {
    console.log("Total government exams:", governmentExams.length);
    console.log("Class 12 eligible exams:", class12ExamsCount);
    console.log("Filtered exams:", filteredExams.length);
    console.log("Selected stream:", selectedStream);
    console.log("Selected eligibility:", selectedEligibility);
  }, [governmentExams, filteredExams, selectedStream, selectedEligibility]);

  return (
    <MainLayout>
      <PageTransition>
        <div className="space-y-8">
          <section className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">Government Exams</h1>
              <p className="text-muted-foreground mt-1">
                Explore {governmentExams.length} government exam opportunities for students
              </p>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search exams..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 items-center">
                <Button 
                  size="sm"
                  variant={viewMode === 'cards' ? "default" : "outline"}
                  onClick={() => setViewMode('cards')}
                  className="flex items-center gap-1"
                >
                  <Award className="h-4 w-4" />
                  Cards
                </Button>
                <Button 
                  size="sm"
                  variant={viewMode === 'table' ? "default" : "outline"}
                  onClick={() => setViewMode('table')}
                  className="flex items-center gap-1"
                >
                  <FileText className="h-4 w-4" />
                  Table
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    variant={selectedStream === null ? "default" : "outline"}
                    onClick={() => setSelectedStream(null)}
                  >
                    All ({examCounts['All']})
                  </Button>
                  {streamOptions.map(stream => (
                    <Button 
                      key={stream}
                      variant={selectedStream === stream ? "default" : "outline"}
                      onClick={() => setSelectedStream(stream)}
                    >
                      {stream} ({examCounts[stream]})
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="w-full md:w-auto">
                <EligibilityFilter 
                  selectedEligibility={selectedEligibility}
                  onEligibilityChange={setSelectedEligibility}
                />
              </div>
            </div>
          </section>
          
          {/* Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All Exams</TabsTrigger>
              <TabsTrigger value="stream-specific">Stream Specific</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : filteredExams.length === 0 ? (
                <div className="text-center py-12">
                  <Award className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                  <h3 className="mt-4 text-lg font-medium">No exams found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">
                      Found {filteredExams.length} government exams
                      {selectedStream ? ` for ${selectedStream}` : ''}
                      {selectedEligibility === 'Class 12' ? ' eligible for 12th pass students' : ''}
                      {filteredExams.length > itemsPerPage && ` (showing ${startIndex + 1}-${Math.min(endIndex, filteredExams.length)})`}
                    </h3>
                  </div>
                  
                  {viewMode === 'cards' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paginatedExams.map((exam) => (
                        <ExamCard 
                          key={exam.id} 
                          exam={exam} 
                          onExplore={() => handleExamClick(exam)}
                        />
                      ))}
                    </div>
                  ) : (
                    <ExamsTable 
                      exams={paginatedExams} 
                      onExamClick={handleExamClick} 
                    />
                  )}
                  
                  {/* Pagination controls */}
                  {filteredExams.length > itemsPerPage && (
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        
                        {generatePaginationLinks()}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              )}
            </TabsContent>
            
            <TabsContent value="stream-specific" className="space-y-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">General Exams ({generalExams.length})</h2>
                {isLoading ? (
                  <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : generalExams.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No general exams found</p>
                  </div>
                ) : (
                  viewMode === 'cards' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {generalExams.map((exam) => (
                        <ExamCard 
                          key={exam.id} 
                          exam={exam} 
                          onExplore={() => handleExamClick(exam)}
                        />
                      ))}
                    </div>
                  ) : (
                    <ExamsTable 
                      exams={generalExams} 
                      onExamClick={handleExamClick} 
                    />
                  )
                )}
              </div>
              
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Stream-Specific Exams ({streamSpecificExams.length})</h2>
                {isLoading ? (
                  <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : streamSpecificExams.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No stream-specific exams found</p>
                  </div>
                ) : (
                  viewMode === 'cards' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {streamSpecificExams.map((exam) => (
                        <ExamCard 
                          key={exam.id} 
                          exam={exam} 
                          onExplore={() => handleExamClick(exam)}
                        />
                      ))}
                    </div>
                  ) : (
                    <ExamsTable 
                      exams={streamSpecificExams} 
                      onExamClick={handleExamClick} 
                    />
                  )
                )}
              </div>
              
              {/* Pagination for tabbed content */}
              {filteredExams.length > itemsPerPage && (
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {generatePaginationLinks()}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Exam Details Modal */}
        <ExamDetailsModal
          exam={selectedExam}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </PageTransition>
    </MainLayout>
  );
};

interface ExamCardProps {
  exam: GovernmentExam;
  onExplore: () => void;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, onExplore }) => {
  // Check if the exam is eligible for 12th pass students
  const isClass12Exam = typeof exam.eligibility === 'string' ? 
    exam.eligibility.toLowerCase().includes('class 12') : 
    exam.eligibility.some(e => e.toLowerCase().includes('class 12'));
  
  return (
    <GlassCard 
      className="p-5 hover:shadow-lg transition-all scale-in-animation"
      variant="elevated"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-lg bg-purple-100">
            <Award className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex flex-wrap gap-1">
            {isClass12Exam && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                12th Pass
              </span>
            )}
            {exam.streams && exam.streams.length > 0 && exam.streams.map((stream) => (
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
          <h3 className="text-lg font-semibold">{exam.title}</h3>
          <p className="text-sm text-muted-foreground">
            {exam.description}
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Eligibility:</span>
          </div>
          <ul className="text-sm text-muted-foreground pl-6 space-y-1 list-disc">
            {typeof exam.eligibility === 'string' ? (
              <li>{exam.eligibility}</li>
            ) : (
              exam.eligibility.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            )}
          </ul>
        </div>
        
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Preparation: {exam.preparationTime}</span>
          </div>
          <Button size="sm" variant="outline" className="text-primary" onClick={onExplore}>
            <BookOpenCheck className="h-4 w-4 mr-1" />
            Explore
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};

interface ExamsTableProps {
  exams: GovernmentExam[];
  onExamClick: (exam: GovernmentExam) => void;
}

const ExamsTable: React.FC<ExamsTableProps> = ({ exams, onExamClick }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>Government Exams List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Exam Name</TableHead>
            <TableHead>Streams</TableHead>
            <TableHead>Eligibility</TableHead>
            <TableHead>Preparation Time</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.map((exam) => {
            // Check if the exam is eligible for 12th pass students
            const isClass12Exam = typeof exam.eligibility === 'string' ? 
              exam.eligibility.toLowerCase().includes('class 12') : 
              exam.eligibility.some(e => e.toLowerCase().includes('class 12'));
              
            return (
              <TableRow key={exam.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {exam.title}
                    {isClass12Exam && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        12th Pass
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {exam.streams.map(stream => (
                      <span key={stream} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                        {stream}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <span className="line-clamp-1">
                    {typeof exam.eligibility === 'string' ? exam.eligibility : exam.eligibility.join(', ')}
                  </span>
                </TableCell>
                <TableCell>{exam.preparationTime}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" onClick={() => onExamClick(exam)}>
                    <BookOpenCheck className="h-4 w-4" />
                    <span className="sr-only">Explore</span>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default GovernmentExams;
