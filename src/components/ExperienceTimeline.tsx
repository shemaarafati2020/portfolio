'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'

interface TimelineItemProps {
  title: string
  company: string
  location: string
  period: string
  description: string[]
  technologies: string[]
  index: number
}

const TimelineItem = ({ title, company, location, period, description, technologies, index }: TimelineItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative flex items-start gap-8 mb-12 group"
    >
      {/* Timeline line */}
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: index * 0.2 + 0.3 }}
          className="w-4 h-4 bg-green-400 rounded-full border-4 border-black shadow-lg shadow-green-400/50"
        />
        {index < 3 && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-green-400 to-transparent" />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.2 + 0.2 }}
        className="flex-1 bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-green-400/50 transition-all group-hover:shadow-lg group-hover:shadow-green-400/10"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
              {title}
            </h3>
            <p className="text-green-400 font-semibold">{company}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <Calendar size={14} />
              {period}
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin size={14} />
              {location}
            </div>
          </div>
        </div>

        <ul className="space-y-2 mb-4">
          {description.map((point, idx) => (
            <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
              <span className="text-green-400 mt-1">▸</span>
              {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-800 text-xs text-green-400 rounded border border-green-400/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ExperienceTimeline() {
  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovation Inc.',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      description: [
        'Led development of microservices architecture serving 1M+ users',
        'Reduced API response time by 60% through optimization',
        'Mentored junior developers and conducted code reviews'
      ],
      technologies: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Docker']
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      location: 'New York, NY',
      period: '2020 - 2022',
      description: [
        'Built and maintained 10+ client projects using modern tech stack',
        'Implemented CI/CD pipelines reducing deployment time by 40%',
        'Collaborated with UX team to improve user engagement by 35%'
      ],
      technologies: ['Vue.js', 'Python', 'MongoDB', 'Kubernetes', 'Jenkins']
    },
    {
      title: 'Frontend Developer',
      company: 'Creative Agency Co.',
      location: 'Austin, TX',
      period: '2018 - 2020',
      description: [
        'Developed responsive web applications for various clients',
        'Improved website performance scores by 45%',
        'Created reusable component libraries'
      ],
      technologies: ['React', 'TypeScript', 'SASS', 'Webpack', 'Git']
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Hub',
      location: 'Remote',
      period: '2017 - 2018',
      description: [
        'Assisted in development of MVP for fintech startup',
        'Participated in agile development process',
        'Learned and implemented best practices in code quality'
      ],
      technologies: ['JavaScript', 'HTML/CSS', 'React', 'Node.js', 'MongoDB']
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
          <p className="text-gray-400 max-w-2xl mx-auto">
            My career progression through various roles and companies
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-blue-500 to-purple-500" />
          
          {experiences.map((exp, index) => (
            <TimelineItem key={index} {...exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
