import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Blog from './components/Blog';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import { PortfolioData } from './types/portfolio';
import './App.css';

function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const response = await fetch('/data/portfolio_structured.json');
        const data = await response.json();
        setPortfolioData(data);
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      } finally {
        // Minimum loading time for better UX
        setTimeout(() => setLoading(false), 2000);
      }
    };

    loadPortfolioData();
  }, []);

  if (loading || !portfolioData) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white overflow-x-hidden">
      {/* Enhanced animated background */}
      <div className="fixed inset-0 z-0">
        {/* Multiple background layers for depth */}
        <div className="absolute inset-0 bg-[url('/images/circuit-bg.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/40 to-indigo-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-violet-900/20 via-transparent to-cyan-900/20"></div>
        
        {/* Enhanced animated particles */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'w-1 h-1 bg-blue-400/40' : 
              i % 3 === 1 ? 'w-1.5 h-1.5 bg-purple-400/30' : 
              'w-0.5 h-0.5 bg-cyan-400/50'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Floating geometric shapes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute border rounded-lg opacity-10 ${
              i % 4 === 0 ? 'w-16 h-16 border-blue-400/30' :
              i % 4 === 1 ? 'w-12 h-12 border-purple-400/30' :
              i % 4 === 2 ? 'w-20 h-20 border-cyan-400/20' :
              'w-8 h-8 border-violet-400/40'
            }`}
            style={{
              left: `${5 + (i * 8)}%`,
              top: `${10 + (i * 7)}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.1, 0.8],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Navigation />
        
        <AnimatePresence>
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero data={portfolioData.personal_info} />
            <About data={portfolioData.personal_info} />
            <Experience data={portfolioData.work_experience} />
            <Skills data={portfolioData.technical_skills} />
            <Projects data={portfolioData.personal_projects} />
            <Blog posts={portfolioData.blog_posts} />
            <Education 
              education={portfolioData.education} 
              certifications={portfolioData.certifications}
              leadership={portfolioData.leadership_experience}
            />
            <Resume data={portfolioData} />
            <Contact data={portfolioData.personal_info} />
          </motion.main>
        </AnimatePresence>
      </div>

      {/* Enhanced glowing effects */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div 
          className="absolute top-3/4 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-80 h-80 bg-violet-500/12 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.12, 0.06, 0.12],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </div>
  );
}

export default App;
