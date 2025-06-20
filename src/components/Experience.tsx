import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building, Calendar, MapPin, ChevronRight, Award, TrendingUp } from 'lucide-react';
import { WorkExperience } from '../types/portfolio';

interface ExperienceProps {
  data: WorkExperience[];
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedExperience, setSelectedExperience] = useState(0);

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
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
              Professional Experience
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="space-y-4">
              {data.map((exp, index) => (
                <motion.div
                  key={index}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedExperience === index
                      ? 'scale-105'
                      : 'hover:scale-102'
                  }`}
                  onClick={() => setSelectedExperience(index)}
                  whileHover={{ x: 5 }}
                >
                  {/* Timeline line */}
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 opacity-30"></div>
                  
                  {/* Timeline dot */}
                  <div className={`absolute left-4 top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    selectedExperience === index
                      ? 'bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/50'
                      : 'bg-slate-800 border-white/20'
                  }`}></div>

                  {/* Card */}
                  <div className={`ml-12 p-6 rounded-xl border transition-all duration-300 ${
                    selectedExperience === index
                      ? 'bg-slate-800/80 backdrop-blur-md border-blue-500/50 shadow-xl shadow-blue-500/20'
                      : 'bg-slate-800/40 backdrop-blur-md border-white/10 hover:border-white/20'
                  }`}>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {exp.position}
                    </h3>
                    <div className="flex items-center text-blue-400 mb-2">
                      <Building size={16} className="mr-2" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                    <div className="flex items-center text-white/60 text-sm mb-2">
                      <Calendar size={14} className="mr-2" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <MapPin size={14} className="mr-2" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <motion.div
              key={selectedExperience}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 p-8"
            >
              {/* Header */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {data[selectedExperience].position}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-white/80">
                  <div className="flex items-center">
                    <Building size={20} className="mr-2 text-blue-400" />
                    <span className="font-medium">{data[selectedExperience].company}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={20} className="mr-2 text-purple-400" />
                    <span>{data[selectedExperience].duration}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={20} className="mr-2 text-pink-400" />
                    <span>{data[selectedExperience].location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-white/80 leading-relaxed">
                  {data[selectedExperience].description}
                </p>
              </div>

              {/* Responsibilities */}
              {data[selectedExperience].responsibilities && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <ChevronRight size={20} className="mr-2 text-blue-400" />
                    Key Responsibilities
                  </h4>
                  <div className="space-y-3">
                    {data[selectedExperience].responsibilities!.map((responsibility, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-white/70">{responsibility}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {data[selectedExperience].achievements && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Award size={20} className="mr-2 text-yellow-400" />
                    Key Achievements
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {data[selectedExperience].achievements!.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-4 border border-green-500/20"
                      >
                        <div className="flex items-start">
                          <TrendingUp size={16} className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                          <p className="text-white/80 text-sm">{achievement}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              {data[selectedExperience].technologies && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Technologies Used</h4>
                  <div className="flex flex-wrap gap-3">
                    {data[selectedExperience].technologies!.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-4 py-2 bg-slate-700/50 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium text-white/80 hover:border-blue-400/50 transition-colors duration-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {data[selectedExperience].projects && (
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Notable Projects</h4>
                  <div className="space-y-4">
                    {data[selectedExperience].projects!.map((project, index) => (
                      <motion.div
                        key={project.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-700/30 rounded-lg p-6 border border-white/10"
                      >
                        <h5 className="text-lg font-semibold text-white mb-2">{project.name}</h5>
                        <p className="text-white/70 mb-4">{project.description}</p>
                        
                        {project.achievements && (
                          <div className="grid md:grid-cols-2 gap-2">
                            {project.achievements.map((achievement, idx) => (
                              <div key={idx} className="flex items-center text-sm text-green-400">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                                {achievement}
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
