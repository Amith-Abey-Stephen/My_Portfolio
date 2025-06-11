import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, Heart } from 'lucide-react';

interface FooterProps {
  onBackToTop: () => void;
}

const Footer: React.FC<FooterProps> = ({ onBackToTop }) => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Back to Top Button */}
          <motion.button
            onClick={onBackToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mb-8"
            aria-label="Back to top"
          >
            <ChevronUp size={24} />
          </motion.button>

          {/* Logo/Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Amith Abey Stephen
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Web Developer | IoT Enthusiast | Community Leader
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mb-8 text-sm"
          >
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                whileHover={{ scale: 1.1, color: '#A855F7' }}
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
              >
                {link}
              </motion.a>
            ))}
          </motion.nav>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-500"
          >
            <span>© {new Date().getFullYear()} Amith Abey Stephen. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Made with <Heart size={16} className="text-red-500" /> and React
            </span>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-xs text-gray-600"
          >
            <p>Building the future, one line of code at a time.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;