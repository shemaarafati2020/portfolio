'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, Code2, Server, Cloud, Shield, Database, Cpu } from 'lucide-react'

/* ─── Marquee data ─── */
const MARQUEE_ROWS: { label: string; icon: string; color: string }[][] = [
  [
    { label: 'React', icon: '⚛️', color: '#61dafb' },
    { label: 'Next.js', icon: '▲', color: '#e2e8f0' },
    { label: 'TypeScript', icon: '📘', color: '#3178c6' },
    { label: 'JavaScript', icon: '🟨', color: '#f7df1e' },
    { label: 'Tailwind', icon: '🎨', color: '#38bdf8' },
    { label: 'HTML5', icon: '🌐', color: '#e34c26' },
    { label: 'CSS3', icon: '💅', color: '#264de4' },
    { label: 'Redux', icon: '🔮', color: '#764abc' },
    { label: 'Vite', icon: '⚡', color: '#646cff' },
    { label: 'GraphQL', icon: '◈', color: '#e10098' },
  ],
  [
    { label: 'Node.js', icon: '🟢', color: '#68a063' },
    { label: 'Python', icon: '🐍', color: '#3572A5' },
    { label: 'Spring Boot', icon: '🍃', color: '#6db33f' },
    { label: 'MongoDB', icon: '🍃', color: '#47a248' },
    { label: 'PostgreSQL', icon: '🐘', color: '#336791' },
    { label: 'Redis', icon: '🔴', color: '#dc382d' },
    { label: 'REST API', icon: '🔌', color: '#a78bfa' },
    { label: 'Socket.io', icon: '🔁', color: '#e2e8f0' },
    { label: 'Express', icon: '🚂', color: '#d4d4d8' },
    { label: 'MySQL', icon: '🗄️', color: '#00758f' },
  ],
  [
    { label: 'Docker', icon: '🐳', color: '#2496ed' },
    { label: 'Kubernetes', icon: '☸️', color: '#326ce5' },
    { label: 'AWS', icon: '☁️', color: '#ff9900' },
    { label: 'Oracle Cloud', icon: '🔵', color: '#f80000' },
    { label: 'Git', icon: '📦', color: '#f05032' },
    { label: 'Linux', icon: '🐧', color: '#f7df1e' },
    { label: 'CI/CD', icon: '🔄', color: '#4ade80' },
    { label: 'Nginx', icon: '🌿', color: '#009900' },
    { label: 'Terraform', icon: '🏗️', color: '#7b42bc' },
    { label: 'Prometheus', icon: '📊', color: '#e6522c' },
  ],
]

function MarqueeRow({ items, reverse = false, speed = 35 }: { items: typeof MARQUEE_ROWS[0]; reverse?: boolean; speed?: number }) {
  const doubled = [...items, ...items]
  const duration = speed

  return (
    <div className="relative overflow-hidden py-1.5 group">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020610] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020610] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
      >
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/8 bg-white/4 backdrop-blur-sm hover:border-white/20 hover:bg-white/8 transition-all cursor-default flex-shrink-0"
            style={{ boxShadow: `0 0 12px ${tech.color}15` }}
          >
            <span className="text-base leading-none">{tech.icon}</span>
            <span className="text-xs font-semibold text-gray-300 whitespace-nowrap">{tech.label}</span>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: tech.color }} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* ─── Skill bar ─── */
interface SkillBarProps {
  name: string; level: number; gradient: string; glowColor: string; delay?: number
}
const SkillBar = ({ name, level, gradient, glowColor, delay = 0 }: SkillBarProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="group">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{name}</span>
        <motion.span className="text-xs font-bold tabular-nums" style={{ color: glowColor }}
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: delay + 1 }}>
          {level}%
        </motion.span>
      </div>
      <div className="h-2 bg-gray-800/80 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1], delay }}
          className={`h-full rounded-full bg-gradient-to-r ${gradient} relative`}
          style={{ boxShadow: `0 0 14px ${glowColor}70` }}
        >
          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent rounded-full"
            initial={{ x: '-100%' }} animate={isInView ? { x: '200%' } : {}}
            transition={{ duration: 0.9, delay: delay + 1.3, ease: 'easeInOut' }} />
        </motion.div>
      </div>
    </div>
  )
}

/* ─── Category data ─── */
const skillCategories = [
  {
    title: 'Frontend', Icon: Code2,
    gradient: 'from-cyan-400 to-blue-500', glow: 'rgba(34,211,238,0.15)', glowColor: '#22d3ee',
    border: 'border-cyan-500/25 hover:border-cyan-400/60', headerBg: 'from-cyan-500/10 to-blue-500/10',
    skills: [
      { name: 'React / Next.js', level: 95 }, { name: 'TypeScript', level: 90 },
      { name: 'JavaScript', level: 92 }, { name: 'Tailwind CSS', level: 90 },
      { name: 'HTML5 / CSS3', level: 95 },
    ],
  },
  {
    title: 'Backend & DB', Icon: Database,
    gradient: 'from-green-400 to-emerald-500', glow: 'rgba(52,211,153,0.15)', glowColor: '#34d399',
    border: 'border-green-500/25 hover:border-green-400/60', headerBg: 'from-green-500/10 to-emerald-500/10',
    skills: [
      { name: 'Node.js / Express', level: 85 }, { name: 'Python', level: 80 },
      { name: 'Spring Boot', level: 78 }, { name: 'MongoDB', level: 88 },
      { name: 'PostgreSQL', level: 75 },
    ],
  },
  {
    title: 'DevOps & Cloud', Icon: Cloud,
    gradient: 'from-purple-400 to-indigo-500', glow: 'rgba(167,139,250,0.15)', glowColor: '#a78bfa',
    border: 'border-purple-500/25 hover:border-purple-400/60', headerBg: 'from-purple-500/10 to-indigo-500/10',
    skills: [
      { name: 'Docker', level: 78 }, { name: 'AWS / Oracle Cloud', level: 72 },
      { name: 'CI/CD (GitHub Actions)', level: 75 }, { name: 'Kubernetes', level: 65 },
      { name: 'Linux / CLI', level: 82 },
    ],
  },
  {
    title: 'AI & Security', Icon: Shield,
    gradient: 'from-rose-400 to-orange-500', glow: 'rgba(251,113,133,0.15)', glowColor: '#fb7185',
    border: 'border-rose-500/25 hover:border-rose-400/60', headerBg: 'from-rose-500/10 to-orange-500/10',
    skills: [
      { name: 'RAG / Vector Search', level: 75 }, { name: 'MongoDB AI', level: 80 },
      { name: 'Cybersecurity Basics', level: 72 }, { name: 'AI Literacy (IBM)', level: 78 },
      { name: 'REST / GraphQL APIs', level: 88 },
    ],
  },
]

const badges = [
  { icon: '⚡', label: 'Fast Learner' }, { icon: '🎯', label: 'Problem Solver' },
  { icon: '🚀', label: 'Innovator' }, { icon: '💡', label: 'Creative Thinker' },
  { icon: '🤝', label: 'Team Player' }, { icon: '🌍', label: 'Global Mindset' },
  { icon: '🔐', label: 'Security Aware' }, { icon: '🧠', label: 'AI Enthusiast' },
]

export default function SkillsShowcase() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const blobY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="skills" ref={sectionRef} className="relative z-10 py-28 px-4 md:px-8 overflow-hidden">

      {/* Parallax blobs */}
      <motion.div style={{ y: blobY }} className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-green-500/3 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-green-400/10 text-green-400 border border-green-400/30 mb-5 tracking-widest uppercase"
          >
            <Sparkles size={12} /> Skills & Tools
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black mb-4 leading-none">
            Technical{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Arsenal
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                initial={{ width: 0 }} animate={inView ? { width: '100%' } : {}}
                transition={{ delay: 0.7, duration: 0.9 }}
              />
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Full-stack capabilities spanning modern frameworks, AI integrations, databases, and cloud infrastructure — all backed by real certifications.
          </p>
        </motion.div>

        {/* ── Infinite Marquee ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-20 space-y-3"
        >
          <MarqueeRow items={MARQUEE_ROWS[0]} speed={40} />
          <MarqueeRow items={MARQUEE_ROWS[1]} reverse speed={45} />
          <MarqueeRow items={MARQUEE_ROWS[2]} speed={38} />
        </motion.div>

        {/* ── Skill categories ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-14">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.12 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative bg-gray-900/70 backdrop-blur-sm rounded-2xl border ${cat.border} p-6 transition-all duration-300 group overflow-hidden cursor-default`}
            >
              {/* hover bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.headerBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`} />
              {/* corner spinner */}
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-8 -right-8 w-24 h-24 border border-current opacity-5 rounded-full"
                style={{ color: cat.glowColor }} />

              {/* header */}
              <div className="relative flex items-center gap-3 mb-6">
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: ci * 0.4 }}
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.headerBg} border flex items-center justify-center`}
                  style={{ borderColor: `${cat.glowColor}35` }}>
                  <cat.Icon size={18} style={{ color: cat.glowColor }} />
                </motion.div>
                <div>
                  <span className={`text-sm font-bold bg-gradient-to-r ${cat.gradient} bg-clip-text text-transparent`}>{cat.title}</span>
                  <p className="text-[11px] text-gray-500">{cat.skills.length} skills</p>
                </div>
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: ci * 0.3 }}
                  className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: cat.glowColor }} />
              </div>

              {/* bars */}
              <div className="relative space-y-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level}
                    gradient={cat.gradient} glowColor={cat.glowColor}
                    delay={ci * 0.15 + si * 0.1 + 0.4} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Trait badges ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }} className="flex flex-wrap justify-center gap-3">
          {badges.map((badge, i) => (
            <motion.div key={badge.label}
              initial={{ opacity: 0, scale: 0.6 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + i * 0.07, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.12, y: -5 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900/60 backdrop-blur-sm rounded-full border border-gray-700/80 hover:border-green-400/50 hover:bg-gray-800/60 hover:shadow-green-400/10 hover:shadow-lg transition-all cursor-default">
              <span className="text-base">{badge.icon}</span>
              <span className="text-sm text-gray-300 font-medium">{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
