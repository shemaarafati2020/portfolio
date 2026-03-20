'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Linkedin, ExternalLink, MapPin, Briefcase, GraduationCap, TrendingUp, Eye, Users, ThumbsUp, MessageSquare, Share2, Award } from 'lucide-react'

const LI_URL = 'https://www.linkedin.com/in/shema-arafati-h-5baa6b395/'

// Real LinkedIn impressions / engagement data (updated manually from LinkedIn analytics)
const impressions = [
  { icon: Eye,          label: 'Profile Views',    value: '1.2K+', sub: 'last 90 days',  color: 'text-blue-400',   bg: 'bg-blue-400/10'   },
  { icon: TrendingUp,   label: 'Search Appearances', value: '340+', sub: 'last 7 days',  color: 'text-green-400',  bg: 'bg-green-400/10'  },
  { icon: Users,        label: 'Connections',       value: '200+',  sub: '1st-degree',    color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { icon: ThumbsUp,     label: 'Post Reactions',    value: '85+',   sub: 'total',         color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { icon: MessageSquare,label: 'Comments',          value: '30+',   sub: 'on posts',      color: 'text-pink-400',   bg: 'bg-pink-400/10'   },
  { icon: Share2,       label: 'Post Impressions',  value: '5K+',   sub: 'total reach',   color: 'text-cyan-400',   bg: 'bg-cyan-400/10'   },
]

const experience = [
  {
    title: 'Software Engineer Intern',
    company: 'SKillArc Corporation',
    duration: '2023 — Present',
    desc: 'Building full-stack web apps, REST APIs, and cloud-native solutions.',
    color: 'border-blue-500/40',
    dot: 'bg-blue-400',
  },
  {
    title: 'Freelance Full-Stack Developer',
    company: 'Self-Employed',
    duration: '2022 — Present',
    desc: 'Delivering custom web solutions across React, Node.js, and PostgreSQL.',
    color: 'border-green-500/40',
    dot: 'bg-green-400',
  },
]

const skills = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
  'Docker', 'PostgreSQL', 'MongoDB', 'AWS', 'Tailwind CSS',
  'Spring Boot', 'GraphQL', 'Git', 'Linux',
]

export default function LinkedInProfileCard() {
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-gray-950/80 backdrop-blur-xl rounded-2xl border border-gray-800 hover:border-blue-400/40 transition-all overflow-hidden group"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
      {/* Top accent bar */}
      <div className="h-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 w-full" />

      {/* LinkedIn cover-style header */}
      <div className="relative h-20 bg-gradient-to-r from-blue-900/60 via-blue-800/40 to-indigo-900/60 overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,#3b82f6 0,#3b82f6 1px,transparent 0,transparent 50%)', backgroundSize: '12px 12px' }} />
        <motion.div
          animate={{ x: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-2 right-8 w-16 h-16 rounded-full bg-blue-400/10 blur-xl"
        />
      </div>

      <div className="px-6 pb-6 -mt-8 space-y-5">
        {/* Avatar + name */}
        <div className="flex items-end justify-between">
          <motion.div
            whileHover={{ scale: 1.06 }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 border-4 border-gray-950 flex items-center justify-center shadow-xl shadow-blue-500/30"
          >
            <Linkedin size={28} className="text-white" />
          </motion.div>
          <motion.a
            href={LI_URL}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs text-white font-semibold transition-all shadow-lg shadow-blue-500/20"
          >
            <ExternalLink size={12} /> View Profile
          </motion.a>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white">SHEMA ARAFAT H.</h3>
          <p className="text-sm text-blue-400 font-medium">Software Engineer & IT Student</p>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <MapPin size={11} /> Kigali, Rwanda · SKillArc Corporation
          </p>
        </div>

        {/* Impressions grid */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <TrendingUp size={11} className="text-blue-400" /> Analytics & Impressions
          </p>
          <div className="grid grid-cols-3 gap-2">
            {impressions.map(({ icon: Icon, label, value, sub, color, bg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.07, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -4, scale: 1.04 }}
                className={`${bg} rounded-xl p-3 border border-white/5 text-center`}
              >
                <Icon size={14} className={`${color} mx-auto mb-1`} />
                <div className={`text-sm font-black ${color}`}>{value}</div>
                <div className="text-[9px] text-gray-500 leading-tight">{label}</div>
                <div className="text-[9px] text-gray-600">{sub}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Briefcase size={11} className="text-blue-400" /> Experience
          </p>
          <div className="space-y-3">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.1 }}
                className={`relative pl-4 border-l-2 ${exp.color}`}
              >
                <span className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${exp.dot}`} />
                <p className="text-sm font-semibold text-white">{exp.title}</p>
                <p className="text-xs text-blue-400">{exp.company}</p>
                <p className="text-[10px] text-gray-500 mb-1">{exp.duration}</p>
                <p className="text-xs text-gray-400">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <GraduationCap size={11} className="text-blue-400" /> Education
          </p>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="relative pl-4 border-l-2 border-purple-500/40"
          >
            <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-purple-400" />
            <p className="text-sm font-semibold text-white">Bachelor of Science in IT</p>
            <p className="text-xs text-blue-400">SKillArc University · In Progress</p>
            <p className="text-[10px] text-gray-500">2022 — Present</p>
          </motion.div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Award size={11} className="text-blue-400" /> Top Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.03, type: 'spring', stiffness: 220 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-2.5 py-1 bg-gray-900/70 text-[11px] text-gray-300 rounded-full border border-gray-700 hover:border-blue-400/60 hover:text-blue-400 transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
