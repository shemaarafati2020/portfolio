'use client'

import { motion } from 'framer-motion'

interface TechBubbleProps {
  name: string
  icon: string
  delay: number
  duration?: number
  xPos?: number
}

const TechBubble = ({ name, icon, delay, duration = 8, xPos = 50 }: TechBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: `${xPos}%` }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        y: [0, -100, -200, -300],
        rotate: [0, 10, -10, 0],
        x: [`${xPos}%`, `${xPos + 10}%`, `${xPos - 10}%`, `${xPos}%`]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut"
      }}
      className="absolute flex items-center gap-2 px-3 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 hover:border-green-400 transition-colors cursor-pointer whitespace-nowrap"
      whileHover={{ 
        scale: 1.2, 
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)'
      }}
    >
      <motion.span 
        className="text-lg"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      >
        {icon}
      </motion.span>
      <span className="text-xs text-gray-300">{name}</span>
    </motion.div>
  )
}

export default function TechBubbles() {
  const additionalTech = [
    { name: 'Vue.js', icon: '💚', xPos: 10 },
    { name: 'Angular', icon: '🔺', xPos: 20 },
    { name: 'Svelte', icon: '🔥', xPos: 30 },
    { name: 'Rust', icon: '🦀', xPos: 40 },
    { name: 'Go', icon: '🐹', xPos: 50 },
    { name: 'Swift', icon: '🍎', xPos: 60 },
    { name: 'Flutter', icon: '🦋', xPos: 70 },
    { name: 'Firebase', icon: '🔥', xPos: 80 },
    { name: 'Supabase', icon: '🟢', xPos: 90 },
    { name: 'Vercel', icon: '▲', xPos: 15 },
    { name: 'Netlify', icon: '🟦', xPos: 85 },
    { name: 'Figma', icon: '🎨', xPos: 45 },
  ]

  return (
    <div className="relative h-96 overflow-hidden pointer-events-none">
      {additionalTech.map((tech, index) => (
        <TechBubble
          key={tech.name}
          name={tech.name}
          icon={tech.icon}
          delay={index * 0.5}
          duration={8 + Math.random() * 4}
          xPos={tech.xPos}
        />
      ))}
    </div>
  )
}
