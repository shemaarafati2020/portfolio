'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles } from 'lucide-react'

interface SkillBarProps {
  name: string
  level: number
  gradient: string
  glowColor: string
  delay?: number
}

const SkillBar = ({ name, level, gradient, glowColor, delay = 0 }: SkillBarProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{name}</span>
        <motion.span
          className="text-xs font-bold tabular-nums"
          style={{ color: glowColor }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 1 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1.5 bg-gray-800/80 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay }}
          className={`h-full rounded-full bg-gradient-to-r ${gradient} relative`}
          style={{ boxShadow: `0 0 12px ${glowColor}60` }}
        >
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '200%' } : {}}
            transition={{ duration: 0.8, delay: delay + 1.2, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </div>
  )
}

const skillCategories = [
  {
    title: 'Frontend',
    emoji: '⚛️',
    gradient: 'from-cyan-400 to-blue-500',
    glow: 'rgba(34,211,238,0.15)',
    glowColor: '#22d3ee',
    border: 'border-cyan-500/20 hover:border-cyan-400/50',
    headerBg: 'from-cyan-500/10 to-blue-500/10',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'JavaScript', level: 92 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'HTML5 / CSS3', level: 95 },
    ],
  },
  {
    title: 'Backend',
    emoji: '⚙️',
    gradient: 'from-green-400 to-emerald-500',
    glow: 'rgba(52,211,153,0.15)',
    glowColor: '#34d399',
    border: 'border-green-500/20 hover:border-green-400/50',
    headerBg: 'from-green-500/10 to-emerald-500/10',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'REST APIs', level: 88 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'MongoDB', level: 78 },
    ],
  },
  {
    title: 'DevOps & Cloud',
    emoji: '🚀',
    gradient: 'from-purple-400 to-indigo-500',
    glow: 'rgba(167,139,250,0.15)',
    glowColor: '#a78bfa',
    border: 'border-purple-500/20 hover:border-purple-400/50',
    headerBg: 'from-purple-500/10 to-indigo-500/10',
    skills: [
      { name: 'Docker', level: 78 },
      { name: 'AWS', level: 70 },
      { name: 'GitHub Actions', level: 75 },
      { name: 'Kubernetes', level: 65 },
      { name: 'Linux / CLI', level: 80 },
    ],
  },
]

const badges = [
  { icon: '⚡', label: 'Fast Learner' },
  { icon: '🎯', label: 'Problem Solver' },
  { icon: '🚀', label: 'Innovator' },
  { icon: '💡', label: 'Creative Thinker' },
  { icon: '🤝', label: 'Team Player' },
  { icon: '🌍', label: 'Global Mindset' },
]

export default function SkillsShowcase() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const blobY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section id="skills" ref={sectionRef} className="relative z-10 py-28 px-4 md:px-8 overflow-hidden">

      {/* Parallax background */}
      <motion.div style={{ y: blobY }} className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-cyan-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-500/4 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-green-400/10 text-green-400 border border-green-400/30 mb-5 tracking-widest uppercase"
          >
            <Sparkles size={12} /> Skills
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Technical{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Expertise</span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : {}}
                transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
              />
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Full-stack capabilities spanning modern frontend frameworks, backend APIs, databases, and cloud infrastructure.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative bg-gray-900/70 backdrop-blur-sm rounded-2xl border ${cat.border} p-6 transition-all duration-300 group overflow-hidden`}
              style={{ boxShadow: `0 0 0 0 ${cat.glow}` }}
            >
              {/* Hover glow */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${cat.headerBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`}
              />

              {/* Animated corner ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-6 -right-6 w-20 h-20 border border-current opacity-5 rounded-full"
                style={{ color: cat.glowColor }}
              />

              {/* Header */}
              <div className="relative flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: ci * 0.4 }}
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.headerBg} border border-current flex items-center justify-center text-lg`}
                  style={{ borderColor: `${cat.glowColor}30` }}
                >
                  {cat.emoji}
                </motion.div>
                <div>
                  <span className={`text-sm font-bold bg-gradient-to-r ${cat.gradient} bg-clip-text text-transparent`}>
                    {cat.title}
                  </span>
                  <p className="text-[11px] text-gray-500">{cat.skills.length} skills</p>
                </div>
                {/* Animated dot */}
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: ci * 0.3 }}
                  className="ml-auto w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.glowColor }}
                />
              </div>

              {/* Skill bars */}
              <div className="relative space-y-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    gradient={cat.gradient}
                    glowColor={cat.glowColor}
                    delay={ci * 0.15 + si * 0.1 + 0.3}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.07, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.1, y: -4 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900/60 backdrop-blur-sm rounded-full border border-gray-700/80 hover:border-green-400/50 hover:bg-gray-800/60 transition-all cursor-default"
            >
              <span className="text-base">{badge.icon}</span>
              <span className="text-sm text-gray-300 font-medium">{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
