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
import Testimonials from '@/components/Testimonials'
import CertificatesSection from '@/components/CertificatesSection'
import GitHubProfileCard from '@/components/GitHubProfileCard'
import LinkedInProfileCard from '@/components/LinkedInProfileCard'
import CertificateAdmin from '@/components/CertificateAdmin'
import TypingAnimation from '@/components/TypingAnimation'
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

  const bioTexts = [
    "Building impactful & innovative solutions",
    "Expert in Full-Stack Development",
    "Exploring Cloud & DevOps technologies",
    "Making tech accessible to all",
    "Passionate about clean code & best practices",
    "Always learning, always growing"
  ]

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Certs', id: 'certificates' },
    { label: 'Contact', id: 'contact' },
  ]

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#020610] text-white relative overflow-hidden">
      {/* Subtle grid mesh overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(74,222,128,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Advanced Background Effects */}
      <AnimatedBackground />
      <FloatingParticles />

      {/* Gradient Orbs */}
      <GradientOrb className="top-20 left-20 w-96 h-96" delay={0} duration={25} />
      <GradientOrb className="bottom-20 right-20 w-96 h-96" delay={5} duration={30} />
      <GradientOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" delay={10} duration={35} />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/8 via-transparent to-blue-900/8" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020610]/60 via-transparent to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3"
        style={{ background: 'rgba(2,6,16,0.75)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Gradient line at very top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />
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
              href="/Arafati CV .pdf"
              download="Arafati CV.pdf"
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
                  href="/Arafati CV .pdf"
                  download="Arafati CV.pdf"
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
              className="relative w-40 h-40 md:w-52 md:h-52"
            >
              {/* Outer pulsating glow */}
              <motion.div
                className="absolute -inset-3 rounded-full bg-gradient-to-r from-green-400/20 via-blue-500/20 to-purple-500/20 blur-xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Outer spinning ring - dashed */}
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-dashed border-green-400/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              {/* Inner spinning ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-green-400"
                style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              {/* Orbit dots */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <motion.div
                  key={deg}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i % 2 === 0 ? '#4ade80' : '#60a5fa',
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                  }}
                  animate={{ rotate: [deg, deg + 360] }}
                  transition={{ duration: 10 + i, repeat: Infinity, ease: 'linear' }}
                // Orbit at radius ~55% of container
                >
                  <motion.div
                    style={{ transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(${72}px)` }}
                    className="w-2 h-2 rounded-full bg-current shadow-lg shadow-green-400/50"
                  />
                </motion.div>
              ))}
              {/* Photo */}
              <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-green-400/50 shadow-2xl shadow-green-400/30">
                <Image
                  src="/FYC_QnA_RoddyRicch.webp"
                  alt="HATEGEKIMANA SHEMA ARAFAT"
                  width={220} height={220}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
              {/* Open to Work badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2.5 py-1 bg-green-500 text-black text-[10px] font-black rounded-full border-2 border-black shadow-lg shadow-green-500/40 z-10"
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-black"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                OPEN TO WORK
              </motion.div>
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
              <p className="mt-1 text-sm text-gray-500 flex items-center justify-center gap-1.5">
                <span>📍</span> Rwanda, Kigali
                <span className="mx-1 text-gray-700">•</span>
                <span className="text-blue-400">💼 Available for projects</span>
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

            {/* Hero stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center gap-6 pt-2"
            >
              {[
                { value: '13+', label: 'Certifications', color: 'text-green-400' },
                { value: '10+', label: 'Projects Built', color: 'text-blue-400' },
                { value: '2+', label: 'Years Experience', color: 'text-purple-400' },
                { value: '5+', label: 'Tech Stacks', color: 'text-orange-400' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.75 + i * 0.08, type: 'spring', stiffness: 200 }}
                  className="text-center"
                >
                  <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

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
        <CertificateAdmin certificates={[]} onSave={() => { }} />
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
