
import React from 'react';
import { Search, BookOpen, BookText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'cards' | 'table';
  setViewMode: (mode: 'cards' | 'table') => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search courses or colleges..."
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
          <BookOpen className="h-4 w-4" />
          Cards
        </Button>
        <Button 
          size="sm"
          variant={viewMode === 'table' ? "default" : "outline"}
          onClick={() => setViewMode('table')}
          className="flex items-center gap-1"
        >
          <BookText className="h-4 w-4" />
          Table
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
