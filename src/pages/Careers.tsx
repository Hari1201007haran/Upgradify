
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useData, Career } from '@/contexts/DataContext';
import MainLayout from '@/components/layout/MainLayout';
import GlassCard from '@/components/ui/GlassCard';
import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  ArrowRight,
  BadgeCheck,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CareerDetailsModal from '@/components/careers/CareerDetailsModal';

interface CareerCardProps {
  career: Career;
  onClick: () => void;
}

const CareerCard: React.FC<CareerCardProps> = ({ career, onClick }) => {
  return (
    <GlassCard 
      className="p-5 hover:shadow-lg transition-all cursor-pointer scale-in-animation"
      variant="elevated"
      onClick={onClick}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-lg bg-indigo-100">
            <Briefcase className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="flex flex-wrap gap-1">
            {career.streams.map((stream) => (
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
          <h3 className="text-lg font-semibold">{career.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {career.description}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex gap-1 flex-wrap">
            {career.interests.slice(0, 3).map((interest, index) => (
              <span 
                key={index} 
                className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm text-muted-foreground">
                {career.education[0]}
              </span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              career.jobOutlook === 'Excellent' 
                ? 'bg-green-50 text-green-600' 
                : career.jobOutlook === 'Good'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-amber-50 text-amber-600'
            }`}>
              {career.jobOutlook}
            </span>
          </div>
        </div>
        
        <div className="pt-2 flex justify-between items-center border-t">
          <div className="text-sm font-medium">
            {career.salary}
          </div>
          <Button size="sm" variant="ghost" className="text-primary p-0">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};

interface OutlookCardProps {
  title: string;
  careers: Career[];
  color: 'green' | 'blue' | 'amber';
  onCareerClick: (career: Career) => void;
}

const OutlookCard: React.FC<OutlookCardProps> = ({ title, careers, color, onCareerClick }) => {
  const colorClasses = {
    green: 'bg-green-50 text-green-800 border-green-200',
    blue: 'bg-blue-50 text-blue-800 border-blue-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
  };
  
  return (
    <div className={`rounded-lg p-4 border ${colorClasses[color]}`}>
      <h3 className="font-medium mb-3">{title}</h3>
      <ul className="space-y-2">
        {careers.slice(0, 4).map((career) => (
          <li key={career.id} className="flex items-center gap-2 hover:bg-gray-50 rounded p-1 cursor-pointer" onClick={() => onCareerClick(career)}>
            <Briefcase className="h-4 w-4" />
            <span className="text-sm">{career.title}</span>
          </li>
        ))}
        {careers.length > 4 && (
          <li className="text-sm italic">+ {careers.length - 4} more</li>
        )}
      </ul>
    </div>
  );
};

const Careers = () => {
  const { user } = useAuth();
  const { careers } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState<string | null>(user?.stream || null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      career.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStream = selectedStream ? career.streams.includes(selectedStream) : true;
    
    return matchesSearch && matchesStream;
  });
  
  // Group careers by job outlook for the career outlook section
  const careersByOutlook = {
    Excellent: careers.filter(career => career.jobOutlook === 'Excellent'),
    Good: careers.filter(career => career.jobOutlook === 'Good'),
    Moderate: careers.filter(career => career.jobOutlook === 'Moderate'),
  };
  
  // Available streams for filter buttons
  const streamOptions = ['Computer Science', 'Biology', 'Commerce', 'Arts', 'Science', 'Law'];
  
  const handleCareerClick = (career: Career) => {
    setSelectedCareer(career);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <MainLayout>
      <PageTransition>
        <div className="space-y-8">
          <section className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">Career Opportunities</h1>
              <p className="text-muted-foreground mt-1">
                Explore various career paths based on your interests and educational background
              </p>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search careers..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant={selectedStream === null ? "default" : "outline"}
                  onClick={() => setSelectedStream(null)}
                >
                  All Streams
                </Button>
                {streamOptions.map(stream => (
                  <Button 
                    key={stream}
                    variant={selectedStream === stream ? "default" : "outline"}
                    onClick={() => setSelectedStream(stream)}
                  >
                    {stream}
                  </Button>
                ))}
              </div>
            </div>
          </section>
          
          {/* Career List */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Available Career Paths</h2>
            
            {filteredCareers.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                <h3 className="mt-4 text-lg font-medium">No careers found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCareers.map((career) => (
                  <CareerCard 
                    key={career.id} 
                    career={career} 
                    onClick={() => handleCareerClick(career)}
                  />
                ))}
              </div>
            )}
          </section>
          
          {/* Career Outlook Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Career Outlook
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <OutlookCard 
                title="Excellent Outlook" 
                careers={careersByOutlook.Excellent} 
                color="green"
                onCareerClick={handleCareerClick}
              />
              <OutlookCard 
                title="Good Outlook" 
                careers={careersByOutlook.Good} 
                color="blue"
                onCareerClick={handleCareerClick}
              />
              <OutlookCard 
                title="Moderate Outlook" 
                careers={careersByOutlook.Moderate} 
                color="amber"
                onCareerClick={handleCareerClick}
              />
            </div>
          </section>
          
          {/* Career Tips */}
          <section>
            <GlassCard className="p-6 bg-gradient-to-r from-primary/5 to-indigo-500/5 border-none">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="p-4 bg-primary/10 rounded-full h-fit">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Career Development Tips</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Research thoroughly before choosing a career path</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Develop relevant skills through courses and certifications</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Gain practical experience through internships</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Build a professional network in your field of interest</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Button asChild>
                      <Link to="/expert-tips">View Expert Tips</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </section>
          
          {/* Career Details Modal */}
          <CareerDetailsModal
            career={selectedCareer}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Careers;
