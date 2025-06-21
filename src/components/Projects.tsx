import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Play, Code, TrendingUp, Award } from 'lucide-react';
import { PersonalProject } from '../types/portfolio';

interface ProjectsProps {
  data: PersonalProject[];
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState(0);

  const projectImages = [
    '/images/devops-project.png',
    '/images/aws-project.jpg',
    '/images/kubernetes-project.png',
  ];

  const getProjectMetrics = (project: PersonalProject) => {
    return Object.entries(project.metrics).map(([key, value]) => ({
      label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: value,
      color: getMetricColor(key)
    }));
  };

  const getMetricColor = (key: string) => {
    const colorMap: { [key: string]: string } = {
      setup_time_reduction: 'from-green-500 to-emerald-500',
      deployment_success_rate: 'from-blue-500 to-cyan-500',
      manual_intervention_reduction: 'from-purple-500 to-pink-500',
      issue_detection_improvement: 'from-orange-500 to-red-500',
      overall_success_rate: 'from-yellow-500 to-orange-500',
    };
    return colorMap[key] || 'from-gray-500 to-slate-500';
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"></div>
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
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Project Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {data.map((project, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedProject(index)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                selectedProject === index
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800/50 backdrop-blur-md border-white/20 text-white/80 hover:border-white/40'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-medium">{project.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Project Details */}
        <motion.div
          key={selectedProject}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative group">
              {/* Glowing background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              
              {/* Image container */}
              <div className="relative bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                <img
                  src={projectImages[selectedProject] || projectImages[0]}
                  alt={data[selectedProject].name}
                  className="w-full h-80 object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                
                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button
                    className="w-10 h-10 bg-slate-800/80 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-blue-400/50 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={16} />
                  </motion.button>
                  <motion.button
                    className="w-10 h-10 bg-slate-800/80 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-blue-400/50 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} />
                  </motion.button>
                </div>

                {/* Project type badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-sm font-medium">
                    {data[selectedProject].type}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {data[selectedProject].name}
              </h3>
              <p className="text-lg text-white/80 leading-relaxed">
                {data[selectedProject].description}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Code size={20} className="mr-2 text-blue-400" />
                Key Features
              </h4>
              <div className="space-y-2">
                {data[selectedProject].key_features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-white/70">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Technologies Used</h4>
              <div className="flex flex-wrap gap-3">
                {data[selectedProject].technologies.map((tech, index) => (
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

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <a
                href="https://github.com/JEETDAGAR/DevSecOps-Kubernetes-Three-Tier-Project"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className="group flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-white hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} className="mr-2" />
                  View Code
                </motion.button>
              </a>
              
              <motion.button
                className="group flex items-center px-6 py-3 border border-white/20 rounded-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={20} className="mr-2" />
                Live Demo
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Project Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <TrendingUp size={24} className="mr-2 text-green-400" />
            Project Achievements
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {getProjectMetrics(data[selectedProject]).map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10 p-6 text-center hover:border-white/20 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
              >
                <div className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-2`}>
                  {metric.value}
                </div>
                <div className="text-white/70 text-sm">{metric.label}</div>
                
                {/* Glowing effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <Award size={24} className="mr-2 text-yellow-400" />
            Impact & Results
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {data[selectedProject].achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start">
                  <TrendingUp size={20} className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-white/80">{achievement}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
