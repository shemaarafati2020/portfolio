'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Star, GitFork, Eye, Calendar, Code2, Loader2, RefreshCw, AlertCircle } from 'lucide-react'
import { fetchGitHubRepos, fetchGitHubProfile, GitHubRepo, GitHubProfile, getLangColor } from '@/lib/github'

const GITHUB_URL = 'https://github.com/shemaarafati2020'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function formatName(name: string) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const langColor = getLangColor(repo.language)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800/80 hover:border-green-400/40 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Hover gradient overlay */}
      <motion.div className="absolute inset-0 bg-gradient-to-br from-green-400/4 via-transparent to-blue-400/4 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

      {/* Animated shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-400/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Card header banner */}
      <div className="relative h-28 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex-shrink-0">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(#4ade8015 1px, transparent 1px), linear-gradient(90deg, #4ade8015 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        {/* Diagonal stripes */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #60a5fa 20px, #60a5fa 21px)' }} />

        {/* Big language badge centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div whileHover={{ scale: 1.1, rotate: 8 }} transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-2xl border flex items-center justify-center bg-black/30 backdrop-blur-sm"
              style={{ borderColor: `${langColor}50` }}>
              <Code2 size={22} style={{ color: langColor }} />
            </div>
            {repo.language && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                style={{ color: langColor, borderColor: `${langColor}40`, backgroundColor: `${langColor}15` }}>
                {repo.language}
              </span>
            )}
          </motion.div>
        </div>

        {/* Stats badges top-right */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
            <Star size={11} className="text-yellow-400" />
            <span className="text-[11px] text-gray-200 font-semibold">{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
            <GitFork size={11} className="text-blue-400" />
            <span className="text-[11px] text-gray-200 font-semibold">{repo.forks_count}</span>
          </div>
        </div>

        {/* Updated date bottom-left */}
        <div className="absolute bottom-2 left-3 flex items-center gap-1 text-gray-500">
          <Calendar size={10} />
          <span className="text-[10px]">{formatDate(repo.updated_at)}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="relative p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-green-400 transition-colors leading-tight line-clamp-1">
          {formatName(repo.name)}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
          {repo.description || 'No description provided for this repository.'}
        </p>

        {/* Topics */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.topics.slice(0, 4).map((topic) => (
              <span key={topic} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700 text-gray-400 font-medium">
                #{topic}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <motion.a
            href={repo.html_url} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl border border-gray-700 hover:border-gray-600 transition-all text-xs font-semibold"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Github size={13} /> View Code
          </motion.a>
          {repo.homepage && (
            <motion.a
              href={repo.homepage} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-green-500/90 to-blue-500/90 text-white rounded-xl text-xs font-bold shadow-lg shadow-green-500/20 hover:shadow-green-400/30 transition-all"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <ExternalLink size={13} /> Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ProfileBanner({ profile }: { profile: GitHubProfile }) {
  return (
    <motion.a
      href={`${GITHUB_URL}`} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }} viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="flex items-center gap-4 p-5 bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-green-400/40 transition-all group mb-8"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={profile.avatar_url} alt={profile.name} width={56} height={56}
        className="w-14 h-14 rounded-full border-2 border-green-400/40 group-hover:border-green-400/80 transition-all flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-white group-hover:text-green-400 transition-colors truncate">{profile.name || profile.login}</p>
        <p className="text-xs text-gray-400 truncate">{profile.bio || 'Software Engineer'}</p>
      </div>
      <div className="hidden sm:flex gap-5 flex-shrink-0">
        {[
          { label: 'Repos', value: profile.public_repos },
          { label: 'Followers', value: profile.followers },
          { label: 'Following', value: profile.following },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-green-400 font-black text-lg leading-none">{s.value}</div>
            <div className="text-[10px] text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
      <ExternalLink size={16} className="text-gray-500 group-hover:text-green-400 transition-colors flex-shrink-0" />
    </motion.a>
  )
}

const FILTERS = ['All', 'TypeScript', 'JavaScript', 'Python', 'Java', 'HTML', 'Other']

export default function EnhancedProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [showAll, setShowAll] = useState(false)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [reposData, profileData] = await Promise.all([
        fetchGitHubRepos(),
        fetchGitHubProfile(),
      ])
      setRepos(reposData)
      setProfile(profileData)
    } catch {
      setError('Could not load GitHub data. Showing placeholder projects.')
      // Fallback placeholder repos
      setRepos([
        { id: 1, name: 'Portfolio Website', full_name: 'shemaarafati2020/portfolio', description: 'Personal developer portfolio built with Next.js, TypeScript, Framer Motion, and Tailwind CSS.', html_url: GITHUB_URL, homepage: 'http://localhost:3000', language: 'TypeScript', stargazers_count: 8, forks_count: 2, watchers_count: 8, updated_at: new Date().toISOString(), topics: ['nextjs', 'typescript', 'portfolio'], fork: false, archived: false, open_issues_count: 0 },
        { id: 2, name: 'Course Evaluation System', full_name: 'shemaarafati2020/cess', description: 'Full-stack Java/Spring Boot course evaluation survey system with role-based access control and analytics.', html_url: GITHUB_URL, homepage: '', language: 'Java', stargazers_count: 5, forks_count: 1, watchers_count: 5, updated_at: new Date().toISOString(), topics: ['java', 'spring', 'mysql'], fork: false, archived: false, open_issues_count: 0 },
        { id: 3, name: 'AI Chat App', full_name: 'shemaarafati2020/ai-chat', description: 'Real-time AI-powered chat application using MongoDB Atlas Vector Search and RAG architecture.', html_url: GITHUB_URL, homepage: '', language: 'JavaScript', stargazers_count: 12, forks_count: 3, watchers_count: 12, updated_at: new Date().toISOString(), topics: ['ai', 'mongodb', 'rag', 'nodejs'], fork: false, archived: false, open_issues_count: 0 },
        { id: 4, name: 'Task Manager', full_name: 'shemaarafati2020/task-manager', description: 'Collaborative Kanban-style project management tool with real-time updates and team collaboration features.', html_url: GITHUB_URL, homepage: '', language: 'TypeScript', stargazers_count: 4, forks_count: 0, watchers_count: 4, updated_at: new Date().toISOString(), topics: ['react', 'typescript', 'mongodb'], fork: false, archived: false, open_issues_count: 0 },
        { id: 5, name: 'Student Portal', full_name: 'shemaarafati2020/student-portal', description: 'Academic student portal with course enrollment, grade tracking, and faculty management.', html_url: GITHUB_URL, homepage: '', language: 'Java', stargazers_count: 3, forks_count: 1, watchers_count: 3, updated_at: new Date().toISOString(), topics: ['java', 'spring-boot', 'thymeleaf'], fork: false, archived: false, open_issues_count: 0 },
        { id: 6, name: 'E-Commerce API', full_name: 'shemaarafati2020/ecommerce-api', description: 'Scalable REST API for e-commerce with payment integration, inventory management, and admin dashboard.', html_url: GITHUB_URL, homepage: '', language: 'JavaScript', stargazers_count: 6, forks_count: 2, watchers_count: 6, updated_at: new Date().toISOString(), topics: ['nodejs', 'express', 'mongodb', 'stripe'], fork: false, archived: false, open_issues_count: 0 },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  const filtered = repos.filter((r) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Other') return !['TypeScript', 'JavaScript', 'Python', 'Java', 'HTML'].includes(r.language || '')
    return r.language === activeFilter
  })

  const visible = showAll ? filtered : filtered.slice(0, 6)

  return (
    <section id="projects" className="relative z-10 py-24 px-4 md:px-6 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-1/4 w-96 h-96 bg-green-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-1/4 w-96 h-96 bg-blue-500/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-400/30 bg-green-400/5 text-green-400 text-xs font-bold tracking-widest uppercase mb-4">
            <Github size={12} /> GitHub Projects
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black mb-4 leading-none">
            My{' '}
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Live repositories pulled directly from GitHub — real code, real projects.
          </p>
        </motion.div>

        {/* GitHub Profile Banner */}
        {profile && <ProfileBanner profile={profile} />}

        {/* Filters */}
        {!loading && !error && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}
            viewport={{ once: true }} className="flex flex-wrap gap-2 mb-8 justify-center">
            {FILTERS.map((f) => (
              <motion.button key={f} onClick={() => { setActiveFilter(f); setShowAll(false) }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeFilter === f
                    ? 'bg-green-400 text-black border-green-400 shadow-lg shadow-green-400/25'
                    : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                  }`}>
                {f}
                {f === 'All' && <span className="ml-1.5 opacity-60">({repos.length})</span>}
              </motion.button>
            ))}
            <motion.button onClick={loadData} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-gray-700 text-gray-400 hover:border-blue-400/50 hover:text-blue-400 transition-all flex items-center gap-1.5">
              <RefreshCw size={11} /> Refresh
            </motion.button>
          </motion.div>
        )}

        {/* Error banner */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center gap-3 p-4 mb-6 bg-orange-500/10 border border-orange-500/30 rounded-xl text-orange-300 text-sm">
            <AlertCircle size={16} className="flex-shrink-0" />
            {error}
          </motion.div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-900/60 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="h-28 bg-gray-800/60" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-800 rounded w-full" />
                  <div className="h-3 bg-gray-800 rounded w-2/3" />
                  <div className="h-8 bg-gray-800 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map((repo, index) => (
                <RepoCard key={repo.id} repo={repo} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Show more / View all */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          {filtered.length > 6 && (
            <motion.button onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-8 py-3 border-2 border-green-400/60 text-green-400 rounded-2xl hover:bg-green-400/10 transition-all font-bold text-sm">
              {showAll ? 'Show Less' : `Show All ${filtered.length} Projects`}
            </motion.button>
          )}
          <motion.a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-2xl border border-gray-700 hover:border-gray-600 transition-all font-bold text-sm">
            <Github size={18} /> View GitHub Profile
            <ExternalLink size={14} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
