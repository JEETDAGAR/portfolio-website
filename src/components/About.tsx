import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Target, Users, Zap } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';

interface AboutProps {
  data: PersonalInfo;
}

const About: React.FC<AboutProps> = ({ data }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const highlights = [
    {
      icon: Award,
      title: "4 AWS Certifications",
      description: "Cloud Practitioner, Solutions Architect, Developer, SysOps Admin",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Target,
      title: "Cost Optimization",
      description: "$2000/month savings through infrastructure optimization",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "High-Traffic Applications",
      description: "Handling 30k-40k daily users with optimal performance",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Zap,
      title: "DevOps Excellence",
      description: "70% deployment time reduction using IaC",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] bg-cover bg-center opacity-5"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Glowing background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
              
              {/* Main image container */}
              <div className="relative bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 p-8 overflow-hidden">
                <img
                  src="/images/workspace.jpeg"
                  alt="Workspace"
                  className="w-full h-80 object-cover rounded-xl"
                />
                
                {/* Floating stats */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 text-white"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <div className="text-2xl font-bold">2+</div>
                  <div className="text-sm">Years Experience</div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 text-white"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 1.5,
                  }}
                >
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-sm">AWS Certs</div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Passionate DevOps Engineer & Cloud Architect
            </h3>
            
            <div className="text-lg text-white/80 leading-relaxed space-y-4">
              <p>{data.professional_summary}</p>
            </div>

            {/* Skills tags */}
            <div className="flex flex-wrap gap-3 mt-6">
              {['AWS', 'Kubernetes', 'Terraform', 'Docker', 'Jenkins', 'Python'].map((skill) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 bg-slate-800/50 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium text-white/80"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              className="group relative bg-slate-800/30 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Glowing background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${highlight.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`w-12 h-12 bg-gradient-to-r ${highlight.color} rounded-lg flex items-center justify-center mb-4`}>
                  <highlight.icon size={24} className="text-white" />
                </div>
                
                <h4 className="text-lg font-semibold text-white mb-2">
                  {highlight.title}
                </h4>
                
                <p className="text-white/70 text-sm">
                  {highlight.description}
                </p>
              </div>

              {/* Neon border effect */}
              <div className={`absolute inset-0 rounded-xl border border-transparent group-hover:border-gradient-to-r group-hover:${highlight.color} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
