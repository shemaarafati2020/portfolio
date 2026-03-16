'use client'

import { motion } from 'framer-motion'
import { 
  // Frontend Icons
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5, SiTailwindcss,
  // Backend Icons  
  SiNodedotjs, SiPython, SiMongodb, SiPostgresql, SiRedis,
  // DevOps Icons
  SiDocker, SiKubernetes, SiGit, SiGithub, SiGraphql
} from 'react-icons/si'

interface TechIconProps {
  name: string
  icon: string
  color: string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

const iconComponents: { [key: string]: any } = {
  // Frontend
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'HTML5': SiHtml5,
  'Tailwind CSS': SiTailwindcss,
  // Backend
  'Node.js': SiNodedotjs,
  'Python': SiPython,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'Redis': SiRedis,
  'REST API': SiGit, // Using Git as placeholder
  // DevOps
  'Docker': SiDocker,
  'Kubernetes': SiKubernetes,
  'AWS': null, // Will use emoji fallback
  'Git': SiGit,
  'GitHub': SiGithub,
  'GraphQL': SiGraphql,
}

const iconColors: { [key: string]: string } = {
  'React': '#61DAFB',
  'Next.js': '#000000',
  'TypeScript': '#3178C6',
  'JavaScript': '#F7DF1E',
  'HTML5': '#E34F26',
  'Tailwind CSS': '#06B6D4',
  'Node.js': '#339933',
  'Python': '#3776AB',
  'MongoDB': '#47A248',
  'PostgreSQL': '#4169E1',
  'Redis': '#DC382D',
  'REST API': '#F05032',
  'Docker': '#2496ED',
  'Kubernetes': '#326CE5',
  'AWS': '#FF9900',
  'Git': '#F05032',
  'GitHub': '#181717',
  'GraphQL': '#E10098',
}

export default function TechIcon({ 
  name, 
  icon, 
  color, 
  size = 'md', 
  animated = true,
  className = "" 
}: TechIconProps) {
  const IconComponent = iconComponents[name]
  const actualColor = iconColors[name] || '#10B981'
  
  const sizeClasses = {
    sm: 'w-6 h-6 text-lg',
    md: 'w-8 h-8 text-2xl',
    lg: 'w-12 h-12 text-3xl'
  }

  if (IconComponent) {
    return (
      <motion.div
        className={`${sizeClasses[size]} ${className} flex items-center justify-center`}
        style={{ color: actualColor }}
        whileHover={animated ? { 
          scale: 1.2, 
          rotate: 360,
          filter: 'drop-shadow(0 0 10px currentColor)'
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <IconComponent />
      </motion.div>
    )
  }

  // Fallback to emoji if no icon component found
  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} flex items-center justify-center bg-gradient-to-r ${color} bg-clip-text text-transparent`}
      whileHover={animated ? { 
        scale: 1.2, 
        rotate: 360,
        filter: 'drop-shadow(0 0 10px currentColor)'
      } : {}}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
  )
}
