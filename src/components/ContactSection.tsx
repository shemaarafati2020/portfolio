'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle, Loader2, Sparkles, Clock, MessageSquare } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const STAGGER = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.1 } } },
  item: { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } },
}

function FloatingLabelInput({
  label, name, type = 'text', value, onChange, required, placeholder, multiline, rows,
}: {
  label: string; name: string; type?: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  required?: boolean; placeholder?: string; multiline?: boolean; rows?: number
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0
  const Tag = multiline ? 'textarea' : 'input'

  return (
    <div className="relative">
      <motion.label
        animate={{ y: active ? -22 : 0, scale: active ? 0.82 : 1, color: focused ? '#34d399' : active ? '#9ca3af' : '#6b7280' }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 top-3.5 text-sm origin-left pointer-events-none z-10 font-medium"
      >
        {label}{required && <span className="text-green-400 ml-0.5">*</span>}
      </motion.label>

      <motion.div
        animate={{ boxShadow: focused ? '0 0 0 2px rgba(52,211,153,0.35)' : '0 0 0 0px transparent' }}
        className="rounded-xl overflow-hidden"
      >
        <Tag
          type={type as string}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={focused ? placeholder : ''}
          rows={multiline ? (rows ?? 5) : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full px-4 ${active ? 'pt-6 pb-2' : 'py-3.5'} bg-gray-900/70 border border-gray-700 rounded-xl focus:border-green-400 focus:outline-none transition-all text-white placeholder-gray-600 backdrop-blur-sm text-sm ${multiline ? 'resize-none' : ''}`}
        />
      </motion.div>
    </div>
  )
}

function SuccessOverlay({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950/95 backdrop-blur-md rounded-2xl z-20 gap-5 px-8 text-center"
    >
      {/* Animated rings */}
      {[1, 2, 3].map(i => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-green-400/30"
          initial={{ width: 60, height: 60, opacity: 0.8 }}
          animate={{ width: 60 + i * 60, height: 60 + i * 60, opacity: 0 }}
          transition={{ duration: 1.4, delay: i * 0.2, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
        className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-400/40"
      >
        <CheckCircle size={40} className="text-white" strokeWidth={2.5} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <p className="text-2xl font-bold text-white mb-2">Message Sent! 🎉</p>
        <p className="text-gray-400 text-sm">Thanks for reaching out. Shema will reply to you shortly.</p>
      </motion.div>
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        onClick={onReset}
        className="mt-2 px-6 py-2 text-sm bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
      >
        Send another
      </motion.button>
    </motion.div>
  )
}

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'shemaarafati940@gmail.com', href: 'mailto:shemaarafati940@gmail.com', color: 'text-green-400', bg: 'bg-green-400/10' },
  { icon: MapPin, label: 'Location', value: 'Global 🌍 — Remote-first', href: null, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: null, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { icon: MessageSquare, label: 'Availability', value: 'Open to opportunities', href: null, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to send.')
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }))
    if (status === 'error') setStatus('idle')
  }

  const reset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' })
    setStatus('idle')
  }

  return (
    <section id="contact" ref={sectionRef} className="relative z-10 py-28 px-4 md:px-8 overflow-hidden">

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-green-500/5 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl"
        />
      </div>

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
            <Sparkles size={12} /> Contact
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black mb-5 leading-tight">
            Let&apos;s Build Something{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
                Amazing
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : {}}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Have a project in mind or want to collaborate? Drop a message — I respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* ── Left info panel ── */}
          <motion.div
            variants={STAGGER.container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="lg:col-span-2 space-y-6"
          >
            <motion.div variants={STAGGER.item}>
              <h3 className="text-2xl font-bold text-white mb-2">Get in touch</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I&apos;m always open to new projects, creative ideas, and opportunities to make an impact.
              </p>
            </motion.div>

            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href, color, bg }) => (
                <motion.div
                  key={label}
                  variants={STAGGER.item}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 8 }}
                    className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center flex-shrink-0 transition-all`}
                  >
                    <Icon className={color} size={18} />
                  </motion.div>
                  <div>
                    <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">{label}</p>
                    {href ? (
                      <a href={href} className={`text-sm font-medium text-gray-300 hover:${color} transition-colors`}>{value}</a>
                    ) : (
                      <p className="text-sm font-medium text-gray-300">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={STAGGER.item}>
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-widest font-semibold">Find me on</p>
              <div className="flex gap-3">
                {[
                  { href: 'https://www.linkedin.com/in/shema-arafati-h-5baa6b395/', Icon: Linkedin, color: 'hover:bg-blue-600/40 hover:border-blue-500/40', iconColor: 'text-blue-400', bg: 'bg-blue-600/10 border-blue-600/20' },
                  { href: 'https://github.com/shemaarafati2020/shemaarafati2020', Icon: Github, color: 'hover:bg-gray-700/60 hover:border-gray-500/40', iconColor: 'text-gray-300', bg: 'bg-gray-700/20 border-gray-600/20' },
                ].map(({ href, Icon, color, iconColor, bg }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 ${bg} border rounded-xl flex items-center justify-center ${color} transition-all`}
                  >
                    <Icon size={20} className={iconColor} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Decorative card */}
            <motion.div
              variants={STAGGER.item}
              className="relative overflow-hidden rounded-2xl border border-green-400/20 bg-gradient-to-br from-green-400/5 to-blue-500/5 p-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-8 -right-8 w-24 h-24 border border-green-400/10 rounded-full"
              />
              <p className="text-sm text-gray-300 leading-relaxed italic">
                &ldquo;First, solve the problem. Then, write the code.&rdquo;
              </p>
              <p className="text-xs text-green-400 mt-2 font-medium">— John Johnson</p>
            </motion.div>
          </motion.div>

          {/* ── Right form ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="relative">
              {/* Form glow border */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-[1px] bg-gradient-to-br from-green-400/20 via-transparent to-blue-500/20 rounded-2xl blur-sm pointer-events-none"
              />

              <form
                onSubmit={handleSubmit}
                className="relative bg-gray-950/80 backdrop-blur-xl rounded-2xl border border-gray-800/80 p-8 space-y-6"
              >
                <AnimatePresence>
                  {status === 'success' && <SuccessOverlay onReset={reset} />}
                </AnimatePresence>

                <motion.div
                  variants={STAGGER.container}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div variants={STAGGER.item}>
                      <FloatingLabelInput label="Your Name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                    </motion.div>
                    <motion.div variants={STAGGER.item}>
                      <FloatingLabelInput label="Your Email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                    </motion.div>
                  </div>

                  <motion.div variants={STAGGER.item}>
                    <FloatingLabelInput label="Subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project Collaboration" />
                  </motion.div>

                  <motion.div variants={STAGGER.item}>
                    <FloatingLabelInput label="Message" name="message" value={formData.message} onChange={handleChange} required placeholder="Tell me about your project…" multiline rows={5} />
                  </motion.div>
                </motion.div>

                <AnimatePresence mode="wait">
                  {status === 'error' && (
                    <motion.div
                      key="err"
                      initial={{ opacity: 0, height: 0, y: -8 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-start gap-2.5 text-red-400 bg-red-400/8 rounded-xl px-4 py-3 border border-red-400/20 text-sm"
                    >
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{errorMsg || 'Failed to send. Please try again or email me directly.'}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={status !== 'loading' ? { scale: 1.02, boxShadow: '0 0 30px rgba(52,211,153,0.35)' } : {}}
                  whileTap={{ scale: 0.97 }}
                  className="relative w-full px-6 py-4 rounded-xl font-bold text-sm overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {/* animated gradient bg */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-blue-500"
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{ backgroundSize: '200% 200%' }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2 text-black">
                    {status === 'loading' ? (
                      <><Loader2 size={18} className="animate-spin" /> Sending…</>
                    ) : (
                      <><Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" /> Send Message</>
                    )}
                  </span>
                </motion.button>

                <p className="text-center text-xs text-gray-600">
                  Your message goes directly to <span className="text-green-400">shemaarafati940@gmail.com</span>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
