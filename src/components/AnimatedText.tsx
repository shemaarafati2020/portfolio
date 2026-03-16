'use client'

import { useState, useEffect } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export default function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isTyping) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, isTyping, text])

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
