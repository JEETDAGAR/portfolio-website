import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Code, FolderOpen, GraduationCap, BookOpen, Download, Mail } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'resume', label: 'Resume', icon: Download },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/80 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              JD
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </span>
                  
                  {/* Glowing hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    layoutId="navbar-hover"
                  />
                  
                  {/* Neon border */}
                  <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-blue-400/50 transition-colors duration-200" />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-white/80 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" />
            
            {/* Menu Content */}
            <motion.div
              className="relative mt-16 bg-slate-800/90 backdrop-blur-md border-t border-white/10"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon size={20} className="text-blue-400 group-hover:text-blue-300" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
