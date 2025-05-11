
import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/utils/animation';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div 
      className="page-transition w-full"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
