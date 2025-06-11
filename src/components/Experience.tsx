import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Briefcase, 
  Award, 
  Mic, 
  Users, 
  Calendar,
  MapPin,
  Trophy,
  Users2,
  Package,
  Github,
  Rocket,
  Laptop2,
  Globe
} from 'lucide-react';

const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

 const experiences = [
  {
    title: 'CEO',
    company: 'INOVUS LABS IEDC',
    location: 'Kristu Jyoti College, Kerala',
    period: 'Mar 2025 – Present',
    type: 'Leadership',
    icon: Briefcase,
    color: 'from-purple-500 to-pink-500',
    description: 'Leading INOVUS LABS IEDC to foster tech, innovation, and entrepreneurship among students.',
    achievements: [
      'Expanded into web, IoT, design, marketing, and podcasting',
      'Launched SkillnEdu & The Purple Movement initiatives',
      'Organized flagship events like Zypher 3.0, BizNova, AksharaTharangam',
      'Built collaboration with TinkerHub, MuLearn, and KSUM'
    ]
  },
  {
    title: 'Core Member & Mentor',
    company: 'INOVUS LABS IEDC',
    location: 'Kerala, India',
    period: 'Oct 2023 – Feb 2025',
    type: 'Mentoring',
    icon: Users2,
    color: 'from-indigo-500 to-blue-500',
    description: 'Mentored peers and juniors in full-stack development and IoT projects through StepOne and Simply Series.',
    achievements: [
      'Conducted 10+ peer-learning Weekend Workbenches',
      'Mentored 30+ students in HTML, Tailwind, Git & ESP32',
      'Led IoT and web design workshops',
      'Hosted Zypher 3.0 and BizNova event tracks'
    ]
  },
  {
    title: 'Event Organizer',
    company: 'BizNova, AksharaTharangam, Zypher 3.0',
    location: 'Multiple Locations',
    period: '2023 – Present',
    type: 'Community',
    icon: Award,
    color: 'from-blue-500 to-cyan-500',
    description: 'Planned and executed large-scale events across tech, entrepreneurship, and literature.',
    achievements: [
      'Directed BizNova business simulation with 500+ attendees',
      'Led AksharaTharangam – literary festival with book stalls, drama, debate',
      'Coordinated Zypher 3.0 with over 20 tech exhibits',
      'Managed logistics and volunteer teams across campuses'
    ]
  },
  {
    title: 'Content & Podcast Creator',
    company: 'INOVUS LABS IEDC',
    location: 'Online & Spotify',
    period: '2022 – Present',
    type: 'Media',
    icon: Mic,
    color: 'from-green-500 to-emerald-500',
    description: 'Created content for blogs, podcasts (Inora), posters, and documentation.',
    achievements: [
      'Hosted and edited 20+ podcast episodes for Inora',
      'Created 15+ blogs and OpenAI outage story post',
      'Designed posters, birthday graphics, and social reels',
      'Maintained content across blog.inovuslabs.org & Spotify'
    ]
  },
  {
    title: 'Web Intern',
    company: 'Zidio Development',
    location: 'Bangalore (Remote)',
    period: 'Oct 2024 – Dec 2024',
    type: 'Internship',
    icon: Laptop2,
    color: 'from-yellow-400 to-amber-500',
    description: 'Contributed to real-world MERN stack projects in a collaborative team environment.',
    achievements: [
      'Built and integrated full-stack components with React & MongoDB',
      'Improved UI/UX with Tailwind CSS and reusable design patterns',
      'Participated in code reviews and project planning meetings',
      'Learned industry workflows and GitHub collaboration'
    ]
  },
  {
    title: 'Stock Manager',
    company: 'INOVUS LABS IEDC',
    location: 'Kristu Jyoti College, Kerala',
    period: 'Feb 2024 – Feb 2025',
    type: 'Operations',
    icon: Package,
    color: 'from-orange-500 to-red-500',
    description: 'Managed inventory and resources for 20+ projects and events.',
    achievements: [
      'Maintained component stock for Weekend Workbenches',
      'Ensured availability for Pattupeti, IoT car, and Smart Irrigation projects',
      'Digitized tracking and procurement process',
      'Supported event hardware setup across departments'
    ]
  },
  {
    title: 'Open Source Contributor',
    company: 'MuLearn + Inovus Labs',
    location: 'GitHub',
    period: '2023 – Present',
    type: 'Open Source',
    icon: Github,
    color: 'from-slate-600 to-black',
    description: 'Actively contributed to multiple open-source projects through Hacktoberfest and internal platforms.',
    achievements: [
      'Improved UI/UX of app.mulearn.org using TypeScript + Tailwind',
      'Built JSON Generator tool as part of Hacktoberfest',
      'Maintained community website inovuslabs.org',
      'Led GitHub onboarding for juniors'
    ]
  },
  {
    title: 'Startup Builder',
    company: 'SkillnEdu',
    location: 'Kerala, India',
    period: '2025 – Present',
    type: 'Startup',
    icon: Rocket,
    color: 'from-violet-600 to-fuchsia-500',
    description: 'Built an e-learning platform to teach web development and hardware skills.',
    achievements: [
      'Launched web courses for students and professionals',
      'Developed platform using HTML, CSS, JS stack',
      'Integrated smooth UX and accessible content',
      'Planned curriculum around real-world tools and use-cases'
    ]
  },
  {
    title: 'Hackathon Participant',
    company: 'NASA Space Apps',
    location: 'Online + India',
    period: '2024',
    type: 'Hackathon',
    icon: Globe,
    color: 'from-blue-900 to-indigo-700',
    description: 'Built a cost-effective satellite communication support system for underserved regions.',
    achievements: [
      'Led development of low-cost network+power communication module',
      'Integrated AI components and prototype demo',
      'Collaborated across teams for research and design',
      'Submitted and pitched project to NASA judges'
    ]
  }
];


  const milestones = [
    { year: '2020', event: 'Started Professional Journey', icon: Briefcase },
    { year: '2021', event: 'Launched Inora Podcast', icon: Mic },
    { year: '2022', event: 'Founded INOVUS LABS', icon: Trophy },
    { year: '2023', event: 'Organized Major Events', icon: Award },
    { year: '2024', event: 'Scaling Tech Ventures', icon: Users }
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">
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
              Experience & Timeline
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My journey through leadership, innovation, and community building
          </p>
        </motion.div>

        {/* Timeline Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-20"
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {milestone.year}
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 font-medium">
                      {milestone.event}
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                  <milestone.icon className="text-white" size={20} />
                </div>
                
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${exp.color} rounded-xl`}>
                    <exp.icon className="text-white" size={28} />
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {exp.title}
                      </h3>
                      <div className="text-lg text-purple-600 dark:text-purple-400 font-semibold mb-2">
                        {exp.company}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:items-end text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar size={14} />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 bg-gradient-to-r ${exp.color} text-white text-xs font-medium rounded-full`}>
                      {exp.type}
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Key Achievements:
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <motion.div
                          key={achievementIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.1 * achievementIndex }}
                          className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            {achievement}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current Focus Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What I'm Working On Now
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                  Scaling SkillnEdu
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Expanding our learning platform to reach more students across India 
                  and building partnerships with educational institutions.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  Purple Movement
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Building sustainable tech communities across India to foster 
                  innovation and create opportunities for young entrepreneurs.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;