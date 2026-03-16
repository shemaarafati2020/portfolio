'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Github, Linkedin, Twitter, Mail, Download, Menu, X, Code, ArrowDown } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import EnhancedProjectsSection from '@/components/EnhancedProjectsSection'
import ContactSection from '@/components/ContactSection'
import AnimatedBackground from '@/components/AnimatedBackground'
import FloatingParticles from '@/components/FloatingParticles'
import AnimatedText from '@/components/AnimatedText'
import MagneticButton from '@/components/MagneticButton'
import GradientOrb from '@/components/GradientOrb'
import SkillsShowcase from '@/components/SkillsShowcase'
import EnhancedExperienceTimeline from '@/components/EnhancedExperienceTimeline'
import Testimonials from '@/components/Testimonials'
import CertificatesSection from '@/components/CertificatesSection'
import GitHubProfileCard from '@/components/GitHubProfileCard'
import LinkedInProfileCard from '@/components/LinkedInProfileCard'
import CertificateAdmin from '@/components/CertificateAdmin'
import TypingAnimation from '@/components/TypingAnimation'
import TechIcon from '@/components/TechIcon'
import AIAssistant from '@/components/AIAssistant'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    
    // Check for admin mode
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('admin') === 'true' || localStorage.getItem('admin-mode') === 'true') {
      setIsAdmin(true)
    }
  }, [])

  if (!mounted) return null

  const techIcons = {
    frontend: [
      { name: 'React', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
      { name: 'Next.js', icon: '▲', color: 'from-gray-100 to-gray-300' },
      { name: 'TypeScript', icon: '📘', color: 'from-blue-400 to-blue-600' },
      { name: 'JavaScript', icon: '🟨', color: 'from-yellow-300 to-yellow-500' },
      { name: 'HTML5', icon: '📱', color: 'from-orange-400 to-orange-600' },
      { name: 'Tailwind CSS', icon: '🎨', color: 'from-cyan-400 to-teal-500' },
    ],
    backend: [
      { name: 'Node.js', icon: '🟢', color: 'from-green-400 to-green-600' },
      { name: 'Python', icon: '🐍', color: 'from-yellow-400 to-green-500' },
      { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-green-700' },
      { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-700 to-blue-900' },
      { name: 'Redis', icon: '🔴', color: 'from-red-500 to-red-700' },
      { name: 'REST API', icon: '🔌', color: 'from-purple-400 to-purple-600' },
    ],
    devops: [
      { name: 'Docker', icon: '🐳', color: 'from-blue-500 to-cyan-500' },
      { name: 'Kubernetes', icon: '☸️', color: 'from-blue-600 to-blue-800' },
      { name: 'AWS', icon: '☁️', color: 'from-orange-400 to-red-500' },
      { name: 'Git', icon: '📦', color: 'from-orange-500 to-red-600' },
      { name: 'GitHub', icon: '🐙', color: 'from-gray-700 to-gray-900' },
      { name: 'GraphQL', icon: '◈', color: 'from-pink-400 to-pink-600' },
    ]
  }

  const getCirclePosition = (index: number, total: number, radius: number) => {
    const angle = (index * 360 / total) * (Math.PI / 180)
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    }
  }

  const bioTexts = [
    "Building impactful & innovative solutions",
    "Expert in Full-Stack Development",
    "Exploring Cloud & DevOps technologies",
    "Making tech accessible to all",
    "Passionate about clean code & best practices",
    "Always learning, always growing"
  ]

  const navItems = [
    { label: 'Home',         id: 'home' },
    { label: 'Skills',       id: 'skills' },
    { label: 'Experience',   id: 'experience' },
    { label: 'About',        id: 'about' },
    { label: 'Projects',     id: 'projects' },
    { label: 'Certs',        id: 'certificates' },
    { label: 'Contact',      id: 'contact' },
  ]

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Advanced Background Effects */}
      <AnimatedBackground />
      <FloatingParticles />
      
      {/* Gradient Orbs */}
      <GradientOrb className="top-20 left-20 w-96 h-96" delay={0} duration={25} />
      <GradientOrb className="bottom-20 right-20 w-96 h-96" delay={5} duration={30} />
      <GradientOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" delay={10} duration={35} />
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-purple-900/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 backdrop-blur-md bg-black/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => scrollTo('home')}
            className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent shrink-0"
          >
            SA
          </motion.button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="relative px-3 py-1.5 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Desktop right controls */}
          <div className="hidden md:flex items-center gap-2">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-800/60 hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5 px-4 py-2 text-sm border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-black transition-all font-medium"
            >
              <Download size={14} /> Resume
            </motion.a>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-800/60 hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-800/60 hover:bg-gray-700 transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 pt-3 pb-4 px-2 border-t border-white/5 mt-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="text-left px-4 py-2.5 text-sm text-gray-300 hover:text-green-400 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="mt-2 flex items-center gap-2 px-4 py-2.5 text-sm border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-black transition-all"
                >
                  <Download size={14} /> Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section id="home" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-20 pb-16">
        <div className="w-full max-w-6xl mx-auto">

          {/* ── Top: profile + intro ── */}
          <div className="flex flex-col items-center text-center gap-6 mb-12">

            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-36 h-36 md:w-48 md:h-48"
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-green-400"
                style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-green-400/40 shadow-xl shadow-green-400/20">
                <Image
                  src="https://camo.githubusercontent.com/33fa1ecbfc674cb894fee42114ce8034fc32529090afc1ef7ef03b2d45c87271/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f6876524a434c467a6361737252346961377a2f67697068792e676966"
                  alt="HATEGEKIMANA SHEMA ARAFAT"
                  width={200} height={200}
                  className="w-full h-full object-cover"
                  priority
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' }}
                />
              </div>
            </motion.div>

            {/* Name + role */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <p className="text-sm text-green-400 font-semibold tracking-widest uppercase mb-2">Hello 👋, I'm</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                SHEMA ARAFAT
              </h1>
              <p className="mt-2 text-base md:text-lg text-gray-400">
                Software Engineer &amp; IT Student at{' '}
                <span className="text-green-400 font-semibold">SKillArc Corporation</span>
              </p>
            </motion.div>

            {/* Typing bio */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="h-7">
              <TypingAnimation
                texts={bioTexts}
                speed={50} deleteSpeed={30} pauseDuration={3000}
                className="text-green-400 text-sm md:text-base font-medium"
              />
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <button
                onClick={() => scrollTo('contact')}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-400 to-blue-500 text-black rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-green-400/25"
              >
                <Mail size={16} /> Get In Touch
              </button>
              <button
                onClick={() => scrollTo('projects')}
                className="flex items-center gap-2 px-6 py-2.5 border border-green-400 text-green-400 rounded-xl font-semibold text-sm hover:bg-green-400 hover:text-black transition-all"
              >
                <Code size={16} /> View Projects
              </button>
              <a
                href="https://www.linkedin.com/in/shema-arafati-h-5baa6b395/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600/80 text-white rounded-xl font-semibold text-sm hover:bg-blue-500 transition-colors"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com/shemaarafati2020/shemaarafati2020" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-800 text-white rounded-xl font-semibold text-sm hover:bg-gray-700 transition-colors border border-gray-700"
              >
                <Github size={16} /> GitHub
              </a>
            </motion.div>
          </div>

          {/* ── Tech stack grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {/* Frontend */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-green-400/20 p-5">
              <p className="text-xs font-bold text-green-400 tracking-widest uppercase mb-4 text-center">⚛ Frontend</p>
              <div className="grid grid-cols-3 gap-3">
                {techIcons.frontend.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.07 }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-800/80 border border-gray-700 group-hover:border-green-400/50 flex items-center justify-center transition-all shadow-sm">
                      <TechIcon name={tech.name} icon={tech.icon} color={tech.color} size="sm" />
                    </div>
                    <span className="text-[10px] text-gray-400 group-hover:text-green-400 transition-colors text-center leading-tight">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-blue-400/20 p-5">
              <p className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-4 text-center">⚙ Backend</p>
              <div className="grid grid-cols-3 gap-3">
                {techIcons.backend.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.07 }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-800/80 border border-gray-700 group-hover:border-blue-400/50 flex items-center justify-center transition-all shadow-sm">
                      <TechIcon name={tech.name} icon={tech.icon} color={tech.color} size="sm" />
                    </div>
                    <span className="text-[10px] text-gray-400 group-hover:text-blue-400 transition-colors text-center leading-tight">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* DevOps */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-purple-400/20 p-5">
              <p className="text-xs font-bold text-purple-400 tracking-widest uppercase mb-4 text-center">🚀 DevOps</p>
              <div className="grid grid-cols-3 gap-3">
                {techIcons.devops.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.07 }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-800/80 border border-gray-700 group-hover:border-purple-400/50 flex items-center justify-center transition-all shadow-sm">
                      <TechIcon name={tech.name} icon={tech.icon} color={tech.color} size="sm" />
                    </div>
                    <span className="text-[10px] text-gray-400 group-hover:text-purple-400 transition-colors text-center leading-tight">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 hover:text-green-400 transition-colors"
          onClick={() => scrollTo('skills')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs">Scroll</span>
          <ArrowDown size={18} />
        </motion.button>
      </section>


      {/* Skills Showcase */}
      <SkillsShowcase />

      {/* Experience Timeline */}
      <EnhancedExperienceTimeline />

      {/* About Section */}
      <AboutSection />

      {/* Professional Profiles Section */}
      <section id="profiles" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Professional Profiles
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real-time data from my GitHub and LinkedIn profiles showcasing my professional journey and technical expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GitHubProfileCard />
            <LinkedInProfileCard />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <EnhancedProjectsSection />

      {/* Certificates Section */}
      <CertificatesSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Contact Section */}
      <ContactSection />

      {/* Admin Interface */}
      {isAdmin && (
        <CertificateAdmin certificates={[]} onSave={() => {}} />
      )}

      {/* AI Assistant */}
      <AIAssistant />

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2024 HATEGEKIMANA SHEMA ARAFAT. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://www.linkedin.com/in/shema-arafati-h-5baa6b395/" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-green-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/shemaarafati2020/shemaarafati2020" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-green-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Social Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block"
      >
        <div className="flex flex-col gap-6">
          {[
            { href: "https://www.linkedin.com/in/shema-arafati-h-5baa6b395/", icon: Linkedin, label: "LinkedIn" },
            { href: "https://github.com/shemaarafati2020/shemaarafati2020", icon: Github, label: "GitHub" },
            { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
            { href: "mailto:shema.arafati@example.com", icon: Mail, label: "Email" }
          ].map((social, index) => (
            <motion.div
              key={social.label}
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <a 
                href={social.href}
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-12 h-12 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700 hover:border-green-400 transition-all">
                  <social.icon size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <motion.div 
                  className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  initial={{ x: 10 }}
                  whileHover={{ x: 0 }}
                >
                  {social.label}
                </motion.div>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}
