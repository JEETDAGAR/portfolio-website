import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ExternalLink, Tag, BookOpen } from 'lucide-react';

interface BlogPost {
  title: string;
  description: string;
  publication_date: string;
  tags: string[];
  url: string;
  read_time: string;
}

interface BlogProps {
  posts: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-blue-900/10"></div>
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
              Latest Blog Posts
            </span>
          </h2>
          <p className="text-xl text-white/80 mb-4">
            Sharing insights and experiences in DevOps and Cloud Architecture
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="group bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              {/* Header with gradient */}
              <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              <div className="p-8">
                {/* Meta information */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-white/60">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-blue-400" />
                    <span>{post.publication_date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-purple-400" />
                    <span>{post.read_time}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-white/80 leading-relaxed mb-6">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-white/80 border border-white/10"
                    >
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read more button */}
                <motion.a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-white hover:from-purple-500 hover:to-pink-500 transition-all duration-300 group/button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen size={18} className="mr-2" />
                  Read Full Article
                  <ExternalLink size={16} className="ml-2 group-hover/button:translate-x-1 transition-transform duration-300" />
                </motion.a>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.article>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl border border-white/10 p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to Read More?
            </h3>
            <p className="text-white/80 mb-6">
              Follow me on Medium for more insights on DevOps, Cloud Architecture, and cutting-edge technologies.
            </p>
            <motion.a
              href="https://medium.com/@jeetdagar42"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-white hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Visit Medium Profile
              <ExternalLink size={18} className="ml-2" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
