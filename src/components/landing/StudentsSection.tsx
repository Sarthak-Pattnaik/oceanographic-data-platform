import React from "react";
import { motion } from "framer-motion";
import { Laptop, Smartphone, Tablet } from "lucide-react";

export default function StudentsSection() {
  const devices = [
    {
      Icon: Laptop,
      title: "Desktop Learning",
      description: "Full-featured experience with advanced tools",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      Icon: Tablet,
      title: "Tablet Experience",
      description: "Touch-optimized interface for interactive learning",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      Icon: Smartphone,
      title: "Mobile Learning",
      description: "Learn on-the-go with bite-sized lessons",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-6">
            Learn Anywhere, Anytime
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform adapts to your lifestyle. Whether you're at home, commuting, or traveling - your education never stops
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {devices.map((device, index) => (
            <motion.div
              key={index}
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: index * 0.3, 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Device Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${device.gradient} opacity-90`}></div>
                  <img
                    src={device.image}
                    alt={device.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Device Icon Overlay */}
                  <div className="absolute top-4 right-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      <device.Icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  {/* Holographic Effect */}
                  <motion.div
                    animate={{ 
                      x: [-100, 100],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      delay: index * 1.5 
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {device.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {device.description}
                  </p>
                  
                  {/* Progress Bar Effect */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: index * 0.3 + 0.5, duration: 1 }}
                    viewport={{ once: true }}
                    className="mt-6 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: "1M+", label: "Active Learners" },
            { number: "500+", label: "Courses Available" },
            { number: "50+", label: "Expert Instructors" },
            { number: "98%", label: "Success Rate" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}