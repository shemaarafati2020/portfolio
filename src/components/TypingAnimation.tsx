'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypingAnimationProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pauseDuration?: number
  className?: string
}

export default function TypingAnimation({ 
  texts, 
  speed = 100, 
  deleteSpeed = 50, 
  pauseDuration = 2000,
  className = "" 
}: TypingAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentFullText = texts[currentTextIndex]
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDuration)
      return () => clearTimeout(pauseTimer)
    }

    if (isDeleting) {
      if (currentText.length > 0) {
        const deleteTimer = setTimeout(() => {
          setCurrentText(currentFullText.substring(0, currentText.length - 1))
        }, deleteSpeed)
        return () => clearTimeout(deleteTimer)
      } else {
        setIsDeleting(false)
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
      }
    } else {
      if (currentText.length < currentFullText.length) {
        const typeTimer = setTimeout(() => {
          setCurrentText(currentFullText.substring(0, currentText.length + 1))
        }, speed)
        return () => clearTimeout(typeTimer)
      } else {
        setIsPaused(true)
      }
    }
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, speed, deleteSpeed, pauseDuration])

  return (
    <motion.span
      className={`${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {currentText}
      <motion.span
        className="inline-block w-0.5 h-5 bg-green-400 ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.span>
  )
}
