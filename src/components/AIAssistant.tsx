'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User, Mail, Sparkles } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface ContactInfo {
  name: string
  email: string
  message: string
}

const KB = {
  name: 'HATEGEKIMANA SHEMA ARAFAT',
  role: 'Software Engineer & IT Student',
  company: 'SKillArc Corporation',
  location: 'Global 🌍',
  email: 'shemaarafati2020@gmail.com',
  bio: 'Building impactful & innovative solutions. Expert in Full-Stack Development. Exploring Cloud & DevOps. Making tech accessible to all.',
  philosophy: '"First, solve the problem. Then, write the code." — John Johnson',
  techStack: {
    frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'Tailwind CSS'],
    backend: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Redis', 'REST APIs'],
    devops: ['Docker', 'Kubernetes', 'AWS', 'Git', 'GitHub', 'GraphQL'],
    learning: ['Spring Boot', 'Advanced JavaScript', 'React Native', 'Machine Learning'],
  },
  experience: [
    { title: 'Software Engineer & IT Student', company: 'SKillArc Corporation', period: '2024 - Present', highlights: ['Full-stack application development', 'Node.js backend APIs', 'React & TypeScript frontends', 'AWS cloud integration'] },
    { title: 'Full-Stack Developer', company: 'Freelance & Open Source', period: '2022 - Present', highlights: ['20+ projects built and deployed', 'Open-source GitHub contributions', 'Spring Boot exploration', 'GraphQL APIs'] },
    { title: 'Cloud & DevOps', company: 'Self-Directed Learning', period: '2023 - Present', highlights: ['Docker & Kubernetes containerisation', 'AWS EC2, S3, Lambda', 'GitHub Actions CI/CD pipelines'] },
  ],
  certifications: [
    { name: 'Full-Stack Web Development', issuer: 'SKillArc Corporation', year: '2024' },
    { name: 'Cloud Computing & DevOps', issuer: 'AWS Academy', year: '2024' },
    { name: 'Advanced JavaScript & React', issuer: 'Tech Education Hub', year: '2023' },
    { name: 'Database Design & Management', issuer: 'Data Systems Institute', year: '2023' },
  ],
  availability: 'Open to opportunities — full-time, freelance, and collaboration',
}

function getAIResponse(input: string, setShowContact: (v: boolean) => void): string {
  const q = input.toLowerCase()

  if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|howdy|sup)\b/.test(q))
    return `Hello! 👋 I'm Shema's AI assistant. Ask me about his skills, experience, projects, certifications, or say "contact form" to reach him directly.`

  if (/who (is|are)|about (shema|him|you)|introduce|tell me about/.test(q))
    return `${KB.name} is a ${KB.role} at ${KB.company}, based globally 🌍.\n\n${KB.bio}\n\nCurrently deepening expertise in Spring Boot and advanced JavaScript patterns.`

  if (/skill|tech|stack|language|framework|tool|expert|proficien/.test(q))
    return `Shema's full tech stack:\n\n🎨 Frontend: ${KB.techStack.frontend.join(', ')}\n\n⚙️ Backend: ${KB.techStack.backend.join(', ')}\n\n🚀 DevOps: ${KB.techStack.devops.join(', ')}\n\n📚 Learning: ${KB.techStack.learning.join(', ')}`

  if (/frontend|react|next\.?js|typescript|javascript|tailwind|html/.test(q))
    return `Shema is highly proficient in frontend dev (95% skill level). Daily stack: ${KB.techStack.frontend.join(', ')}. React and Next.js are his primary frameworks.`

  if (/backend|node|python|api|rest|mongodb|postgres|redis|server|database/.test(q))
    return `Backend skills: ${KB.techStack.backend.join(', ')}. Builds RESTful & GraphQL APIs with Node.js and Python, using both SQL (PostgreSQL) and NoSQL (MongoDB, Redis).`

  if (/devops|docker|kubernetes|aws|cloud|ci.?cd|pipeline|deploy|git/.test(q))
    return `DevOps & Cloud stack: ${KB.techStack.devops.join(', ')}. Deploys to AWS (EC2, S3, Lambda), containerises with Docker, orchestrates with Kubernetes, and automates with GitHub Actions.`

  if (/experience|work|job|role|position|career|employment/.test(q)) {
    const exp = KB.experience.map(e => `• ${e.title} @ ${e.company} (${e.period})\n  ${e.highlights.join(', ')}`).join('\n\n')
    return `Professional experience:\n\n${exp}\n\nMore details on his LinkedIn profile.`
  }

  if (/current|now|today|skillarc/.test(q)) {
    const e = KB.experience[0]
    return `Currently: ${e.title} at ${e.company} (${e.period}). Focus areas: ${e.highlights.join(', ')}.`
  }

  if (/cert|credential|qualif|award|achieve/.test(q)) {
    const certs = KB.certifications.map(c => `• ${c.name} — ${c.issuer} (${c.year})`).join('\n')
    return `Certifications:\n\n${certs}\n\nAll verifiable on his LinkedIn profile.`
  }

  if (/project|portfolio|build|creat|develop|app/.test(q))
    return `Shema has built 20+ projects:\n\n• React & Next.js web applications\n• Node.js & Python REST/GraphQL APIs\n• Containerised apps deployed on AWS\n• Open-source GitHub contributions\n\nSee the Projects section or visit his GitHub.`

  if (/educat|study|degree|universit|college|school/.test(q))
    return `Studying Information Technology with a focus on Software Engineering. Supplements studies with real-world projects, certifications, and hackathons.`

  if (/hire|available|opportun|freelanc|collaborat/.test(q))
    return `Shema is ${KB.availability}!\n\n📧 ${KB.email}\n💼 linkedin.com/in/shema-arafati-h-5baa6b395/\n\nOr type "contact form" to message him right here.`

  if (/contact|email|reach|messag|get in touch|send/.test(q)) {
    setTimeout(() => setShowContact(true), 300)
    return `Opening the contact form now! 📬 Fill in your details to send a message directly to Shema's inbox.`
  }

  if (/locat|where|country|city|based/.test(q))
    return `Shema is based globally 🌍 and works fully remote, open to international opportunities.`

  if (/linkedin|github|social|profile|link/.test(q))
    return `Find Shema on:\n\n💼 linkedin.com/in/shema-arafati-h-5baa6b395/\n🐙 github.com/shemaarafati2020/shemaarafati2020`

  if (/philosoph|quote|motto|belief|mantra|principle/.test(q))
    return `Shema's philosophy: ${KB.philosophy}\n\nHe also believes: "Programming isn't about what you know; it's about what you can figure out." — Chris Pine`

  if (/help|what can|what do|capabilit|option/.test(q))
    return `I can help with:\n\n🧑 About Shema\n💻 Tech Stack\n💼 Experience & Work\n🎓 Certifications\n🚀 Projects\n📬 Contact (say "contact form")\n\nJust ask!`

  return `I can answer questions about Shema's skills, experience, projects, or certifications. Say "contact form" to message him directly, or ask "what can you do?" for a full list.`
}

const QUICK_REPLIES = ['What are his skills?', 'Current role?', 'Certifications?', 'Contact form']

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactInfo, setContactInfo] = useState<ContactInfo>({ name: '', email: '', message: '' })
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, showContactForm])

  const pushMessage = (text: string, sender: 'user' | 'ai') => {
    setMessages(prev => [...prev, { id: Date.now().toString(), text, sender, timestamp: new Date() }])
  }

  const sendMessage = (text?: string) => {
    const msg = (text ?? inputText).trim()
    if (!msg) return
    pushMessage(msg, 'user')
    setInputText('')
    setIsTyping(true)
    setTimeout(() => {
      pushMessage(getAIResponse(msg, setShowContactForm), 'ai')
      setIsTyping(false)
    }, 900)
  }

  const sendContactMessage = async () => {
    if (!contactInfo.name || !contactInfo.email || !contactInfo.message) return
    setContactStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactInfo),
      })
      if (!res.ok) throw new Error()
      setContactStatus('success')
      pushMessage(`✅ Message sent! Shema will reply to you at ${contactInfo.email}. Thanks for reaching out!`, 'ai')
      setContactInfo({ name: '', email: '', message: '' })
      setTimeout(() => { setShowContactForm(false); setContactStatus('idle') }, 2000)
    } catch {
      setContactStatus('error')
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full shadow-xl shadow-green-500/30 hover:shadow-green-500/50 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <Bot size={20} />
        <span className="text-sm font-semibold">Ask AI</span>
        <motion.span className="w-2 h-2 bg-white rounded-full" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[620px] bg-gray-950 rounded-2xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-green-600/90 to-blue-600/90 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Shema's AI Assistant</p>
                  <p className="text-xs text-white/70">Ask me anything about Shema</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 px-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bot size={28} className="text-green-400" />
                  </div>
                  <p className="text-white font-semibold mb-1">Hi there! 👋</p>
                  <p className="text-sm text-gray-400">I know everything about Shema. Ask about his skills, experience, projects, or contact him directly.</p>
                </motion.div>
              )}

              {messages.map(msg => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-green-600 to-green-500 text-white rounded-br-sm'
                      : 'bg-gray-800 text-gray-200 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <User size={14} className="text-gray-400" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1 items-center">
                      {[0, 150, 300].map(d => (
                        <motion.div key={d} className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                          animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: d / 1000, repeat: Infinity }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {showContactForm && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/80 rounded-xl p-4 border border-gray-700 space-y-3"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-white mb-1">
                    <Mail size={16} className="text-green-400" /> Contact Shema
                  </div>
                  <input type="text" placeholder="Your Name" value={contactInfo.name}
                    onChange={e => setContactInfo(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-green-400 outline-none" />
                  <input type="email" placeholder="Your Email" value={contactInfo.email}
                    onChange={e => setContactInfo(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-green-400 outline-none" />
                  <textarea placeholder="Your Message" value={contactInfo.message} rows={3}
                    onChange={e => setContactInfo(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-green-400 outline-none resize-none" />
                  {contactStatus === 'error' && <p className="text-xs text-red-400">Failed to send. Please try again.</p>}
                  <div className="flex gap-2">
                    <button onClick={sendContactMessage}
                      disabled={!contactInfo.name || !contactInfo.email || !contactInfo.message || contactStatus === 'loading'}
                      className="flex-1 py-2 text-sm bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                      {contactStatus === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>
                    <button onClick={() => { setShowContactForm(false); setContactStatus('idle') }}
                      className="px-3 py-2 text-sm bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length === 0 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map(r => (
                  <button key={r} onClick={() => sendMessage(r)}
                    className="px-3 py-1.5 text-xs bg-gray-800 text-gray-300 rounded-full border border-gray-700 hover:border-green-400 hover:text-green-400 transition-colors">
                    {r}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            {!showContactForm && (
              <div className="px-4 py-3 border-t border-gray-800">
                <div className="flex gap-2 items-end">
                  <input type="text" placeholder="Ask about Shema..."
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                    className="flex-1 px-4 py-2.5 text-sm bg-gray-800 text-white rounded-xl border border-gray-700 focus:border-green-400 outline-none placeholder-gray-500" />
                  <motion.button onClick={() => sendMessage()} disabled={!inputText.trim()}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0">
                    <Send size={16} />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
