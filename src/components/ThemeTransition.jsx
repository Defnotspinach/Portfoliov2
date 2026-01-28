import React from 'react'
import { motion } from 'framer-motion'

function ThemeTransition({ isAnimating, isDarkMode }) {
  return (
    <>
      {isAnimating && (
        <motion.div
          className={`fixed inset-0 rounded-full pointer-events-none z-50 ${
            isDarkMode ? 'bg-black' : 'bg-white'
          }`}
          initial={{
            width: '48px',
            height: '48px',
            top: 'calc(var(--toggle-top) + 24px)',
            left: 'calc(var(--toggle-left) + 24px)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 1,
          }}
          animate={{
            width: '200vw',
            height: '200vh',
            top: '50%',
            left: '50%',
            borderRadius: '0%',
            transform: 'translate(-50%, -50%)',
            opacity: 0,
          }}
          transition={{
            width: { duration: 0.8, ease: 'easeInOut' },
            height: { duration: 0.8, ease: 'easeInOut' },
            top: { duration: 0.8, ease: 'easeInOut' },
            left: { duration: 0.8, ease: 'easeInOut' },
            borderRadius: { duration: 0.8, ease: 'easeInOut' },
            transform: { duration: 0.8, ease: 'easeInOut' },
            opacity: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
          }}
        />
      )}
    </>
  )
}

export default ThemeTransition
