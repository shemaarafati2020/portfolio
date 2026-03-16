'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink, Briefcase, GraduationCap, Award } from 'lucide-react'

interface TimelineItemProps {
  title: string
  company: string
  location: string
  period: string
  description: string[]
  technologies: string[]
  type: 'work' | 'education' | 'achievement'
  index: number
}

const TimelineItem = ({ title, company, location, period, description, technologies, type, index }: TimelineItemProps) => {
  const icons = {
    work: Briefcase,
    education: GraduationCap,
    achievement: Award
  }
  
  const Icon = icons[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative flex items-start gap-8 mb-12 group"
    >
      {/* Timeline line with pulse effect */}
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: index * 0.2 + 0.3 }}
          className="relative"
        >
          <div className="w-4 h-4 bg-green-400 rounded-full border-4 border-black shadow-lg shadow-green-400/50" />
          <motion.div
            className="absolute inset-0 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ opacity: 0.3 }}
          />
        </motion.div>
        {index < 3 && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-green-400 to-transparent" />
        )}
      </div>

      {/* Content with enhanced animations */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.2 + 0.2 }}
        whileHover={{ scale: 1.02, y: -5 }}
        className="flex-1 bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-green-400/50 transition-all group-hover:shadow-lg group-hover:shadow-green-400/10 relative overflow-hidden"
      >
        {/* Background gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-blue-400/5"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-green-400/10 rounded-lg">
              <Icon className="text-green-400" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                {title}
              </h3>
              <p className="text-green-400 font-semibold">{company}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={14} />
              {period}
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin size={14} />
              {location}
            </div>
          </div>

          <ul className="space-y-2 mb-4">
            {description.map((point, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 + 0.4 + idx * 0.1 }}
                className="text-gray-300 text-sm flex items-start gap-2"
              >
                <motion.span
                  className="text-green-400 mt-1"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                >
                  ▸
                </motion.span>
                {point}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 + 0.5 + idx * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-2 py-1 bg-gray-800 text-xs text-green-400 rounded border border-green-400/20 cursor-pointer"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function EnhancedExperienceTimeline() {
  const experiences = [
    {
      title: 'Software Engineer & IT Student',
      company: 'SKillArc Corporation',
      location: 'Global 🌍',
      period: '2024 - Present',
      description: [
        'Developing innovative full-stack applications serving real users across the platform',
        'Building scalable backend APIs with Node.js and integrating cloud services',
        'Collaborating on product features using React, TypeScript and modern DevOps pipelines'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL'],
      type: 'work' as const
    },
    {
      title: 'Full-Stack Developer',
      company: 'Freelance & Open Source',
      location: 'Remote 🌐',
      period: '2022 - Present',
      description: [
        'Built and deployed 20+ personal and client projects using modern tech stacks',
        'Contributed to open-source repositories on GitHub, including profile README and tooling',
        'Explored Spring Boot, advanced JavaScript patterns, and mobile development'
      ],
      technologies: ['Next.js', 'Python', 'MongoDB', 'Spring Boot', 'GraphQL', 'Tailwind CSS'],
      type: 'work' as const
    },
    {
      title: 'Information Technology Studies',
      company: 'University / Higher Education',
      location: 'Global 🌍',
      period: '2022 - Present',
      description: [
        'Studying software engineering fundamentals, algorithms, and data structures',
        'Applying theoretical knowledge to real-world full-stack projects',
        'Participating in hackathons and coding challenges to sharpen problem-solving skills'
      ],
      technologies: ['Algorithms', 'Data Structures', 'OOP', 'Software Engineering', 'Databases'],
      type: 'education' as const
    },
    {
      title: 'Cloud & DevOps Exploration',
      company: 'Self-Directed Learning',
      location: 'Global 🌍',
      period: '2023 - Present',
      description: [
        'Deep-dived into Docker, Kubernetes and container orchestration',
        'Deployed applications on AWS using EC2, S3, and Lambda',
        'Built CI/CD pipelines with GitHub Actions for automated deployments'
      ],
      technologies: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Linux', 'Redis'],
      type: 'achievement' as const
    }
  ]

  return (
    <section id="experience" className="relative z-10 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-gradient bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            My career progression through various roles and achievements
          </p>
          <motion.a
            href="https://www.linkedin.com/in/shema-arafati-h-5baa6b395/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
            whileHover={{ x: 5 }}
          >
            View more details on LinkedIn
            <ExternalLink size={16} />
          </motion.a>
        </motion.div>

        <div className="relative">
          {/* Enhanced vertical line with glow */}
          <div className="absolute left-2 top-0 bottom-0 w-0.5">
            <div className="h-full bg-gradient-to-b from-green-400 via-blue-500 to-purple-500" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-green-400 via-blue-500 to-purple-500 blur-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          
          {experiences.map((exp, index) => (
            <TimelineItem key={index} {...exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
