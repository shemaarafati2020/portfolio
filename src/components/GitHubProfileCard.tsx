'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, GitBranch, Users, Calendar } from 'lucide-react'
import { fetchGitHubProfile, fetchGitHubRepos, GitHubProfile, GitHubRepo } from '@/lib/github'

export default function GitHubProfileCard() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [profileData, reposData] = await Promise.all([
          fetchGitHubProfile(),
          fetchGitHubRepos()
        ])
        setProfile(profileData)
        setRepos(reposData)
      } catch (err) {
        setError('Failed to fetch GitHub data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/50">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  if (!profile) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-400/50 transition-all"
    >
      <div className="flex items-start gap-4 mb-6">
        <motion.img
          src={profile.avatar_url}
          alt={profile.name || profile.login}
          className="w-16 h-16 rounded-full border-2 border-green-400"
          whileHover={{ scale: 1.05, rotate: 5 }}
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-1">
            {profile.name || profile.login}
          </h3>
          <p className="text-gray-400 text-sm mb-2">{profile.bio}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {profile.company && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                {profile.company}
              </span>
            )}
            {profile.location && (
              <span>📍 {profile.location}</span>
            )}
            <span className="flex items-center gap-1">
              <Users size={12} />
              {profile.followers} followers
            </span>
          </div>
        </div>
        <motion.a
          href={`https://github.com/${profile.login}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <Github size={20} className="text-gray-400" />
        </motion.a>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div
          className="text-center p-3 bg-gray-800/50 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-green-400">{profile.public_repos}</div>
          <div className="text-xs text-gray-400">Repositories</div>
        </motion.div>
        <motion.div
          className="text-center p-3 bg-gray-800/50 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-blue-400">{profile.followers}</div>
          <div className="text-xs text-gray-400">Followers</div>
        </motion.div>
        <motion.div
          className="text-center p-3 bg-gray-800/50 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-purple-400">{profile.following}</div>
          <div className="text-xs text-gray-400">Following</div>
        </motion.div>
      </div>

      {repos.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Recent Repositories</h4>
          <div className="space-y-2">
            {repos.map((repo) => (
              <motion.div
                key={repo.id}
                className="p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-white mb-1">{repo.name}</h5>
                    {repo.description && (
                      <p className="text-xs text-gray-400 mb-2">{repo.description}</p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star size={12} />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitBranch size={12} />
                        {repo.forks_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <motion.a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-green-400 transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <ExternalLink size={14} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
