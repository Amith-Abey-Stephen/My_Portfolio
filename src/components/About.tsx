import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Code, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const stats = [
    { icon: Code, label: 'Projects Completed', value: '7' },
    { icon: Users, label: 'Community Members', value: '50+' },
    { icon: Award, label: 'Events Organized', value: '10+' },
    { icon: Lightbulb, label: 'Years Experience', value: '3+' }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
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
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate about creating innovative solutions and building communities
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-full max-w-md mx-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20"></div>
                  <img
                    src="src/assets/Untitled_design-removebg-preview 1 (1).png"
                    alt="Amith Abey Stephen"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I'm a passionate Web Developer and IoT enthusiast with a deep love for innovation and community building. 
                As the CEO of <span className="font-semibold text-purple-600 dark:text-purple-400">INOVUS LABS IEDC</span>, 
                I lead initiatives that bridge the gap between technology and education.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                My journey began with a curiosity for how things work, which led me to explore web development, 
                IoT systems, and entrepreneurship. I've organized events like <span className="font-semibold">BizNova</span> and 
                <span className="font-semibold"> AksharaTharangam</span>, hosted the <span className="font-semibold">Inora podcast</span>, 
                and built solutions that make a real impact.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                When I'm not coding or building IoT projects, you'll find me mentoring aspiring developers, 
                organizing community events, or exploring the latest in web3 and blockchain technology. 
                I believe in the power of technology to transform lives and communities.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-200 dark:border-purple-800"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Current Focus</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Expanding Inovus Labs and building the Purple Movement
                to create sustainable tech communities across India.
              </p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg mb-4">
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;