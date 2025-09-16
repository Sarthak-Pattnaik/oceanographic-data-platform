import React from "react";
import { motion } from "framer-motion";

export default function TaglineSection() {
  const taglines = [
    { text: "Learn.", color: "from-blue-600 to-blue-700", delay: 0 },
    { text: "Grow.", color: "from-indigo-600 to-indigo-700", delay: 0.5 },
    { text: "Succeed.", color: "from-purple-600 to-purple-700", delay: 1 },
    { text: "Anytime, Anywhere.", color: "from-pink-600 to-pink-700", delay: 1.5 }
  ];

  const finalTagline = {
    text: "Reach Your Aim in Your Style.",
    color: "from-gray-900 via-blue-800 to-indigo-900",
    delay: 2.5
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Main Taglines */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-8">
            {taglines.map((tagline, index) => (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  y: 100,
                  scale: 0.5,
                  rotateX: -90
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  rotateX: 0
                }}
                transition={{ 
                  delay: tagline.delay, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.3 }
                }}
              >
                <span className={`text-6xl md:text-8xl lg:text-9xl font-extrabold bg-gradient-to-r ${tagline.color} bg-clip-text text-transparent cursor-default select-none`}>
                  {tagline.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final Tagline */}
        <motion.div
          initial={{ 
            opacity: 0, 
            y: 50,
            scale: 0.8
          }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            scale: 1
          }}
          transition={{ 
            delay: finalTagline.delay, 
            duration: 1,
            type: "spring",
            stiffness: 80
          }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow Effect */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-2xl rounded-full"
          />
          
          <h1 className={`relative text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r ${finalTagline.color} bg-clip-text text-transparent leading-tight`}>
            {finalTagline.text}
          </h1>
          
          {/* Underline Animation */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ delay: finalTagline.delay + 0.5, duration: 1.2 }}
            viewport={{ once: true }}
            className="mx-auto mt-6 h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
            style={{ maxWidth: "400px" }}
          />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: window.innerHeight,
                opacity: 0
              }}
              animate={{ 
                y: -100,
                opacity: [0, 1, 0],
                x: Math.random() * window.innerWidth
              }}
              transition={{ 
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}