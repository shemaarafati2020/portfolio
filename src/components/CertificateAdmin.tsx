'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Plus, Trash2, Edit } from 'lucide-react'

export interface Certificate {
  id: string
  name: string
  issuer: string
  date: string
  credentialId?: string
  credentialUrl?: string
  description?: string
}

interface CertificateAdminProps {
  certificates: Certificate[]
  onSave: (certificates: Certificate[]) => void
}

export default function CertificateAdmin({ certificates, onSave }: CertificateAdminProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingCertificates, setEditingCertificates] = useState(certificates)
  const [newCertificate, setNewCertificate] = useState<Certificate>({
    id: '',
    name: '',
    issuer: '',
    date: '',
    credentialId: '',
    credentialUrl: 'https://www.linkedin.com/in/shema-arafati-h-5baa6b395/',
    description: ''
  })

  const handleSave = () => {
    onSave(editingCertificates.filter(cert => cert.name && cert.issuer))
    setIsEditing(false)
  }

  const handleAddCertificate = () => {
    if (newCertificate.name && newCertificate.issuer) {
      setEditingCertificates([...editingCertificates, { ...newCertificate, id: Date.now().toString() }])
      setNewCertificate({
        id: '',
        name: '',
        issuer: '',
        date: '',
        credentialId: '',
        credentialUrl: 'https://www.linkedin.com/in/shema-arafati-h-5baa6b395/',
        description: ''
      })
    }
  }

  const handleDeleteCertificate = (id: string) => {
    setEditingCertificates(editingCertificates.filter(cert => cert.id !== id))
  }

  const handleUpdateCertificate = (id: string, field: keyof Certificate, value: string) => {
    setEditingCertificates(editingCertificates.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ))
  }

  if (!isEditing) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <motion.button
          onClick={() => setIsEditing(true)}
          className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Edit size={20} />
        </motion.button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Manage Certificates</h2>
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {editingCertificates.map((cert) => (
            <div key={cert.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Certificate Name"
                  value={cert.name}
                  onChange={(e) => handleUpdateCertificate(cert.id, 'name', e.target.value)}
                  className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-green-400 outline-none"
                />
                <input
                  type="text"
                  placeholder="Issuer"
                  value={cert.issuer}
                  onChange={(e) => handleUpdateCertificate(cert.id, 'issuer', e.target.value)}
                  className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-green-400 outline-none"
                />
                <input
                  type="text"
                  placeholder="Date (e.g., 2024)"
                  value={cert.date}
                  onChange={(e) => handleUpdateCertificate(cert.id, 'date', e.target.value)}
                  className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-green-400 outline-none"
                />
                <input
                  type="text"
                  placeholder="Credential ID (optional)"
                  value={cert.credentialId || ''}
                  onChange={(e) => handleUpdateCertificate(cert.id, 'credentialId', e.target.value)}
                  className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-green-400 outline-none"
                />
                <input
                  type="url"
                  placeholder="Credential URL"
                  value={cert.credentialUrl || ''}
                  onChange={(e) => handleUpdateCertificate(cert.id, 'credentialUrl', e.target.value)}
                  className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-green-400 outline-none md:col-span-2"
                />
                <textarea
                  placeholder="Description (optional)"
                  value={cert.description || ''}
                  onChange={(e) => handleUpdateCertificate(cert.id, 'description', e.target.value)}
                  className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-green-400 outline-none md:col-span-2 h-20 resize-none"
                />
              </div>
              <button
                onClick={() => handleDeleteCertificate(cert.id)}
                className="mt-3 p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Add New Certificate</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Certificate Name"
              value={newCertificate.name}
              onChange={(e) => setNewCertificate({ ...newCertificate, name: e.target.value })}
              className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-green-400 outline-none"
            />
            <input
              type="text"
              placeholder="Issuer"
              value={newCertificate.issuer}
              onChange={(e) => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
              className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-green-400 outline-none"
            />
            <input
              type="text"
              placeholder="Date (e.g., 2024)"
              value={newCertificate.date}
              onChange={(e) => setNewCertificate({ ...newCertificate, date: e.target.value })}
              className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-green-400 outline-none"
            />
            <input
              type="text"
              placeholder="Credential ID (optional)"
              value={newCertificate.credentialId || ''}
              onChange={(e) => setNewCertificate({ ...newCertificate, credentialId: e.target.value })}
              className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-green-400 outline-none"
            />
            <input
              type="url"
              placeholder="Credential URL"
              value={newCertificate.credentialUrl || ''}
              onChange={(e) => setNewCertificate({ ...newCertificate, credentialUrl: e.target.value })}
              className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-green-400 outline-none md:col-span-2"
            />
            <textarea
              placeholder="Description (optional)"
              value={newCertificate.description || ''}
              onChange={(e) => setNewCertificate({ ...newCertificate, description: e.target.value })}
              className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-green-400 outline-none md:col-span-2 h-20 resize-none"
            />
          </div>
          <button
            onClick={handleAddCertificate}
            disabled={!newCertificate.name || !newCertificate.issuer}
            className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus size={16} />
            Add Certificate
          </button>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  )
}
