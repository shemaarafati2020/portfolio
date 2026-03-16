'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

export default function ProjectsSection() {
  const projects = [
    {
      title: 'Project One',
      description: 'A full-stack web application built with modern technologies. Features include user authentication, real-time updates, and responsive design.',
      tech: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
      github: '#',
      demo: '#',
      image: '/project1.jpg'
    },
    {
      title: 'Project Two',
      description: 'Mobile-first progressive web app with offline capabilities. Optimized for performance and accessibility.',
      tech: ['Next.js', 'TypeScript', 'PWA', 'Firebase'],
      github: '#',
      demo: '#',
      image: '/project2.jpg'
    },
    {
      title: 'Project Three',
      description: 'AI-powered application that leverages machine learning to provide intelligent solutions and insights.',
      tech: ['Python', 'TensorFlow', 'React', 'AWS'],
      github: '#',
      demo: '#',
      image: '/project3.jpg'
    }
  ]

  return (
    <section id="projects" className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Featured <span className="text-green-400">Projects</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-green-400 transition-all group"
            >
              <div className="relative h-48 bg-gradient-to-br from-green-900/20 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-green-400/20 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🚀</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a 
                    href={project.github}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href={project.demo}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-gray-800 text-green-400 text-sm rounded-full border border-green-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-black transition-all font-semibold">
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  )
}
