import React from "react";
import { motion } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Laptop Opening Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="relative mx-auto w-80 h-60 md:w-96 md:h-72">
            {/* Laptop Base */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: -15 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full shadow-lg"
            />
            
            {/* Laptop Screen */}
            <motion.div
              initial={{ rotateX: -90, transformOrigin: "bottom" }}
              animate={{ rotateX: -15, transformOrigin: "bottom" }}
              transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-72 md:w-80 h-48 md:h-56 bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-lg shadow-2xl"
            >
              {/* Screen Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute inset-2 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-lg p-6 overflow-hidden"
              >
                {/* Digital Pages/Screens Effect */}
                <motion.div
                  animate={{ 
                    x: [-10, 10, -10],
                    y: [-5, 5, -5],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-blue-100/30 rounded backdrop-blur-sm"
                >
                  <div className="p-4 space-y-2">
                    <div className="w-3/4 h-3 bg-white/40 rounded"></div>
                    <div className="w-1/2 h-2 bg-white/30 rounded"></div>
                    <div className="w-2/3 h-2 bg-white/30 rounded"></div>
                    <div className="w-full h-8 bg-white/20 rounded mt-4"></div>
                  </div>
                </motion.div>

                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent leading-tight"
        >
          Transform Your
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Learning Journey
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Experience the future of education with our revolutionary platform that adapts to your unique learning style
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Start Learning Now
          </Button>
          <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-full flex items-center gap-2 transition-all duration-300">
            <Play className="w-5 h-5" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8 text-blue-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}