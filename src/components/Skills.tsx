import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaGithub,
  FaBootstrap,
  FaPhp,
} from 'react-icons/fa';
import {
  SiFirebase,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiArduino,
  SiRaspberrypi,
  SiPostman,
  SiFigma,
  SiXampp,
  SiNotion,
  SiChatbot,
  SiTypescript,
  SiVuedotjs,
  SiExpress,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiEspressif
} from 'react-icons/si';
import { DiVisualstudio } from 'react-icons/di';


import { 
  Code, 
  Server, 
  Cpu, 
  Settings,
  Globe,
  Mic,
  Smartphone,
  GitBranch,
  Users2
} from 'lucide-react';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const skillCategories = [
    {
      title: 'Frontend',
      icon: Code,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'HTML5', level: 95 },
        { name: 'CSS3', level: 90 },
        { name: 'JavaScript', level: 88 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'Vue.js', level: 70 },
        { name: 'React', level: 82 },
        { name: 'Typescript', level: 75 }
      ]
    },
    {
      title: 'Backend',
      icon: Server,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Firebase', level: 75 },
        { name: 'Express.js', level: 82 },
        { name: 'PHP', level: 70 },
        { name: 'MongoDB', level: 65 },
        { name: 'SQL', level: 75 }
      ]
    },
    {
      title: 'IoT & Hardware',
      icon: Cpu,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'ESP32', level: 85 },
        { name: 'Arduino', level: 90 },
        { name: 'Sensors', level: 80 },
        { name: 'Raspberry Pi', level: 75 },
        { name: 'IoT with Firebase', level: 85 }
      ]
    },
    {
      title: 'Tools & Others',
      icon: Settings,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'Docker', level: 70 },
        { name: 'VS Code', level: 95 },
        { name: 'TailScale', level: 65 },
        { name: 'Twingate', level: 65 },
        { name: 'Figma', level: 95 },
        { name: 'Arduino IDE', level: 85 },
        { name: 'Xampp', level: 70 }
      ]
    }
  ];

const techStack = [
  { name: 'React', icon: <FaReact className="text-sky-400" /> },
  { name: 'Vue.js', icon: <SiVuedotjs className="text-green-500" /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-green-600" /> },
  { name: 'Express.js', icon: <SiExpress className="text-gray-500" /> },
  { name: 'Firebase', icon: <SiFirebase className="text-yellow-500" /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-green-700" /> },
  { name: 'MySQL', icon: <SiMysql className="text-blue-700" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: 'Bootstrap', icon: <FaBootstrap className="text-purple-600" /> },
  { name: 'HTML5', icon: <SiHtml5 className="text-orange-600" /> },
  { name: 'CSS3', icon: <SiCss3 className="text-blue-500" /> },
  { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" /> },
  { name: 'PHP', icon: <FaPhp className="text-indigo-700" /> },
  { name: 'ESP32', icon: <SiEspressif className="text-gray-700" /> },
  { name: 'Arduino', icon: <SiArduino className="text-blue-500" /> },
  { name: 'Raspberry Pi', icon: <SiRaspberrypi className="text-rose-600" /> },
  { name: 'Git', icon: <FaGitAlt className="text-red-500" /> },
  { name: 'GitHub', icon: <FaGithub className="text-gray-900" /> },
  { name: 'Docker', icon: <FaDocker className="text-blue-500" /> },
  { name: 'Figma', icon: <SiFigma className="text-pink-600" /> },
  { name: 'XAMPP', icon: <SiXampp className="text-orange-500" /> },
  { name: 'Postman', icon: <SiPostman className="text-orange-400" /> },
  { name: 'Notion', icon: <SiNotion className="text-black" /> },
  { name: 'ChatGPT', icon: <SiChatbot className="text-green-500" /> },
  { name: 'VS Code', icon: <DiVisualstudio className="text-blue-600" /> }
];
  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-800">
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
              Skills & Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <span className="text-lg">{tech.icon}</span>
              {tech.name}
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * categoryIndex }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg mb-4`}>
                <category.icon className="text-white" size={24} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {category.title}
              </h3>

              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.5 + skillIndex * 0.1 }}
                        className={`h-2 bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl">
            <Globe className="mx-auto mb-4 text-purple-600" size={32} />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Web Development</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Full-stack web applications with modern frameworks and responsive design
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
            <Smartphone className="mx-auto mb-4 text-blue-600" size={32} />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">IoT Solutions</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Smart devices and automation systems using microcontrollers and sensors
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
            <GitBranch className="mx-auto mb-4 text-green-600" size={32} />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Project Management</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Leading teams and managing complex projects from conception to deployment
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-lime-50 dark:from-yellow-900/20 dark:to-lime-900/20 rounded-xl">
            <Mic className="mx-auto mb-4 text-yellow-600" size={32} />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Community & Content</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Blogging, podcasting, and mentoring through INOVUS LABS and open-source contributions
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl">
            <Users2 className="mx-auto mb-4 text-indigo-600" size={32} />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mentoring & Leadership</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Guiding peers through hands-on sessions, tech workshops, and community-driven initiatives
            </p>
          </div>


        </motion.div>
      </div>
    </section>
  );
};

export default Skills;