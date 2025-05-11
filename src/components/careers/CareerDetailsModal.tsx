
import React from 'react';
import { Career } from '@/contexts/DataContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Briefcase, 
  GraduationCap, 
  BadgeCheck, 
  TrendingUp, 
  BookOpen, 
  Building,
  BriefcaseBusiness
} from 'lucide-react';

interface CareerDetailsModalProps {
  career: Career | null;
  isOpen: boolean;
  onClose: () => void;
}

const CareerDetailsModal: React.FC<CareerDetailsModalProps> = ({
  career,
  isOpen,
  onClose
}) => {
  if (!career) return null;

  // Determine job outlook styling
  const getJobOutlookColor = (outlook: string) => {
    switch (outlook) {
      case 'Excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'Good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Moderate': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-600" />
            {career.title}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {career.streams.map((stream) => (
              <Badge key={stream} variant="secondary">{stream}</Badge>
            ))}
            <Badge variant="outline" className={getJobOutlookColor(career.jobOutlook)}>
              {career.jobOutlook} Outlook
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <DialogDescription className="text-base text-foreground">
            {career.description}
          </DialogDescription>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
              Educational Requirements
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <ul className="list-disc pl-5 space-y-1">
                {career.education.map((edu, index) => (
                  <li key={index}>{edu}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-muted-foreground" />
              Required Skills
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <ul className="list-disc pl-5 space-y-1">
                {career.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              Job Outlook & Salary
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="mb-3"><strong>Job Outlook:</strong> {career.jobOutlook}</p>
              <p><strong>Expected Salary Range:</strong> {career.salary}</p>
              
              <h4 className="font-medium mt-4 mb-2">Growth Opportunities</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Early Career: Entry-level positions focusing on fundamental skills and learning industry processes</li>
                <li>Mid-Career: Specialized roles with increased responsibilities and team management</li>
                <li>Senior Level: Leadership positions, strategic planning, and organizational direction</li>
                <li>Consulting or Entrepreneurship: Opportunities for independent work or starting your own business</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              Recommended Preparation
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Courses & Certifications</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Formal degree programs in relevant fields</li>
                    <li>Industry-recognized certifications</li>
                    <li>Specialized training programs</li>
                    <li>Online courses for specific skill development</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Practical Experience</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Internships in related organizations</li>
                    <li>Volunteer work to build relevant skills</li>
                    <li>Personal projects demonstrating capabilities</li>
                    <li>Participation in industry events and competitions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              Work Environment
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="mb-3">Professionals in this field typically work in:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Corporate offices and business settings</li>
                <li>Research and development facilities</li>
                <li>Field locations or client sites</li>
                <li>Remote or hybrid work arrangements (industry dependent)</li>
              </ul>
              
              <h4 className="font-medium mt-4 mb-2">Work-Life Balance</h4>
              <p>
                Work-life balance varies by employer and specific role. Some positions may require occasional overtime during 
                high-demand periods or projects, while others maintain more predictable schedules. Many organizations now offer 
                flexible working arrangements to accommodate diverse needs.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <BriefcaseBusiness className="h-5 w-5 text-muted-foreground" />
              Industry Connections & Networking
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="mb-3">Building a professional network is crucial for career advancement:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Join relevant professional associations and industry groups</li>
                <li>Attend conferences, workshops, and networking events</li>
                <li>Participate in online forums and social media groups in your field</li>
                <li>Find a mentor who can provide guidance and industry insights</li>
                <li>Stay connected with colleagues, classmates, and alumni</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-muted-foreground" />
              Success Tips
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Continuous Learning:</strong> Keep updating your skills and knowledge as industry trends evolve</li>
                <li><strong>Soft Skills:</strong> Develop communication, teamwork, and leadership abilities</li>
                <li><strong>Industry Awareness:</strong> Stay informed about current developments and future trends</li>
                <li><strong>Portfolio Development:</strong> Document your projects and achievements</li>
                <li><strong>Personal Brand:</strong> Cultivate a professional online presence and reputation</li>
                <li><strong>Adaptability:</strong> Be open to change and ready to pivot when necessary</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CareerDetailsModal;
