import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Cloud, Database, Settings, Monitor, Shield } from 'lucide-react';
import { TechnicalSkills } from '../types/portfolio';

interface SkillsProps {
  data: TechnicalSkills;
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState(Object.keys(data)[0]);

  const getSkillLevel = (category: string, skill: string): number => {
    const categoryData = data[category];
    if (categoryData.expert?.includes(skill)) return 95;
    if (categoryData.advanced?.includes(skill)) return 80;
    if (categoryData.intermediate?.includes(skill)) return 65;
    return 50;
  };

  const getAllSkillsForCategory = (category: string) => {
    const categoryData = data[category];
    const allSkills: { skill: string; level: number }[] = [];
    
    categoryData.expert?.forEach(skill => allSkills.push({ skill, level: 95 }));
    categoryData.advanced?.forEach(skill => allSkills.push({ skill, level: 80 }));
    categoryData.intermediate?.forEach(skill => allSkills.push({ skill, level: 65 }));
    
    return allSkills;
  };

  const categoryIcons: { [key: string]: any } = {
    'Cloud Platforms': Cloud,
    'Containerization & Orchestration': Database,
    'Infrastructure as Code': Settings,
    'CI/CD & Version Control': Code,
    'Monitoring & Observability': Monitor,
    'Security & Quality': Shield,
    'Programming Languages': Code,
    'Operating Systems': Settings,
  };

  const categoryColors: { [key: string]: string } = {
    'Cloud Platforms': 'from-blue-500 to-cyan-500',
    'Containerization & Orchestration': 'from-purple-500 to-pink-500',
    'Infrastructure as Code': 'from-green-500 to-teal-500',
    'CI/CD & Version Control': 'from-orange-500 to-red-500',
    'Monitoring & Observability': 'from-yellow-500 to-orange-500',
    'Security & Quality': 'from-red-500 to-pink-500',
    'Programming Languages': 'from-indigo-500 to-purple-500',
    'Operating Systems': 'from-gray-500 to-slate-500',
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/circuit-bg.jpg')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90"></div>
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
              Technical Skills
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="space-y-3">
              {Object.keys(data).map((category, index) => {
                const Icon = categoryIcons[category] || Code;
                const isActive = activeCategory === category;
                
                return (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-slate-800/80 backdrop-blur-md border-blue-500/50 shadow-xl shadow-blue-500/20'
                        : 'bg-slate-800/40 backdrop-blur-md border-white/10 hover:border-white/20'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${categoryColors[category]} mr-3`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-sm">{category}</h3>
                        <p className="text-white/60 text-xs">
                          {getAllSkillsForCategory(category).length} skills
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Skills Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 p-8"
            >
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  {React.createElement(categoryIcons[activeCategory] || Code, {
                    size: 32,
                    className: `mr-4 p-2 w-12 h-12 rounded-lg bg-gradient-to-r ${categoryColors[activeCategory]} text-white`
                  })}
                  <h3 className="text-2xl font-bold text-white">{activeCategory}</h3>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="space-y-6">
                {['expert', 'advanced', 'intermediate'].map((level) => {
                  const skills = data[activeCategory][level as keyof typeof data[typeof activeCategory]];
                  if (!skills || skills.length === 0) return null;

                  const levelColors = {
                    expert: 'from-green-500 to-emerald-500',
                    advanced: 'from-blue-500 to-cyan-500',
                    intermediate: 'from-yellow-500 to-orange-500'
                  };

                  const levelPercentages = {
                    expert: 95,
                    advanced: 80,
                    intermediate: 65
                  };

                  return (
                    <div key={level}>
                      <h4 className="text-lg font-semibold text-white mb-4 capitalize flex items-center">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${levelColors[level as keyof typeof levelColors]} mr-3`}></div>
                        {level} Level
                      </h4>
                      
                      <div className="grid md:grid-cols-1 gap-4">
                        {skills.map((skill, index) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-700/30 rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white font-medium">{skill}</span>
                              <span className="text-white/60 text-sm">
                                {levelPercentages[level as keyof typeof levelPercentages]}%
                              </span>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="w-full bg-slate-600/50 rounded-full h-2 overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${levelColors[level as keyof typeof levelColors]} rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${levelPercentages[level as keyof typeof levelPercentages]}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Skills Overview */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-500/20 text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {data[activeCategory].expert?.length || 0}
                  </div>
                  <div className="text-sm text-white/60">Expert</div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-500/20 text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {data[activeCategory].advanced?.length || 0}
                  </div>
                  <div className="text-sm text-white/60">Advanced</div>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-4 border border-yellow-500/20 text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {data[activeCategory].intermediate?.length || 0}
                  </div>
                  <div className="text-sm text-white/60">Intermediate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating skill icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {['AWS', 'K8s', 'Docker', 'Jenkins', 'Terraform', 'Python'].map((skill, index) => (
            <motion.div
              key={skill}
              className="absolute w-16 h-16 bg-slate-800/30 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-xs font-semibold text-blue-400"
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index * 10)}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
