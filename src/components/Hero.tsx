import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';

interface HeroProps {
  data: PersonalInfo;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-purple-900/70 to-slate-900/70"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 z-5">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 border border-blue-400/20 rounded-lg"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${30 + (i * 8)}%`,
            }}
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile Image */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              {/* Glowing ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-lg opacity-50"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {/* Profile image */}
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm">
                <img
                  src="/images/jeet-photo.jpg"
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Glassy overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10"></div>
              </div>

              {/* Floating tech icons */}
              {['AWS', 'K8s', 'Docker', 'Jenkins'].map((tech, i) => (
                <motion.div
                  key={tech}
                  className="absolute w-12 h-12 bg-slate-800/80 backdrop-blur-md rounded-lg border border-white/20 flex items-center justify-center text-xs font-semibold text-blue-400"
                  style={{
                    top: `${15 + i * 20}%`,
                    left: i % 2 === 0 ? '-10%' : '110%',
                  }}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            className="order-1 lg:order-2 text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Greeting */}
            <motion.div
              className="inline-block px-4 py-2 bg-slate-800/50 backdrop-blur-md rounded-full border border-blue-400/30 mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="text-blue-400 font-medium">👋 Hello, I'm</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {data.name}
              </span>
            </motion.h1>

            {/* Title */}
            <motion.h2
              className="text-2xl lg:text-3xl font-medium text-white/80 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {data.current_title}
            </motion.h2>

            {/* Location */}
            <motion.div
              className="flex items-center text-white/60 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <MapPin size={20} className="mr-2 text-blue-400" />
              <span>{data.location}</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-white overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10">Get In Touch</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId="button-hover"
                />
              </motion.button>

              <motion.button
                className="group px-8 py-3 border border-white/20 rounded-lg font-semibold text-white hover:bg-white/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {[
                { icon: Github, label: 'GitHub', href: data.github || '#' },
                { icon: Linkedin, label: 'LinkedIn', href: data.linkedin || '#' },
                { icon: Mail, label: 'Email', href: `mailto:${data.email}` },
                { icon: Phone, label: 'Phone', href: `tel:${data.phone}` },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="group w-12 h-12 bg-slate-800/50 backdrop-blur-md rounded-lg border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-blue-400/50 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            onClick={scrollToNext}
            className="flex flex-col items-center text-white/60 hover:text-white transition-colors duration-300 group"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm mb-2 group-hover:text-blue-400 transition-colors duration-300">Scroll Down</span>
            <ChevronDown size={24} className="group-hover:text-blue-400 transition-colors duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
