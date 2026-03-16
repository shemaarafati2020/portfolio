'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, ExternalLink, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react'
import { fetchLinkedInProfile, LinkedInProfile } from '@/lib/linkedin'

export default function LinkedInProfileCard() {
  const [profile, setProfile] = useState<LinkedInProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const profileData = await fetchLinkedInProfile()
        setProfile(profileData)
      } catch (err) {
        setError('Failed to fetch LinkedIn data')
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
      className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-400/50 transition-all"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Linkedin size={24} className="text-white" />
          </motion.div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">{profile.name}</h3>
            <p className="text-gray-400 text-sm">{profile.headline}</p>
          </div>
        </div>
        <motion.a
          href="https://www.linkedin.com/in/shema-arafati-h-5baa6b395/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <ExternalLink size={20} className="text-gray-400" />
        </motion.a>
      </div>

      {profile.location && (
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <MapPin size={16} />
          {profile.location}
        </div>
      )}

      {profile.summary && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">About</h4>
          <p className="text-sm text-gray-400 leading-relaxed">{profile.summary}</p>
        </div>
      )}

      {profile.experience.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <Briefcase size={16} />
            Experience
          </h4>
          <div className="space-y-2">
            {profile.experience.map((exp, index) => (
              <div key={index} className="p-3 bg-gray-800/30 rounded-lg">
                <h5 className="text-sm font-medium text-white mb-1">{exp.title}</h5>
                <p className="text-xs text-blue-400 mb-1">{exp.company}</p>
                <p className="text-xs text-gray-500">{exp.duration}</p>
                {exp.description && (
                  <p className="text-xs text-gray-400 mt-2">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {profile.education.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <GraduationCap size={16} />
            Education
          </h4>
          <div className="space-y-2">
            {profile.education.map((edu, index) => (
              <div key={index} className="p-3 bg-gray-800/30 rounded-lg">
                <h5 className="text-sm font-medium text-white mb-1">{edu.school}</h5>
                <p className="text-xs text-blue-400 mb-1">{edu.degree}</p>
                {edu.field && (
                  <p className="text-xs text-gray-400 mb-1">{edu.field}</p>
                )}
                <p className="text-xs text-gray-500">{edu.duration}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {profile.skills.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 bg-gray-800/50 text-xs text-gray-300 rounded-full border border-gray-600 hover:border-green-400 hover:text-green-400 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {profile.certifications.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <Award size={16} />
            Certifications
          </h4>
          <div className="space-y-2">
            {profile.certifications.map((cert, index) => (
              <div key={index} className="p-3 bg-gray-800/30 rounded-lg">
                <h5 className="text-sm font-medium text-white mb-1">{cert.name}</h5>
                <p className="text-xs text-blue-400 mb-1">{cert.issuer}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{cert.date}</p>
                  {cert.credentialId && (
                    <p className="text-xs text-gray-500 font-mono">ID: {cert.credentialId}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
