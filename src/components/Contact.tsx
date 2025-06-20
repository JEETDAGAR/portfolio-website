import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Github, Linkedin, Send, MessageCircle, Copy, Check } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';

interface ContactProps {
  data: PersonalInfo;
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: data.email,
      href: `mailto:${data.email}`,
      color: 'from-blue-500 to-cyan-500',
      copyable: true
    },
    {
      icon: Phone,
      label: 'Phone',
      value: data.phone,
      href: `tel:${data.phone}`,
      color: 'from-green-500 to-emerald-500',
      copyable: true
    },
    {
      icon: MapPin,
      label: 'Location',
      value: data.location,
      href: '#',
      color: 'from-purple-500 to-pink-500',
      copyable: false
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: data.github || '#',
      color: 'from-gray-500 to-slate-500'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: data.linkedin || '#',
      color: 'from-blue-600 to-blue-800'
    }
  ];

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can integrate with a form service like Formspree, Netlify Forms, etc.
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
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
              Get In Touch
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Let's collaborate and build something amazing together. I'm always open to discussing new opportunities and exciting projects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="group bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${method.color} mr-4`}>
                          <method.icon size={24} className="text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">{method.label}</h4>
                          <p className="text-white/70">{method.value}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {method.copyable && (
                          <motion.button
                            onClick={() => copyToClipboard(method.value, method.label)}
                            className="p-2 bg-slate-700/50 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-blue-400/50 transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {copiedField === method.label ? (
                              <Check size={16} className="text-green-400" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </motion.button>
                        )}
                        
                        <motion.a
                          href={method.href}
                          className="p-2 bg-slate-700/50 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-blue-400/50 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MessageCircle size={16} />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className={`group relative w-16 h-16 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.2,
                      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={28} />
                    
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {social.label}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-white/10"
            >
              <h4 className="text-lg font-semibold text-white mb-3">Quick Info</h4>
              <div className="space-y-2 text-white/70">
                <p>• Open to full-time positions</p>
                <p>• Interested in remote collaboration</p>
                <p>• Response time: Within 24 hours</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white/80 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white/80 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-white/80 font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                  placeholder="Let's discuss a project"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white/80 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>
              
              <motion.button
                type="submit"
                className="group relative w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-white overflow-hidden hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Send size={20} className="mr-2" />
                  Send Message
                </span>
                
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId="button-hover"
                />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-white/60">
            © 2025 {data.name}. Built with React, TypeScript, and Tailwind CSS.
          </p>
          <p className="text-white/40 text-sm mt-2">
            Designed with ❤️ and lots of ☕
          </p>
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i * 10)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Contact;
