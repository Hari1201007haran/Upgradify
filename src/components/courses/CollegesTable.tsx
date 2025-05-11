
import React from 'react';
import { College } from '@/contexts/DataContext';
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CollegesTableProps {
  colleges: College[];
}

const CollegesTable: React.FC<CollegesTableProps> = ({ colleges }) => {
  // Group colleges by category for better organization
  const collegesByCategory = colleges.reduce((acc, college) => {
    // Use a default category if none is found
    const category = college.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(college);
    return acc;
  }, {} as Record<string, College[]>);

  // Get unique categories
  const categories = Object.keys(collegesByCategory);

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>Top Colleges in India</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Ranking</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {colleges.map((college) => (
            <TableRow key={college.id} className="hover:bg-muted/50 cursor-pointer">
              <TableCell className="font-medium">{college.name}</TableCell>
              <TableCell>{college.location}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-xs">
                  {college.category || 'General'}
                </Badge>
              </TableCell>
              <TableCell>#{college.ranking}</TableCell>
              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                <span className="line-clamp-1">{college.description}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CollegesTable;
