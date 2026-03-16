'use client'

import { motion } from 'framer-motion'

interface GradientOrbProps {
  className?: string
  delay?: number
  duration?: number
}

export default function GradientOrb({ className = '', delay = 0, duration = 20 }: GradientOrbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{
        background: 'radial-gradient(circle, rgba(34,197,94,0.4) 0%, rgba(59,130,246,0.4) 50%, rgba(139,92,246,0.4) 100%)',
        filter: 'blur(100px)'
      }}
    />
  )
}
