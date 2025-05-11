
import React from 'react';
import { GovernmentExam } from '@/contexts/DataContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Award, Clock, Users, CalendarClock, BookOpen, GraduationCap, Building, FileText } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

interface ExamDetailsModalProps {
  exam: GovernmentExam | null;
  isOpen: boolean;
  onClose: () => void;
}

const ExamDetailsModal: React.FC<ExamDetailsModalProps> = ({
  exam,
  isOpen,
  onClose
}) => {
  if (!exam) return null;

  // Check if the exam is eligible for 12th pass students
  const isClass12Exam = typeof exam.eligibility === 'string' ? 
    exam.eligibility.toLowerCase().includes('class 12') : 
    exam.eligibility.some(e => e.toLowerCase().includes('class 12'));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Award className="h-6 w-6 text-purple-600" />
            {exam.title}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {exam.streams.map((stream) => (
              <Badge key={stream} variant="secondary">{stream}</Badge>
            ))}
            {isClass12Exam && (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                12th Pass Eligible
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <DialogDescription className="text-base text-foreground">
            {exam.description}
          </DialogDescription>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              Eligibility Criteria
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              {typeof exam.eligibility === 'string' ? (
                <p>{exam.eligibility}</p>
              ) : (
                <ul className="list-disc pl-5 space-y-1">
                  {exam.eligibility.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              Preparation Time & Strategy
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="mb-3"><strong>Recommended Duration:</strong> {exam.preparationTime}</p>
              <p className="font-medium mb-2">Preparation Strategy:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Start with understanding the complete exam syllabus and pattern</li>
                <li>Create a structured study plan with dedicated time for each subject</li>
                <li>Focus on high-weightage topics first</li>
                <li>Practice with previous years' question papers regularly</li>
                <li>Take mock tests to improve time management</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              Recommended Study Resources
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-2">Books & Materials</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Standard reference books for each subject</li>
                    <li>Previous years' question papers</li>
                    <li>Subject-specific guides and question banks</li>
                    <li>Quick revision notes and memory aids</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Online Resources</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Official exam website for updates</li>
                    <li>Online practice tests and quizzes</li>
                    <li>Video tutorials for complex topics</li>
                    <li>Exam discussion forums</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
              Career Opportunities After Passing
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <ul className="list-disc pl-5 space-y-1">
                <li>Government jobs with stability and benefits</li>
                <li>Opportunities for career advancement through promotions</li>
                <li>Specialized roles based on your qualifications</li>
                <li>Options for further education and specialization</li>
                <li>Respected positions in public service</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              Coaching and Preparation Institutes
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="mb-2">Many students opt for coaching to enhance their preparation:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Classroom coaching provides structure and peer learning</li>
                <li>Online coaching offers flexibility and accessibility</li>
                <li>Self-study with the right materials can also be effective</li>
                <li>Consider your learning style before choosing a preparation method</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-muted-foreground" />
              Exam Schedule & Pattern
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="mb-2">Most government exams follow a structured pattern:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Preliminary examination (objective type)</li>
                <li>Main examination (detailed written test)</li>
                <li>Interview/Personality test (for some exams)</li>
                <li>Physical fitness test (for some service exams)</li>
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                Check the official website for the latest notification, application dates, and examination schedule.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              Exam Tips & Success Strategies
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Time Management:</strong> Allocate study time based on topic weightage</li>
                <li><strong>Regular Revision:</strong> Schedule frequent revision of covered topics</li>
                <li><strong>Mock Tests:</strong> Take full-length tests under timed conditions</li>
                <li><strong>Group Study:</strong> Form study groups for difficult subjects</li>
                <li><strong>Health:</strong> Maintain good physical and mental health throughout preparation</li>
                <li><strong>Stay Updated:</strong> Keep track of current affairs and exam pattern changes</li>
                <li><strong>Analyze Mistakes:</strong> Learn from errors in practice tests</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExamDetailsModal;
