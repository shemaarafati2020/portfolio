'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Star, GitBranch, Eye } from 'lucide-react'
import Image from 'next/image'

interface ProjectCardProps {
  title: string
  description: string
  tech: string[]
  github: string
  demo: string
  stars: number
  forks: number
  watchers: number
  index: number
}

const ProjectCard = ({ title, description, tech, github, demo, stars, forks, watchers, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-green-400/50 transition-all"
    >
      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-blue-400/5"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        {/* Animated pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500" 
               style={{ 
                 backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
               }} />
        </div>
        
        {/* Project icon with animation */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Github size={40} className="text-green-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Stats overlay */}
        <motion.div
          className="absolute top-4 right-4 flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
            <Star size={12} className="text-yellow-400" />
            <span className="text-xs text-gray-300">{stars}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
            <GitBranch size={12} className="text-blue-400" />
            <span className="text-xs text-gray-300">{forks}</span>
          </div>
        </motion.div>
      </div>
      
      <div className="relative p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-2 text-sm">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((techItem, techIndex) => (
            <motion.span
              key={techIndex}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2 + techIndex * 0.05 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-2 py-1 bg-gray-800 text-xs text-green-400 rounded-full border border-green-400/20"
            >
              {techItem}
            </motion.span>
          ))}
        </div>

        <div className="flex gap-3">
          <motion.a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={16} />
            <span className="text-sm">Code</span>
          </motion.a>
          <motion.a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-black rounded-lg font-semibold transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={16} />
            <span className="text-sm">Demo</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

export default function EnhancedProjectsSection() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
      tech: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind'],
      github: 'https://github.com/shemaarafati2020/shemaarafati2020',
      demo: '#',
      stars: 245,
      forks: 89,
      watchers: 32
    },
    {
      title: 'AI Chat Application',
      description: 'Real-time chat application powered by AI with sentiment analysis, language translation, and smart replies.',
      tech: ['React', 'Node.js', 'OpenAI', 'Socket.io', 'MongoDB'],
      github: 'https://github.com/shemaarafati2020/shemaarafati2020',
      demo: '#',
      stars: 189,
      forks: 67,
      watchers: 28
    },
    {
      title: 'Task Management System',
      description: 'Collaborative project management tool with Kanban boards, team collaboration, and advanced analytics.',
      tech: ['Vue.js', 'Python', 'Django', 'Redis', 'Docker'],
      github: 'https://github.com/shemaarafati2020/shemaarafati2020',
      demo: '#',
      stars: 156,
      forks: 45,
      watchers: 21
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management with real-time data visualization and reporting.',
      tech: ['React', 'D3.js', 'Express', 'MySQL', 'Chart.js'],
      github: 'https://github.com/shemaarafati2020/shemaarafati2020',
      demo: '#',
      stars: 203,
      forks: 78,
      watchers: 35
    },
    {
      title: 'Video Streaming Platform',
      description: 'Scalable video streaming service with adaptive bitrate, live streaming, and content recommendations.',
      tech: ['Next.js', 'AWS', 'FFmpeg', 'WebRTC', 'PostgreSQL'],
      github: 'https://github.com/shemaarafati2020/shemaarafati2020',
      demo: '#',
      stars: 312,
      forks: 98,
      watchers: 41
    },
    {
      title: 'Blockchain Wallet',
      description: 'Secure cryptocurrency wallet with multi-chain support, DeFi integration, and hardware wallet compatibility.',
      tech: ['React', 'Web3.js', 'Ethereum', 'Node.js', 'TypeScript'],
      github: 'https://github.com/shemaarafati2020/shemaarafati2020',
      demo: '#',
      stars: 278,
      forks: 112,
      watchers: 38
    }
  ]

  return (
    <section id="projects" className="relative z-10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Explore my latest work and open-source contributions
          </p>
          <motion.a
            href="https://github.com/shemaarafati2020/shemaarafati2020"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
            whileHover={{ x: 5 }}
          >
            View all repositories on GitHub
            <ExternalLink size={16} />
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>

        {/* View all projects button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/shemaarafati2020/shemaarafati2020"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-black transition-all font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
