
import React, { useState, useEffect } from 'react';
import { useData, NIRFRanking } from '@/contexts/DataContext';
import MainLayout from '@/components/layout/MainLayout';
import GlassCard from '@/components/ui/GlassCard';
import PageTransition from '@/components/layout/PageTransition';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Trophy, MapPin, School, ListOrdered, Filter } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const NIRFRankings = () => {
  const { nirfRankings, isLoading } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [categoryStats, setCategoryStats] = useState<{category: string, count: number}[]>([]);
  
  // Get all unique categories
  const categories = Array.from(new Set(nirfRankings.map(ranking => ranking.category))).sort();
  
  // Calculate top college per category
  const topCollegesByCategory = categories.reduce((acc, category) => {
    const collegesInCategory = nirfRankings.filter(r => r.category === category);
    if (collegesInCategory.length > 0) {
      // Sort by rank and get the first one
      const topCollege = collegesInCategory.sort((a, b) => a.rank - b.rank)[0];
      acc[category] = topCollege;
    }
    return acc;
  }, {} as Record<string, NIRFRanking>);
  
  // Count colleges per category
  useEffect(() => {
    const stats = categories.map(category => ({
      category,
      count: nirfRankings.filter(r => r.category === category).length
    }));
    setCategoryStats(stats.sort((a, b) => b.count - a.count));
    
    // If we have a lot of data, show a toast notification
    if (nirfRankings.length > 100) {
      toast.info(`Loaded ${nirfRankings.length} institutions across ${categories.length} categories`);
    }
  }, [nirfRankings, categories]);
  
  // Filter rankings based on search query and category selection
  const filteredRankings = nirfRankings.filter(ranking => {
    const matchesSearch = ranking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ranking.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ranking.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter ? ranking.category === categoryFilter : true;
    
    return matchesSearch && matchesCategory;
  });
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <PageTransition>
        <div className="space-y-8">
          <section className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">NIRF Rankings</h1>
              <p className="text-muted-foreground mt-1">
                Explore top ranked institutions in India according to National Institutional Ranking Framework
              </p>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search by institution name, category or location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="md:w-auto w-full flex items-center gap-2"
              >
                <Filter size={16} />
                <span>Filter Categories</span>
                <Badge variant="secondary" className="ml-2">
                  {categoryFilter || 'All'}
                </Badge>
              </Button>
            </div>
            
            {/* Category Filter Panel */}
            {showFilterMenu && (
              <div className="bg-background rounded-lg border p-4 shadow-sm animate-in fade-in duration-200">
                <h3 className="text-sm font-medium mb-3">Filter by Category</h3>
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    size="sm"
                    variant={categoryFilter === null ? "default" : "outline"}
                    onClick={() => setCategoryFilter(null)}
                    className="mb-2"
                  >
                    All Categories
                  </Button>
                  {categories.map(category => (
                    <Button 
                      key={category}
                      size="sm"
                      variant={categoryFilter === category ? "default" : "outline"}
                      onClick={() => setCategoryFilter(category)}
                      className="mb-2"
                    >
                      {category} <Badge variant="secondary" className="ml-1">{nirfRankings.filter(r => r.category === category).length}</Badge>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </section>
          
          {/* Category Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categoryFilter ? (
              <>
                {/* Show details about the selected category */}
                <GlassCard className="md:col-span-2 p-4 flex flex-col gap-2 scale-in-animation">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Top Institution in {categoryFilter}
                  </h2>
                  {topCollegesByCategory[categoryFilter] && (
                    <div className="flex flex-col p-4 bg-muted/50 rounded-lg">
                      <div className="text-xl font-medium">{topCollegesByCategory[categoryFilter].name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin size={14} />
                        <span>{topCollegesByCategory[categoryFilter].location}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Rank #{topCollegesByCategory[categoryFilter].rank}
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Score: {topCollegesByCategory[categoryFilter].score.toFixed(1)}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm">{topCollegesByCategory[categoryFilter].description}</p>
                    </div>
                  )}
                </GlassCard>
                
                <GlassCard className="p-4 flex items-center justify-between scale-in-animation">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Institutions in category</span>
                    <span className="text-3xl font-bold">{nirfRankings.filter(r => r.category === categoryFilter).length}</span>
                    <span className="text-xs text-muted-foreground mt-1">Displaying {filteredRankings.length} after filters</span>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-full">
                    <School className="h-8 w-8 text-primary" />
                  </div>
                </GlassCard>
              </>
            ) : (
              <>
                {/* Overview stats when no category is selected */}
                <GlassCard className="p-4 flex items-center gap-4 scale-in-animation">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Trophy className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Categories</p>
                    <p className="font-semibold">{categories.length}</p>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-4 flex items-center gap-4 scale-in-animation">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <School className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Institutions</p>
                    <p className="font-semibold">{nirfRankings.length}</p>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-4 flex items-center gap-4 scale-in-animation">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <ListOrdered className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Institutions Displayed</p>
                    <p className="font-semibold">{filteredRankings.length}</p>
                  </div>
                </GlassCard>
              </>
            )}
          </div>
          
          {/* Rankings Table */}
          <GlassCard className="overflow-hidden">
            <div className="p-4 border-b bg-muted/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div>
                <h2 className="text-lg font-semibold">
                  {categoryFilter ? `${categoryFilter} Rankings` : 'All Categories Rankings'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filteredRankings.length} institutions found
                </p>
              </div>
              
              {filteredRankings.length > 0 && !categoryFilter && (
                <div className="text-sm flex flex-wrap gap-2">
                  {categoryStats.slice(0, 5).map(stat => (
                    <Badge key={stat.category} variant="outline" className="cursor-pointer" onClick={() => setCategoryFilter(stat.category)}>
                      {stat.category}: {stat.count}
                    </Badge>
                  ))}
                  {categoryStats.length > 5 && (
                    <Badge variant="outline">+{categoryStats.length - 5} more</Badge>
                  )}
                </div>
              )}
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Institution Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">NIRF Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRankings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <School className="h-12 w-12 text-muted-foreground opacity-30" />
                        <h3 className="mt-4 text-lg font-medium">No institutions found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRankings
                    .sort((a, b) => a.rank - b.rank)
                    .map((ranking) => (
                      <TableRow key={ranking.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                            {ranking.rank}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{ranking.name}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {ranking.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                            {ranking.category}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{ranking.location}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {ranking.score.toFixed(1)}
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </GlassCard>
          
          {/* Additional Information */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex gap-3">
              <div className="p-2 bg-blue-100 rounded-full h-fit">
                <School className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-900">About NIRF Rankings</h3>
                <p className="text-sm text-blue-700 mt-1">
                  The National Institutional Ranking Framework (NIRF) was launched by the Ministry of Education, 
                  Government of India. It outlines a methodology to rank institutions across the country based on 
                  parameters like Teaching, Learning & Resources, Research & Professional Practice, Graduation 
                  Outcomes, Outreach & Inclusivity, and Perception.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default NIRFRankings;
