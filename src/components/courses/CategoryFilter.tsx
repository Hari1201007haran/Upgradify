
import React from 'react';
import { Button } from '@/components/ui/button';
import { LibraryBig } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  collegeCounts: Record<string, number>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory,
  collegeCounts
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <LibraryBig className="h-5 w-5" />
        Institution Categories
      </h2>
      <div className="flex gap-2 flex-wrap">
        <Button 
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className="flex gap-2 items-center"
        >
          <span>All</span>
          <span className="bg-primary-foreground text-primary rounded-full px-2 py-0.5 text-xs">
            {collegeCounts['All']}
          </span>
        </Button>
        {categories.map(category => (
          <Button 
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="flex gap-2 items-center"
          >
            <span>{category}</span>
            <span className="bg-primary-foreground text-primary rounded-full px-2 py-0.5 text-xs">
              {collegeCounts[category] || 0}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
