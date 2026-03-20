'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink, Star, GitFork, Users, BookOpen, Sparkles } from 'lucide-react'
import { fetchGitHubProfile, fetchGitHubRepos, GitHubProfile, GitHubRepo } from '@/lib/github'

const GH_USER = 'shemaarafati2020'
const THEME = 'transparent'  // github-readme-stats theme param

const BADGE_PARAMS = `username=${GH_USER}&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=4ade80&text_color=9ca3af&icon_color=60a5fa&ring_color=4ade80`
const STREAK_PARAMS = `user=${GH_USER}&theme=tokyonight&hide_border=true&background=00000000&ring=4ade80&fire=f97316&currStreakLabel=4ade80&sideLabels=9ca3af&currStreakNum=ffffff&sideNums=ffffff`
const LANGS_PARAMS  = `username=${GH_USER}&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=4ade80&text_color=9ca3af&layout=compact`

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572A5',
  Java: '#b07219', 'C++': '#f34b7d', CSS: '#563d7c', HTML: '#e34c26',
  Shell: '#89e051', Go: '#00ADD8', Rust: '#dea584',
}

export default function GitHubProfileCard() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { once: true, margin: '-60px' })

  useEffect(() => {
    Promise.all([fetchGitHubProfile(), fetchGitHubRepos()])
      .then(([p, r]) => { setProfile(p); setRepos(r) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const topRepos = repos.slice(0, 4)
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-gray-950/80 backdrop-blur-xl rounded-2xl border border-gray-800 hover:border-green-400/40 transition-all overflow-hidden group"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
      {/* Top accent bar */}
      <div className="h-[2px] bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 w-full" />

      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              {loading ? (
                <div className="w-14 h-14 rounded-full bg-gray-800 animate-pulse" />
              ) : (
                <motion.img
                  src={profile?.avatar_url ?? `https://github.com/${GH_USER}.png`}
                  alt={GH_USER}
                  className="w-14 h-14 rounded-full border-2 border-green-400/60 shadow-lg shadow-green-400/20"
                  whileHover={{ scale: 1.08 }}
                />
              )}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-950 flex items-center justify-center">
                <Github size={8} className="text-black" />
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{profile?.name ?? GH_USER}</h3>
              <p className="text-xs text-gray-400">@{GH_USER}</p>
              {profile?.bio && <p className="text-xs text-gray-500 mt-0.5 max-w-48 truncate">{profile.bio}</p>}
            </div>
          </div>
          <motion.a
            href={`https://github.com/${GH_USER}`}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-green-400/40 rounded-lg text-xs text-gray-300 transition-all"
          >
            <ExternalLink size={12} /> View Profile
          </motion.a>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: BookOpen, label: 'Repos', value: profile?.public_repos ?? '—', color: 'text-green-400' },
            { icon: Users,    label: 'Followers', value: profile?.followers ?? '—', color: 'text-blue-400' },
            { icon: Star,     label: 'Stars', value: totalStars || '—', color: 'text-yellow-400' },
            { icon: GitFork,  label: 'Forks', value: repos.reduce((s, r) => s + r.forks_count, 0) || '—', color: 'text-purple-400' },
          ].map(({ icon: Icon, label, value, color }) => (
            <motion.div
              key={label}
              whileHover={{ y: -3, scale: 1.04 }}
              className="bg-gray-900/70 rounded-xl p-2.5 text-center border border-gray-800 hover:border-gray-700 transition-all"
            >
              <Icon size={14} className={`${color} mx-auto mb-1`} />
              <div className={`text-base font-black ${color}`}>{value}</div>
              <div className="text-[10px] text-gray-500">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Stats Badge */}
        <div className="rounded-xl overflow-hidden bg-gray-900/40 border border-gray-800/60">
          <img
            src={`https://github-readme-stats.vercel.app/api?${BADGE_PARAMS}&show_icons=true&count_private=true&include_all_commits=true`}
            alt="GitHub Stats"
            className="w-full"
            loading="lazy"
          />
        </div>

        {/* Streak */}
        <div className="rounded-xl overflow-hidden bg-gray-900/40 border border-gray-800/60">
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?${STREAK_PARAMS}`}
            alt="GitHub Streak"
            className="w-full"
            loading="lazy"
          />
        </div>

        {/* Top Languages */}
        <div className="rounded-xl overflow-hidden bg-gray-900/40 border border-gray-800/60">
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?${LANGS_PARAMS}`}
            alt="Top Languages"
            className="w-full"
            loading="lazy"
          />
        </div>

        {/* Recent repos */}
        {topRepos.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Sparkles size={11} className="text-green-400" /> Recent Repositories
            </p>
            <div className="space-y-2">
              {topRepos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-3 bg-gray-900/60 hover:bg-gray-800/60 rounded-xl border border-gray-800 hover:border-green-400/30 transition-all group/repo"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white group-hover/repo:text-green-400 transition-colors truncate">{repo.name}</p>
                    {repo.description && <p className="text-xs text-gray-500 truncate mt-0.5">{repo.description}</p>}
                    <div className="flex items-center gap-3 mt-1.5">
                      {repo.language && (
                        <span className="flex items-center gap-1 text-[10px] text-gray-400">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: LANG_COLORS[repo.language] ?? '#6b7280' }} />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-[10px] text-gray-500"><Star size={10} />{repo.stargazers_count}</span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-500"><GitFork size={10} />{repo.forks_count}</span>
                    </div>
                  </div>
                  <ExternalLink size={12} className="text-gray-600 group-hover/repo:text-green-400 flex-shrink-0 ml-2 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
