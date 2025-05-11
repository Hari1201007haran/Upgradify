
import { ExpertDetails } from '@/components/experts/ExpertProfileModal';

export const experts: ExpertDetails[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    expertise: "Cognitive Learning Specialist",
    experience: "15+ years",
    bio: "Dr. Sarah Johnson is a renowned cognitive learning specialist with over 15 years of experience in educational psychology. Her research focuses on memory formation and retention strategies that help students maximize their learning potential. She has worked with numerous educational institutions to develop effective learning methodologies.",
    education: [
      "Ph.D. in Educational Psychology, Stanford University",
      "M.A. in Cognitive Science, Harvard University",
      "B.A. in Psychology, Yale University"
    ],
    publications: [
      "The Science of Effective Learning: New Perspectives (2023)",
      "Memory Retention in Academic Settings: A Comprehensive Study (2021)",
      "Active Recall: The Ultimate Learning Strategy (2019)"
    ],
    contact: {
      email: "sarah.johnson@example.edu",
      phone: "(555) 123-4567",
      location: "San Francisco, CA"
    },
    type: "academic"
  },
  {
    id: "2",
    name: "Robert Williams",
    expertise: "Career Counselor",
    experience: "10+ years",
    bio: "Robert Williams is a certified career counselor specializing in helping students and young professionals navigate their career paths. With a background in human resources and talent acquisition, Robert brings insider knowledge from the corporate world to help students prepare for successful careers.",
    education: [
      "MBA, Business Administration, Northwestern University",
      "B.S. in Human Resources, University of Michigan",
      "Certified Career Development Professional (CCDP)"
    ],
    publications: [
      "Landing Your Dream Job: Strategic Approaches for New Graduates (2022)",
      "Networking in the Digital Age: Building Meaningful Professional Connections (2020)",
      "The Modern Resume: Standing Out in a Competitive Job Market (2018)"
    ],
    contact: {
      email: "robert.williams@example.com",
      phone: "(555) 987-6543",
      location: "Chicago, IL"
    },
    type: "career"
  },
  {
    id: "3",
    name: "Dr. Emma Thompson",
    expertise: "Clinical Psychologist",
    experience: "12+ years",
    bio: "Dr. Emma Thompson is a licensed clinical psychologist specializing in young adult mental health and wellness. She has extensive experience in stress management, anxiety reduction, and building resilience in academic settings. Her holistic approach combines evidence-based practices with practical strategies for thriving in high-pressure environments.",
    education: [
      "Psy.D. in Clinical Psychology, Columbia University",
      "M.S. in Counseling Psychology, Boston University",
      "B.A. in Psychology, UCLA"
    ],
    publications: [
      "Managing Academic Stress: A Guide for Modern Students (2023)",
      "The Psychology of Resilience: Thriving Under Pressure (2021)",
      "Mindfulness Practices for Academic Success (2019)"
    ],
    contact: {
      email: "emma.thompson@example.org",
      phone: "(555) 456-7890",
      location: "Boston, MA"
    },
    type: "personal"
  }
];

export const findExpertById = (id: string): ExpertDetails | undefined => {
  return experts.find(expert => expert.id === id);
};
