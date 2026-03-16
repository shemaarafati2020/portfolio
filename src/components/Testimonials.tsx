'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
  rating: number
  index: number
}

const TestimonialCard = ({ quote, author, role, company, rating, index }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="relative bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-green-400/50 transition-all group"
    >
      <Quote className="absolute top-4 right-4 text-green-400/20" size={40} />
      
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}
          />
        ))}
      </div>

      <p className="text-gray-300 mb-6 italic">"{quote}"</p>
      
      <div>
        <p className="font-semibold text-white">{author}</p>
        <p className="text-sm text-gray-400">
          {role} at {company}
        </p>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-blue-400/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </motion.div>
  )
}

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Shema is an exceptional developer who consistently delivers high-quality work. Their attention to detail and problem-solving skills are outstanding.",
      author: "Sarah Johnson",
      role: "CTO",
      company: "TechCorp",
      rating: 5
    },
    {
      quote: "Working with Shema was a game-changer for our project. They brought innovative solutions and helped us achieve our goals ahead of schedule.",
      author: "Michael Chen",
      role: "Product Manager",
      company: "Innovation Labs",
      rating: 5
    },
    {
      quote: "One of the best developers I've had the pleasure to work with. Shema's expertise in both frontend and backend is truly impressive.",
      author: "Emily Rodriguez",
      role: "CEO",
      company: "StartupHub",
      rating: 5
    }
  ]

  return (
    <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Client <span className="text-gradient bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Testimonials</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            What my colleagues and clients have to say about working with me
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '50+', label: 'Happy Clients' },
            { number: '100+', label: 'Projects Done' },
            { number: '5+', label: 'Years Experience' },
            { number: '15+', label: 'Awards Won' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800"
            >
              <p className="text-3xl font-bold text-green-400 mb-2">{stat.number}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
