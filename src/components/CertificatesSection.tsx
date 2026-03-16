'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, ExternalLink, Calendar } from 'lucide-react'
import { fetchLinkedInCertificates } from '@/lib/linkedin-scraper'
import CertificateAdmin, { Certificate } from '@/components/CertificateAdmin'

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const certs = await fetchLinkedInCertificates()
        setCertificates(certs.map((cert, index) => ({ ...cert, id: index.toString() })))
      } catch (error) {
        console.error('Error fetching certificates:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [])

  // Check for admin mode (you can customize this logic)
  useEffect(() => {
    const checkAdmin = () => {
      // Enable admin mode with a specific key combination or URL parameter
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('admin') === 'true' || localStorage.getItem('admin-mode') === 'true') {
        setIsAdmin(true)
      }
    }
    checkAdmin()
  }, [])

  const handleSaveCertificates = (updatedCertificates: Certificate[]) => {
    setCertificates(updatedCertificates)
    // Here you could also save to a backend or localStorage
    localStorage.setItem('certificates', JSON.stringify(updatedCertificates))
  }

  if (loading) {
    return (
      <section id="certificates" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-700 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section id="certificates" className="relative z-10 py-20 px-6">
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
              Certifications & Achievements
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional certifications and continuous learning milestones that validate my expertise and commitment to excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(34,197,94,0.2)" }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-400/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Award size={24} className="text-white" />
                </motion.div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {cert.name}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {cert.date}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-mono">
                      {cert.credentialId && `ID: ${cert.credentialId}`}
                    </span>
                    
                    <motion.a
                      href={cert.credentialUrl || "https://www.linkedin.com/in/shema-arafati-h-5baa6b395/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      View Credential
                      <ExternalLink size={16} />
                    </motion.a>
                  </div>
                  
                  {cert.description && (
                    <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                      {cert.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://www.linkedin.com/in/shema-arafati-h-5baa6b395/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-semibold shadow-lg shadow-blue-400/25 hover:shadow-blue-400/40 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Award size={20} />
            View All Certifications on LinkedIn
            <ExternalLink size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
