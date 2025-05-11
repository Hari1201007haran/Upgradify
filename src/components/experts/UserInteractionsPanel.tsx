
import React from 'react';
import { format, parseISO } from 'date-fns';
import { useExpertInteractions } from '@/hooks/useExpertInteractions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { findExpertById } from '@/data/expertsData';

const UserInteractionsPanel = () => {
  const { consultations, messages, loading, error } = useExpertInteractions();

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            <p>{error}</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="consultations" className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="consultations">
          <Calendar className="mr-2 h-4 w-4" />
          Consultations
        </TabsTrigger>
        <TabsTrigger value="messages">
          <MessageSquare className="mr-2 h-4 w-4" />
          Messages
        </TabsTrigger>
      </TabsList>

      <TabsContent value="consultations" className="space-y-4">
        {consultations.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">You don't have any scheduled consultations yet.</p>
            </CardContent>
          </Card>
        ) : (
          consultations.map((consultation) => {
            const expert = findExpertById(consultation.expert_id);
            return (
              <Card key={consultation.id} className="mb-4">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{expert?.name || 'Expert'}</CardTitle>
                      <CardDescription>{expert?.expertise || 'Consultant'}</CardDescription>
                    </div>
                    <Badge 
                      variant={
                        consultation.status === 'completed' ? 'outline' : 
                        consultation.status === 'confirmed' ? 'default' : 
                        'secondary'
                      }
                    >
                      {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {format(parseISO(consultation.consultation_date), 'MMMM d, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{consultation.time_slot}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Scheduled on {format(parseISO(consultation.created_at), 'MMMM d, yyyy')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </TabsContent>

      <TabsContent value="messages" className="space-y-4">
        {messages.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">You haven't sent any messages to experts yet.</p>
            </CardContent>
          </Card>
        ) : (
          messages.map((message) => {
            const expert = findExpertById(message.expert_id);
            return (
              <Card key={message.id} className="mb-4">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{message.subject}</CardTitle>
                      <CardDescription>To: {expert?.name || 'Expert'}</CardDescription>
                    </div>
                    <Badge 
                      variant={message.status === 'read' ? 'outline' : 'secondary'}
                    >
                      {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{message.message}</p>
                  <div className="text-xs text-muted-foreground">
                    Sent on {format(parseISO(message.created_at), 'MMMM d, yyyy')}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </TabsContent>
    </Tabs>
  );
};

export default UserInteractionsPanel;
