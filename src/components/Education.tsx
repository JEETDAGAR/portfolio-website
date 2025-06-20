import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, Users, Calendar, MapPin, Star } from 'lucide-react';
import { Education as EducationType, Certification, LeadershipExperience } from '../types/portfolio';

interface EducationProps {
  education: EducationType[];
  certifications: Certification[];
  leadership: LeadershipExperience[];
}

const Education: React.FC<EducationProps> = ({ education, certifications, leadership }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState<'education' | 'certifications' | 'leadership'>('education');

  const tabs = [
    { id: 'education', label: 'Education', icon: GraduationCap, count: education.length },
    { id: 'certifications', label: 'Certifications', icon: Award, count: certifications.length },
    { id: 'leadership', label: 'Leadership', icon: Users, count: leadership.length },
  ];

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
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
              Education & Qualifications
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-6 py-3 rounded-full border transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800/50 backdrop-blur-md border-white/20 text-white/80 hover:border-white/40'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon size={20} className="mr-2" />
              <span className="font-medium">{tab.label}</span>
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                activeTab === tab.id 
                  ? 'bg-white/20' 
                  : 'bg-white/10'
              }`}>
                {tab.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    {/* Icon */}
                    <div className="lg:col-span-1 flex justify-center lg:justify-start">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <GraduationCap size={40} className="text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-2 text-center lg:text-left">
                      <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                      <h4 className="text-xl text-blue-400 font-semibold mb-2">{edu.institution}</h4>
                      <p className="text-white/80 mb-4">{edu.field}</p>
                      
                      <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-white/60 mb-4">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2" />
                          <span>{edu.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Star size={16} className="mr-2 text-yellow-400" />
                          <span>{edu.achievement}</span>
                        </div>
                      </div>

                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        edu.type === 'undergraduate' 
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      }`}>
                        {edu.type === 'undergraduate' ? 'Bachelor\'s Degree' : 'Secondary Education'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-center">
                    {/* Badge */}
                    <div className="relative mx-auto w-20 h-20 mb-4">
                      <div className="w-full h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Award size={32} className="text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">{cert.name}</h3>
                    <p className="text-blue-400 font-semibold mb-2">{cert.issuer}</p>
                    <p className="text-white/60 text-sm mb-4">via {cert.platform}</p>
                    
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        cert.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {cert.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Leadership Tab */}
          {activeTab === 'leadership' && (
            <div className="space-y-8">
              {leadership.map((lead, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="grid lg:grid-cols-4 gap-8 items-start">
                    {/* Icon */}
                    <div className="lg:col-span-1 flex justify-center lg:justify-start">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Users size={40} className="text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3 text-center lg:text-left">
                      <h3 className="text-2xl font-bold text-white mb-2">{lead.role}</h3>
                      <h4 className="text-xl text-purple-400 font-semibold mb-2">{lead.organization}</h4>
                      <p className="text-white/80 mb-4">{lead.description}</p>
                      
                      <div className="flex items-center justify-center lg:justify-start text-sm text-white/60 mb-6">
                        <Calendar size={16} className="mr-2" />
                        <span>{lead.duration}</span>
                      </div>

                      {/* Responsibilities */}
                      <div>
                        <h5 className="text-lg font-semibold text-white mb-3">Key Responsibilities</h5>
                        <div className="space-y-2">
                          {lead.responsibilities.map((responsibility, idx) => (
                            <div key={idx} className="flex items-start text-left">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <p className="text-white/70">{responsibility}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20 text-center">
            <GraduationCap size={40} className="mx-auto mb-4 text-blue-400" />
            <div className="text-3xl font-bold text-blue-400 mb-2">{education.length}</div>
            <div className="text-white/60">Educational Qualifications</div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-500/20 text-center">
            <Award size={40} className="mx-auto mb-4 text-yellow-400" />
            <div className="text-3xl font-bold text-yellow-400 mb-2">{certifications.length}</div>
            <div className="text-white/60">Professional Certifications</div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 text-center">
            <Users size={40} className="mx-auto mb-4 text-purple-400" />
            <div className="text-3xl font-bold text-purple-400 mb-2">{leadership.length}</div>
            <div className="text-white/60">Leadership Roles</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
