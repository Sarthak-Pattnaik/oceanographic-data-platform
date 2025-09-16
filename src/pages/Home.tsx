import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, 
  Calculator, 
  Microscope, 
  Languages, 
  BookOpen,
  Laptop,
  Smartphone,
  Tablet,
  Globe,
  Zap,
  Target,
  Users,
  Play,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";

import HeroSection from "../components/landing/HeroSection";
import FloatingIcons from "../components/landing/FloatingIcons";
import StudentsSection from "../components/landing/StudentsSection";
import TaglineSection from "../components/landing/TaglineSection";
import FeaturesSection from "../components/landing/FeaturesSection";

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              EduTech
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <HeroSection />
          <FloatingIcons />
          <StudentsSection />
          <TaglineSection />
          <FeaturesSection />
        </>
      )}
    </div>
  );
  
}