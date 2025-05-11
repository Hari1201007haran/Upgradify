
import React, { useState } from 'react';
import { School } from 'lucide-react';
import { College } from '@/contexts/DataContext';
import CollegeCard from './CollegeCard';
import CollegesTable from './CollegesTable';
import CategoryFilter from './CategoryFilter';

interface CollegesContentProps {
  isLoading: boolean;
  filteredColleges: College[];
  viewMode: 'cards' | 'table';
}

const CollegesContent: React.FC<CollegesContentProps> = ({ 
  isLoading, 
  filteredColleges, 
  viewMode 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all available categories
  const allCategories = Array.from(
    new Set(filteredColleges.map(college => college.category || 'General'))
  );

  // Count colleges per category
  const collegeCounts = filteredColleges.reduce((acc, college) => {
    const category = college.category || 'General';
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, { 'All': filteredColleges.length } as Record<string, number>);

  // Apply category filter
  const displayedColleges = selectedCategory 
    ? filteredColleges.filter(college => (college.category || 'General') === selectedCategory)
    : filteredColleges;

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (filteredColleges.length === 0) {
    return (
      <div className="text-center py-12">
        <School className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
        <h3 className="mt-4 text-lg font-medium">No colleges found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search
        </p>
      </div>
    );
  }
  
  return (
    <>
      <CategoryFilter 
        categories={allCategories} 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        collegeCounts={collegeCounts}
      />

      <div className="flex justify-between items-center mt-6">
        <h3 className="text-lg font-medium">
          Found {displayedColleges.length} colleges
          {selectedCategory ? ` in ${selectedCategory}` : ''}
        </h3>
      </div>
      
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {displayedColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      ) : (
        <CollegesTable colleges={displayedColleges} />
      )}
    </>
  );
};

export default CollegesContent;
