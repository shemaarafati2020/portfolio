'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Award, ExternalLink, Calendar, Shield, Database, Cloud, Cpu, Network, Search, Filter, ChevronRight, Star, CheckCircle } from 'lucide-react'
import { fetchLinkedInCertificates, LinkedInCertificate } from '@/lib/linkedin-scraper'

const categoryConfig: Record<string, { icon: React.ElementType; color: string; bg: string; border: string; glow: string }> = {
  'AI & Data': { icon: Cpu, color: 'text-purple-400', bg: 'from-purple-500/20 to-purple-900/10', border: 'border-purple-500/40', glow: 'shadow-purple-500/20' },
  'Database': { icon: Database, color: 'text-green-400', bg: 'from-green-500/20 to-green-900/10', border: 'border-green-500/40', glow: 'shadow-green-500/20' },
  'Backend': { icon: Shield, color: 'text-orange-400', bg: 'from-orange-500/20 to-orange-900/10', border: 'border-orange-500/40', glow: 'shadow-orange-500/20' },
  'Cloud': { icon: Cloud, color: 'text-cyan-400', bg: 'from-cyan-500/20 to-cyan-900/10', border: 'border-cyan-500/40', glow: 'shadow-cyan-500/20' },
  'Security': { icon: Shield, color: 'text-red-400', bg: 'from-red-500/20 to-red-900/10', border: 'border-red-500/40', glow: 'shadow-red-500/20' },
  'IT & Networking': { icon: Network, color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-900/10', border: 'border-blue-500/40', glow: 'shadow-blue-500/20' },
}

const issuerLogos: Record<string, string> = {
  'MongoDB': '🍃',
  'LinkedIn Learning': '💼',
  'Cisco': '🔷',
  'IBM': '🔵',
}

const ALL_CATEGORIES = ['All', ...Object.keys(categoryConfig)]

interface CertCardProps {
  cert: LinkedInCertificate & { id: string }
  index: number
  isSelected: boolean
  onClick: () => void
}

function CertCard({ cert, index, isSelected, onClick }: CertCardProps) {
  const cfg = categoryConfig[cert.category || ''] || categoryConfig['Database']
  const Icon = cfg.icon
  const logo = issuerLogos[cert.issuer] || '🏆'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.015 }}
      onClick={onClick}
      className={`relative cursor-pointer rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 group
        ${isSelected ? `${cfg.border} shadow-2xl ${cfg.glow}` : 'border-gray-700/60 hover:border-gray-500/60'}
      `}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cfg.bg} opacity-${isSelected ? '100' : '0'} group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

      <div className="relative p-5 bg-gray-900/70">
        {/* Top row: logo + category badge */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cfg.bg} border ${cfg.border} flex items-center justify-center text-xl flex-shrink-0 shadow-lg`}>
              {logo}
            </div>
            <div>
              <span className={`text-xs font-bold ${cfg.color} tracking-wider uppercase bg-gray-800/80 px-2 py-0.5 rounded-full border ${cfg.border}`}>
                {cert.category}
              </span>
            </div>
          </div>
          <motion.div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${isSelected ? cfg.color : 'text-gray-500'} border ${isSelected ? cfg.border : 'border-gray-700'} transition-all`}
            whileHover={{ rotate: 90 }}
          >
            <Icon size={14} />
          </motion.div>
        </div>

        {/* Certificate name */}
        <h3 className={`text-base font-bold text-white mb-1 leading-snug group-hover:${cfg.color} transition-colors line-clamp-2`}>
          {cert.name}
        </h3>

        {/* Issuer + date */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full bg-current ${cfg.color}`} />
            {cert.issuer}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={10} />
            {cert.date}
          </span>
        </div>

        {/* Skills chips */}
        {cert.skills && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cert.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="text-[10px] px-2 py-0.5 bg-gray-800/80 text-gray-300 rounded-full border border-gray-700/60">
                {skill}
              </span>
            ))}
            {cert.skills.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 bg-gray-800/80 text-gray-400 rounded-full border border-gray-700/60">
                +{cert.skills.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer: credential link */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/40">
          {cert.expiryDate ? (
            <span className="text-[10px] text-gray-500 flex items-center gap-1">
              <CheckCircle size={10} className="text-green-400" />
              Expires {cert.expiryDate}
            </span>
          ) : (
            <span className="text-[10px] text-gray-500 flex items-center gap-1">
              <CheckCircle size={10} className="text-green-400" />
              No Expiration
            </span>
          )}
          <motion.a
            href={cert.credentialUrl || 'https://www.linkedin.com/in/shema-arafati-h-5baa6b395/details/certifications/'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`flex items-center gap-1.5 text-xs font-semibold ${cfg.color} hover:opacity-80 transition-opacity`}
            whileHover={{ x: 3 }}
          >
            View Credential <ExternalLink size={11} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

function CertDetailPanel({ cert, onClose }: { cert: (LinkedInCertificate & { id: string }) | null; onClose: () => void }) {
  if (!cert) return null
  const cfg = categoryConfig[cert.category || ''] || categoryConfig['Database']
  const Icon = cfg.icon
  const logo = issuerLogos[cert.issuer] || '🏆'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3 }}
        className={`sticky top-24 rounded-2xl border ${cfg.border} backdrop-blur-md overflow-hidden shadow-2xl ${cfg.glow}`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${cfg.bg}`} />
        <div className="relative p-6 bg-gray-900/80">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cfg.bg} border ${cfg.border} flex items-center justify-center text-3xl flex-shrink-0 shadow-xl`}>
              {logo}
            </div>
            <div className="flex-1 min-w-0">
              <span className={`text-xs font-bold ${cfg.color} tracking-wider uppercase`}>{cert.category}</span>
              <h3 className="text-xl font-black text-white mt-1 leading-tight">{cert.name}</h3>
            </div>
          </div>

          {/* Meta */}
          <div className="space-y-3 mb-5">
            <div className="flex items-center justify-between p-3 bg-gray-800/60 rounded-xl border border-gray-700/40">
              <span className="text-xs text-gray-400">Issuing Organization</span>
              <span className={`text-sm font-bold ${cfg.color}`}>{cert.issuer}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800/60 rounded-xl border border-gray-700/40">
              <span className="text-xs text-gray-400">Issue Date</span>
              <span className="text-sm font-semibold text-white">{cert.date}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800/60 rounded-xl border border-gray-700/40">
              <span className="text-xs text-gray-400">Expiry</span>
              <span className="text-sm font-semibold text-green-400">{cert.expiryDate || 'No Expiration'}</span>
            </div>
          </div>

          {/* Description */}
          {cert.description && (
            <div className="mb-5">
              <p className="text-sm text-gray-300 leading-relaxed">{cert.description}</p>
            </div>
          )}

          {/* Skills */}
          {cert.skills && cert.skills.length > 0 && (
            <div className="mb-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Skills Validated</p>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <span key={skill} className={`text-xs px-3 py-1.5 rounded-full border ${cfg.border} ${cfg.color} bg-gray-800/60 font-medium`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <motion.a
            href={cert.credentialUrl || 'https://www.linkedin.com/in/shema-arafati-h-5baa6b395/details/certifications/'}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r ${cfg.border.replace('border-', 'from-').replace('/40', '/60')} text-white font-bold text-sm transition-all hover:opacity-90 border ${cfg.border}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon size={16} />
            View Credential on {cert.issuer}
            <ExternalLink size={14} />
          </motion.a>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState<(LinkedInCertificate & { id: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedCert, setSelectedCert] = useState<(LinkedInCertificate & { id: string }) | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    fetchLinkedInCertificates().then((certs) => {
      const mapped = certs.map((cert, index) => ({ ...cert, id: index.toString() }))
      setCertificates(mapped)
      setSelectedCert(mapped[0] || null)
      setLoading(false)
    })
  }, [])

  const filtered = certificates.filter((cert) => {
    const matchesCategory = activeCategory === 'All' || cert.category === activeCategory
    const matchesSearch = !search || cert.name.toLowerCase().includes(search.toLowerCase()) || cert.issuer.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Stats
  const stats = [
    { label: 'Total Certifications', value: certificates.length, icon: Award },
    { label: 'Issuing Bodies', value: [...new Set(certificates.map(c => c.issuer))].length, icon: Star },
    { label: 'Categories', value: [...new Set(certificates.map(c => c.category))].length, icon: Filter },
    { label: 'Verified Credentials', value: certificates.filter(c => c.credentialUrl).length, icon: CheckCircle },
  ]

  if (loading) {
    return (
      <section id="certificates" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-gray-800 rounded-xl w-1/3 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-900/60 rounded-2xl border border-gray-800" />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="certificates" ref={sectionRef} className="relative z-10 py-24 px-4 md:px-6 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-400/30 bg-green-400/5 text-green-400 text-xs font-bold tracking-widest uppercase mb-4"
          >
            <Award size={12} />
            Verified Credentials
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Certifications
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {certificates.length} professional certifications from industry leaders — MongoDB, Cisco, IBM & more — validating my expertise across AI, databases, cloud and security.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
              className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-700/60 p-4 text-center group hover:border-green-400/40 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <stat.icon size={18} className="text-green-400" />
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter + Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col md:flex-row gap-4 mb-10"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search certifications..."
              className="w-full pl-10 pr-4 py-3 bg-gray-900/60 border border-gray-700/60 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-400/60 transition-all"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => {
              const cfg = cat !== 'All' ? categoryConfig[cat] : null
              const isActive = activeCategory === cat
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${isActive
                      ? cfg ? `${cfg.color} ${cfg.border} bg-gray-800` : 'text-green-400 border-green-400/60 bg-gray-800'
                      : 'text-gray-400 border-gray-700/60 hover:border-gray-500/60 hover:text-white'
                    }`}
                >
                  {cat === 'All' ? `All (${certificates.length})` : cat}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Main content: grid + detail panel */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Cards grid */}
          <div className="xl:col-span-2">
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20 text-gray-500"
                >
                  <Award size={48} className="mx-auto mb-4 opacity-30" />
                  <p>No certifications match your search.</p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeCategory + search}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {filtered.map((cert, index) => (
                    <CertCard
                      key={cert.id}
                      cert={cert}
                      index={index}
                      isSelected={selectedCert?.id === cert.id}
                      onClick={() => setSelectedCert(cert)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Detail panel */}
          <div className="xl:col-span-1">
            {selectedCert && (
              <CertDetailPanel cert={selectedCert} onClose={() => setSelectedCert(null)} />
            )}
          </div>
        </div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.a
            href="https://www.linkedin.com/in/shema-arafati-h-5baa6b395/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white rounded-2xl font-bold shadow-2xl shadow-blue-500/25 hover:shadow-blue-400/40 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Award size={20} />
            View All {certificates.length} Certifications on LinkedIn
            <ExternalLink size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
