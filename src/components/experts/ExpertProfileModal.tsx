
import React, { useState } from 'react';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, 
  BriefcaseBusiness, 
  GraduationCap, 
  UserPlus, 
  Globe, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  Award,
  Calendar,
  MessageCircle
} from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

export interface ExpertDetails {
  id: string;
  name: string;
  expertise: string;
  experience: string;
  bio: string;
  education: string[];
  publications: string[];
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  avatarUrl?: string;
  type: 'academic' | 'career' | 'personal';
}

interface ExpertProfileModalProps {
  expert: ExpertDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExpertProfileModal: React.FC<ExpertProfileModalProps> = ({ expert, open, onOpenChange }) => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [messageSubject, setMessageSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];
  
  if (!expert) return null;
  
  const getExpertIcon = (type: string) => {
    switch(type) {
      case 'academic':
        return <BookOpen className="h-5 w-5" />;
      case 'career':
        return <BriefcaseBusiness className="h-5 w-5" />;
      case 'personal':
        return <UserPlus className="h-5 w-5" />;
      default:
        return <GraduationCap className="h-5 w-5" />;
    }
  };
  
  const handleScheduleConsultation = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to schedule a consultation",
        variant: "destructive"
      });
      return;
    }

    if (!selectedDate || !selectedTimeSlot) {
      toast({
        title: "Incomplete selection",
        description: "Please select both a date and time slot",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('expert_consultations')
        .insert({
          user_id: user.id,
          expert_id: expert.id,
          consultation_date: format(selectedDate, 'yyyy-MM-dd'),
          time_slot: selectedTimeSlot,
        });
      
      if (error) throw error;
      
      toast({
        title: "Consultation Scheduled",
        description: `Your consultation with ${expert.name} is scheduled for ${format(selectedDate, 'MMMM do, yyyy')} at ${selectedTimeSlot}.`,
      });
      
      // Reset selections
      setSelectedDate(undefined);
      setSelectedTimeSlot(null);
    } catch (error: any) {
      console.error("Error scheduling consultation:", error);
      toast({
        title: "Scheduling Failed",
        description: error.message || "Failed to schedule consultation. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSendMessage = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to send a message",
        variant: "destructive"
      });
      return;
    }

    if (!messageSubject.trim() || !messageContent.trim()) {
      toast({
        title: "Incomplete message",
        description: "Please provide both a subject and message content",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('expert_messages')
        .insert({
          user_id: user.id,
          expert_id: expert.id,
          subject: messageSubject,
          message: messageContent,
        });
      
      if (error) throw error;
      
      toast({
        title: "Message Sent",
        description: `Your message has been sent to ${expert.name}.`,
      });
      
      // Reset form
      setMessageSubject('');
      setMessageContent('');
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Message Failed",
        description: error.message || "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Expert Profile</DialogTitle>
          <DialogDescription>
            Learn more about our expert advisor
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center text-center py-4">
          <Avatar className="h-24 w-24 mb-4">
            {expert.avatarUrl ? (
              <AvatarImage src={expert.avatarUrl} />
            ) : (
              <AvatarFallback className="bg-primary/10">
                {expert.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            )}
          </Avatar>
          
          <div className="p-2 rounded-full bg-primary/10 mb-2">
            {getExpertIcon(expert.type)}
          </div>
          
          <h2 className="text-xl font-bold">{expert.name}</h2>
          <p className="text-muted-foreground">{expert.expertise}</p>
          <div className="flex items-center gap-1 mt-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{expert.experience}</span>
          </div>
        </div>
        
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="message">Message</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">About</h3>
              <p className="text-sm text-muted-foreground">{expert.bio}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Education</h3>
              <ul className="space-y-1">
                {expert.education.map((edu, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <GraduationCap className="h-4 w-4 mt-0.5 text-primary" />
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Publications</h3>
              <ul className="space-y-1">
                {expert.publications.map((pub, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <Award className="h-4 w-4 mt-0.5 text-primary" />
                    <span>{pub}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Contact Information</h3>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{expert.contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{expert.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{expert.contact.location}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-4">
            <div className="flex flex-col items-center">
              <div className="mb-4 text-center">
                <h3 className="font-medium">Schedule a Consultation</h3>
                <p className="text-sm text-muted-foreground">Select a date and time slot to meet with {expert.name}</p>
              </div>
              
              <div className="w-full flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="border rounded-md">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => {
                        // Disable past dates, weekends, and dates more than 30 days in the future
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const thirtyDaysLater = new Date();
                        thirtyDaysLater.setDate(today.getDate() + 30);
                        
                        return (
                          date < today ||
                          date > thirtyDaysLater ||
                          date.getDay() === 0 ||
                          date.getDay() === 6
                        );
                      }}
                      className="rounded-md border-none"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-2">Available Time Slots</h4>
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTimeSlot === time ? "default" : "outline"}
                            size="sm"
                            className="justify-center"
                            onClick={() => setSelectedTimeSlot(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-sm text-muted-foreground">
                        Please select a date first
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <Button 
                className="mt-4"
                onClick={handleScheduleConsultation}
                disabled={!selectedDate || !selectedTimeSlot || isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                    Scheduling...
                  </span>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Consultation
                  </>
                )}
              </Button>
              
              {!isAuthenticated && (
                <p className="mt-2 text-sm text-muted-foreground">
                  You need to be logged in to schedule a consultation
                </p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="message" className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Send a Message</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Have a quick question for {expert.name}? Send a direct message.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="subject" className="text-sm font-medium block mb-1">
                    Subject
                  </label>
                  <Input 
                    id="subject"
                    placeholder="Enter message subject"
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="text-sm font-medium block mb-1">
                    Message
                  </label>
                  <Textarea 
                    id="message"
                    placeholder="Type your message here..."
                    className="min-h-[120px]"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                  />
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handleSendMessage}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
                
                {!isAuthenticated && (
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    You need to be logged in to send messages
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          {activeTab === 'profile' && (
            <Button onClick={() => setActiveTab('schedule')}>Schedule Consultation</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExpertProfileModal;
