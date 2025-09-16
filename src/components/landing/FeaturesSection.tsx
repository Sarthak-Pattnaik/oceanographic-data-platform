import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Users, 
  Target, 
  Globe,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      Icon: Zap,
      title: "AI-Powered Learning",
      description: "Adaptive algorithms that personalize your learning path based on your progress and preferences",
      color: "from-yellow-400 to-orange-500"
    },
    {
      Icon: Users,
      title: "Collaborative Learning",
      description: "Connect with peers worldwide, join study groups, and learn together in real-time",
      color: "from-blue-400 to-indigo-500"
    },
    {
      Icon: Target,
      title: "Goal-Oriented Approach",
      description: "Set clear objectives and track your progress with detailed analytics and milestones",
      color: "from-green-400 to-teal-500"
    },
    {
      Icon: Globe,
      title: "Global Accessibility",
      description: "Access content in multiple languages with 24/7 availability across all devices",
      color: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        {/* Animated Network Lines */}
        <svg className="absolute inset-0 w-full h-full">
          {[...Array(10)].map((_, i) => (
            <motion.line
              key={i}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 2, delay: i * 0.2 }}
              viewport={{ once: true }}
              x1={Math.random() * 100 + "%"}
              y1={Math.random() * 100 + "%"}
              x2={Math.random() * 100 + "%"}
              y2={Math.random() * 100 + "%"}
              stroke="url(#networkGradient)"
              strokeWidth="1"
              className="animate-pulse"
            />
          ))}
          <defs>
            <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-16 h-16 text-yellow-400" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
            Futuristic Learning Features
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Experience education technology that's years ahead of its time, designed to maximize your potential
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                rotateY: 5
              }}
              className="group relative"
            >
              <div className="relative p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-500">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:shadow-lg`}
                >
                  <feature.Icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-200 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  {feature.description}
                </p>

                {/* Holographic Border Effect */}
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Future?
          </h3>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join millions of learners who are already experiencing the future of education
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-12 py-6 text-xl font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 transform transition-all duration-300 group">
              Start Your Journey Now
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}