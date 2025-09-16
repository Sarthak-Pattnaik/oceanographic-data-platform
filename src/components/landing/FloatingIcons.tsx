import React from "react";
import { motion } from "framer-motion";
import { 
  Code, 
  Calculator, 
  Microscope, 
  Languages, 
  BookOpen,
  Globe,
  Zap,
  Target,
  Users
} from "lucide-react";

export default function FloatingIcons() {
  const icons = [
    { Icon: Code, color: "from-green-400 to-green-600", delay: 0 },
    { Icon: Calculator, color: "from-orange-400 to-orange-600", delay: 0.2 },
    { Icon: Microscope, color: "from-purple-400 to-purple-600", delay: 0.4 },
    { Icon: Languages, color: "from-pink-400 to-pink-600", delay: 0.6 },
    { Icon: BookOpen, color: "from-blue-400 to-blue-600", delay: 0.8 },
    { Icon: Globe, color: "from-teal-400 to-teal-600", delay: 1.0 },
    { Icon: Zap, color: "from-yellow-400 to-yellow-600", delay: 1.2 },
    { Icon: Target, color: "from-red-400 to-red-600", delay: 1.4 },
    { Icon: Users, color: "from-indigo-400 to-indigo-600", delay: 1.6 }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-6">
            Explore Every Subject
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From coding to mathematics, science to languages - master any skill with our comprehensive learning ecosystem
          </p>
        </motion.div>

        {/* Floating Icons Grid */}
        <div className="relative">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-8 md:gap-12">
            {icons.map(({ Icon, color, delay }, index) => (
              <motion.div
                key={index}
                initial={{ y: 100, opacity: 0, scale: 0.5 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  delay: delay, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    y: { duration: 3, repeat: Infinity, delay: index * 0.5 },
                    rotate: { duration: 4, repeat: Infinity, delay: index * 0.3 }
                  }}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg hover:shadow-xl cursor-pointer transition-shadow duration-300`}
                >
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Background Glow Effects */}
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-300/10 rounded-full blur-3xl -z-10"></div>
        </div>

        {/* Network Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 1 }}
            viewport={{ once: true }}
            d="M 100 100 Q 300 50 500 100 T 900 100"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#6366F1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}