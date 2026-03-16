'use client'

import { motion } from 'framer-motion'
import TechIcon from './TechIcon'

interface TechBubbleProps {
  name: string
  icon: string
  color: string
  size?: number
  delay?: number
  duration?: number
}

export default function TechBubble({ 
  name, 
  icon, 
  color, 
  size = 60, 
  delay = 0, 
  duration = 20 
}: TechBubbleProps) {
  return (
    <motion.div
      className="absolute"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0.8, 1],
        scale: [0, 1, 1.1, 1],
        rotate: [0, 180, 360]
      }}
      transition={{ 
        opacity: { duration: 2, delay, repeat: Infinity, repeatDelay: 3 },
        scale: { duration: 4, delay, repeat: Infinity, repeatDelay: 2 },
        rotate: { duration, delay, repeat: Infinity, ease: "linear" }
      }}
      whileHover={{ 
        scale: 1.3, 
        zIndex: 50,
        filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.6))'
      }}
    >
      <div className="relative w-full h-full group cursor-pointer">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r opacity-20 blur-xl"
          style={{
            background: `linear-gradient(135deg, ${color.split(' ')[0].replace('from-', '')}, ${color.split(' ')[1].replace('to-', '')})`
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Main bubble */}
        <motion.div
          className="relative w-full h-full rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center group-hover:border-green-400/50 transition-colors"
          whileHover={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderColor: 'rgba(16, 185, 129, 0.5)'
          }}
        >
          <TechIcon 
            name={name} 
            icon={icon} 
            color={color}
            size="sm"
          />
        </motion.div>
        
        {/* Tooltip */}
        <motion.div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
          initial={{ y: 5 }}
          whileHover={{ y: 0 }}
        >
          {name}
        </motion.div>
      </div>
    </motion.div>
  )
}
