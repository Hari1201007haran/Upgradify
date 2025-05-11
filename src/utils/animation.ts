/**
 * Animation utility functions for smooth transitions
 */

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

export const slideDownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

export const slideRightVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

export const slideLeftVariants = {
  hidden: { opacity: 0, x: 10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

// Staggered animations for lists
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerFastContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const staggerSlowContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Page transition
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

// Card hover animations
export const cardHoverVariants = {
  initial: { scale: 1, y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" },
  hover: { 
    scale: 1.02, 
    y: -5, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

// Notification bell animation
export const bellRingVariants = {
  initial: { rotate: 0 },
  ring: { 
    rotate: [0, 15, -15, 10, -10, 5, -5, 0], 
    transition: { duration: 0.6, ease: "easeInOut" } 
  }
};

// Button press animation
export const buttonTapVariants = {
  tap: { scale: 0.95 }
};

// Background pulse animation
export const pulsateVariants = {
  initial: { opacity: 0.7 },
  pulsate: { 
    opacity: [0.7, 0.9, 0.7], 
    transition: { duration: 2, ease: "easeInOut", repeat: Infinity } 
  }
};

// Rotating spinner
export const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: { 
      duration: 1, 
      ease: "linear", 
      repeat: Infinity
    }
  }
};