"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset animation state on route change
    setIsVisible(false);

    // Start animation after a tiny delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []); // Removed unnecessary pathname dependency

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { usePathname } from "next/navigation";

// interface PageTransitionProps {
//   children: React.ReactNode;
// }

// export default function PageTransition({ children }: PageTransitionProps) {
//   const pathname = usePathname();

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={pathname}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{
//           duration: 0.25,
//           ease: [0.22, 1, 0.36, 1],
//         }}
//         className="w-full"
//       >
//         {children}
//       </motion.div>
//     </AnimatePresence>
//   );
// }
