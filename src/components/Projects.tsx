import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Award, Zap, Shield, Globe } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const projects = [
    {
      title: 'SkillnEdu',
      description: 'A comprehensive learning platform that empowers students with practical skills through interactive courses, real-world projects, and community-driven learning.',
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
      tech: ['React', 'Node.js', 'Firebase', 'Tailwind CSS'],
      features: ['Interactive Learning', 'Progress Tracking', 'Community Features'],
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      demoLink: 'https://skillnedu-demo.vercel.app',
      githubLink: 'https://github.com/Amith-Abey-Stephen/SkillnEdu'
    },
    {
      title: 'Smart Irrigation System',
      description: 'An IoT-based automated irrigation system that uses soil moisture sensors and weather data to optimize water usage and improve crop yield.',
      image: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600',
      tech: ['ESP32', 'Arduino', 'Sensors', 'Mobile App'],
      features: ['Remote Monitoring', 'Water Conservation', 'Data Analytics'],
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      demoLink: 'https://smart-irrigation-demo.netlify.app',
      githubLink: 'https://github.com/Amith-Abey-Stephen/Smart-Irrigation-System'
    },
    {
      title: 'Pattupeti',
      description: 'A digital platform connecting local artisans with global markets, featuring secure payments, inventory management, and cultural preservation.',
      image: 'https://images.pexels.com/photos/1842332/pexels-photo-1842332.jpeg?auto=compress&cs=tinysrgb&w=600',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      features: ['E-commerce', 'Artisan Profiles', 'Cultural Stories'],
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      demoLink: 'https://pattupeti.vercel.app',
      githubLink: 'https://github.com/Amith-Abey-Stephen/Pattupeti'
    },
    {
      title: 'Australia DC Web3 Certificate Verifier',
      description: 'A blockchain-based certificate verification system ensuring authenticity and preventing fraud in educational credentials.',
      image: 'https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=600',
      tech: ['Web3', 'Blockchain', 'Smart Contracts', 'React'],
      features: ['Blockchain Security', 'Instant Verification', 'Fraud Prevention'],
      icon: Shield,
      color: 'from-orange-500 to-red-500',
      demoLink: 'https://certificate-verifier.netlify.app',
      githubLink: 'https://github.com/Amith-Abey-Stephen/Web3-Certificate-Verifier'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Innovative solutions that make a real impact
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`absolute top-4 right-4 p-2 bg-gradient-to-r ${project.color} rounded-full`}>
                  <project.icon className="text-white" size={20} />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.a
                    href={project.demoLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </motion.a>
                  
                  <motion.a
                    href={project.githubLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    <Github size={16} />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;