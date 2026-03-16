'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { MapPin, Mail, Linkedin, Github, Code2, Globe, Zap, Target, Sparkles } from 'lucide-react'

const stats = [
  { value: '3+', label: 'Years Experience', icon: '🚀', color: 'from-green-400 to-emerald-500' },
  { value: '20+', label: 'Projects Built', icon: '💻', color: 'from-blue-400 to-cyan-500' },
  { value: '10+', label: 'Certifications', icon: '🏆', color: 'from-purple-400 to-pink-500' },
  { value: '∞', label: 'Learning Drive', icon: '📚', color: 'from-yellow-400 to-orange-500' },
]

const values = [
  { icon: Code2, title: 'Clean Code', desc: 'Maintainable, scalable code is a priority in every project.', color: 'text-green-400', bg: 'bg-green-400/10', border: 'hover:border-green-400/40' },
  { icon: Globe, title: 'Accessibility', desc: 'Making technology accessible to all people everywhere.', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'hover:border-blue-400/40' },
  { icon: Zap, title: 'Performance', desc: 'Optimising for speed and efficiency in every solution.', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'hover:border-yellow-400/40' },
  { icon: Target, title: 'Impact', desc: 'Building solutions that make a meaningful difference.', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'hover:border-purple-400/40' },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const STAGGER = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } },
  item: {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  },
}

export default function AboutSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const blobY = useTransform(scrollYProgress, [0, 1], [-40, 40])

  return (
    <section id="about" ref={sectionRef} className="relative z-10 py-28 px-4 md:px-8 overflow-hidden">

      {/* Parallax ambient blobs */}
      <motion.div style={{ y: blobY }} className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-green-400/10 text-green-400 border border-green-400/30 mb-5 tracking-widest uppercase"
          >
            <Sparkles size={12} /> About Me
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            Who I{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">Am</span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : {}}
                transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </h2>
        </motion.div>

        {/* Bio + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-24">

          {/* Bio text */}
          <motion.div
            variants={STAGGER.container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="space-y-5"
          >
            {[
              <>I&apos;m <span className="text-white font-semibold">HATEGEKIMANA SHEMA ARAFAT</span>, a Software Engineer &amp; IT Student at{' '}<span className="text-green-400 font-semibold">SKillArc Corporation</span>. Passionate about building impactful solutions that bridge complex technology and everyday users.</>,
              <>Expertise spanning full-stack development, cloud computing, and DevOps — building scalable, performant applications. My goal: make technology accessible to all.</>,
              <>Currently exploring <span className="text-blue-400 font-medium">Spring Boot</span> and{' '}<span className="text-blue-400 font-medium">Advanced JavaScript</span> patterns while deepening cloud and DevOps expertise.</>,
            ].map((text, i) => (
              <motion.p key={i} variants={STAGGER.item} className="text-base md:text-lg text-gray-300 leading-relaxed">
                {text}
              </motion.p>
            ))}

            <motion.div variants={STAGGER.item} className="flex flex-wrap gap-3 pt-1">
              {[
                { icon: MapPin, text: 'Global 🌍' },
                { icon: Mail, text: 'Open to opportunities' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 px-4 py-2 bg-gray-900/60 rounded-full border border-gray-800 text-gray-300 text-sm">
                  <Icon className="text-green-400" size={15} />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={STAGGER.item} className="flex gap-3 pt-1">
              {[
                { href: 'https://www.linkedin.com/in/shema-arafati-h-5baa6b395/', Icon: Linkedin, label: 'LinkedIn', className: 'bg-blue-600 hover:bg-blue-500 text-white' },
                { href: 'https://github.com/shemaarafati2020/shemaarafati2020', Icon: Github, label: 'GitHub', className: 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700' },
              ].map(({ href, Icon, label, className }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${className}`}
                >
                  <Icon size={17} /> {label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            variants={STAGGER.container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={STAGGER.item}
                whileHover={{ y: -6, scale: 1.03 }}
                className="relative overflow-hidden bg-gray-900/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 text-center group transition-all cursor-default"
              >
                {/* Glow on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
                />
                <div className="text-3xl mb-3">{stat.icon}</div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                  className={`text-4xl font-black mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Values grid */}
        <motion.div
          variants={STAGGER.container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={STAGGER.item}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative overflow-hidden bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 ${v.border} transition-all group cursor-default`}
            >
              {/* Animated corner accent */}
              <motion.div
                className={`absolute top-0 right-0 w-16 h-16 ${v.bg} rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className={`w-12 h-12 ${v.bg} rounded-xl flex items-center justify-center mb-4 transition-all`}
              >
                <v.icon className={v.color} size={22} />
              </motion.div>
              <h3 className="text-white font-bold mb-2 text-base">{v.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
