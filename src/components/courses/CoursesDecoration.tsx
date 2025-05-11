import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Clock, Star } from 'lucide-react';

interface CoursesDecorationProps {
  className?: string;
}

const CoursesDecoration: React.FC<CoursesDecorationProps> = ({ className }) => {
  return (
    <div className={`relative h-[200px] ${className || ''}`}>
      {/* Floating book */}
      <motion.div 
        className="absolute top-10 left-10"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
          <BookOpen className="w-8 h-8 text-blue-600" />
        </div>
      </motion.div>
      
      {/* Floating graduation cap */}
      <motion.div 
        className="absolute top-5 right-16"
        animate={{ 
          y: [0, -12, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full">
          <GraduationCap className="w-7 h-7 text-indigo-600" />
        </div>
      </motion.div>
      
      {/* Floating clock */}
      <motion.div 
        className="absolute bottom-10 left-16"
        animate={{ 
          y: [0, -8, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
          <Clock className="w-6 h-6 text-purple-600" />
        </div>
      </motion.div>
      
      {/* Floating star */}
      <motion.div 
        className="absolute bottom-8 right-12"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-full">
          <Star className="w-5 h-5 text-yellow-600" />
        </div>
      </motion.div>
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M85 65 L180 60" 
          stroke="rgba(99, 102, 241, 0.2)" 
          strokeWidth="2"
          strokeDasharray="5,5"
          animate={{
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.path 
          d="M85 110 L170 140" 
          stroke="rgba(99, 102, 241, 0.2)" 
          strokeWidth="2"
          strokeDasharray="5,5"
          animate={{
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.path 
          d="M170 140 L210 100" 
          stroke="rgba(99, 102, 241, 0.2)" 
          strokeWidth="2"
          strokeDasharray="5,5"
          animate={{
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </svg>
    </div>
  );
};

export default CoursesDecoration;
