
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface ExpertConsultation {
  id: string;
  expert_id: string;
  consultation_date: string;
  time_slot: string;
  status: string;
  created_at: string;
}

interface ExpertMessage {
  id: string;
  expert_id: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export function useExpertInteractions() {
  const { user } = useAuth();
  const [consultations, setConsultations] = useState<ExpertConsultation[]>([]);
  const [messages, setMessages] = useState<ExpertMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserInteractions() {
      if (!user) {
        setConsultations([]);
        setMessages([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        // Fetch consultations
        const { data: consultationsData, error: consultationsError } = await supabase
          .from('expert_consultations')
          .select('*')
          .eq('user_id', user.id)
          .order('consultation_date', { ascending: false });
          
        if (consultationsError) throw consultationsError;
        
        // Fetch messages
        const { data: messagesData, error: messagesError } = await supabase
          .from('expert_messages')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (messagesError) throw messagesError;
        
        setConsultations(consultationsData || []);
        setMessages(messagesData || []);
      } catch (err: any) {
        console.error('Error fetching expert interactions:', err);
        setError(err.message || 'Failed to load your interactions with experts');
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserInteractions();
  }, [user]);

  return { consultations, messages, loading, error };
}
