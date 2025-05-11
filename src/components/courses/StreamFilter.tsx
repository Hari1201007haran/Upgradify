
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookText } from 'lucide-react';

interface StreamFilterProps {
  streamOptions: string[];
  selectedStream: string | null;
  setSelectedStream: (stream: string | null) => void;
  courseCounts: Record<string, number>;
}

const StreamFilter: React.FC<StreamFilterProps> = ({ 
  streamOptions, 
  selectedStream, 
  setSelectedStream,
  courseCounts
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <BookText className="h-5 w-5" />
        Course Streams
      </h2>
      <div className="flex gap-2 flex-wrap">
        <Button 
          variant={selectedStream === null ? "default" : "outline"}
          onClick={() => setSelectedStream(null)}
          className="flex gap-2 items-center"
        >
          <span>All</span>
          <span className="bg-primary-foreground text-primary rounded-full px-2 py-0.5 text-xs">
            {courseCounts['All']}
          </span>
        </Button>
        {streamOptions.map(stream => (
          <Button 
            key={stream}
            variant={selectedStream === stream ? "default" : "outline"}
            onClick={() => setSelectedStream(stream)}
            className="flex gap-2 items-center"
          >
            <span>{stream}</span>
            <span className="bg-primary-foreground text-primary rounded-full px-2 py-0.5 text-xs">
              {courseCounts[stream]}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StreamFilter;
