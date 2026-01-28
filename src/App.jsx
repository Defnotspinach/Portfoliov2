import React, { useState, useEffect, useRef } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Content from './components/Content'
import ProfileImage from './components/ProfileImage'
import ThemeTransition from './components/ThemeTransition'

function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [isAnimating, setIsAnimating] = useState(false)
  const [contentOpacity, setContentOpacity] = useState(0)
  const toggleRef = useRef(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorDotPosition, setCursorDotPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Custom cursor tracking
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      
      // Smooth follow for dot
      setTimeout(() => {
        setCursorDotPosition({ x: e.clientX, y: e.clientY })
      }, 50)
    }

    const handleMouseEnter = (e) => {
      if (e.target.closest('.header-name') || 
          e.target.closest('button') || 
          e.target.closest('a') ||
          e.target.closest('nav')) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e) => {
      if (e.target.closest('.header-name') || 
          e.target.closest('button') || 
          e.target.closest('a') ||
          e.target.closest('nav')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'projects', 'seminars', 'interests']
      const scrollPosition = window.scrollY + 200

      if (window.scrollY < 100) {
        setActiveSection('home')
      } else {
        for (let section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setActiveSection(section)
              break
            }
          }
        }
      }
      const scrollTrigger = window.innerHeight * 0.5
      const opacity = Math.min(window.scrollY / scrollTrigger, 1)
      setContentOpacity(opacity)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection(sectionId)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setActiveSection(sectionId)
        setMobileMenuOpen(false)
      }
    }
  }

  const handleThemeToggle = () => {
    setIsAnimating(true)
    if (toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect()
      document.documentElement.style.setProperty('--toggle-top', `${rect.top}px`)
      document.documentElement.style.setProperty('--toggle-left', `${rect.left}px`)
    }

    setTimeout(() => {
      setIsDarkMode(!isDarkMode)
    }, 400)

    setTimeout(() => {
      setIsAnimating(false)
    }, 800)
  }

  return (
    <div className={`relative min-h-screen flex flex-col ${isDarkMode ? 'dark bg-[#1a1a1a]' : 'bg-[#fafaf8]'}`}>
      <div className="floating-dots" aria-hidden="true" />
      <div 
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div 
        className="custom-cursor-dot"
        style={{
          left: `${cursorDotPosition.x}px`,
          top: `${cursorDotPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      <ThemeTransition isAnimating={isAnimating} isDarkMode={!isDarkMode} />
      
      {isAnimating && (
        <motion.div 
          className={`fixed inset-0 pointer-events-none z-40 ${isDarkMode ? 'bg-black' : 'bg-white'}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        />
      )}

      {/* Navbar - Desktop and Mobile */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-[#2a2a2a] border-[#444]' : 'bg-white border-[#e0e0e0]'} border-b h-16 flex items-center justify-between px-4 sm:px-8 shadow-[0_2px_8px_rgba(0,0,0,0.05)]`}>
        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>mrcandres.</span>
        <Navigation activeSection={activeSection} onNavigate={scrollToSection} isDarkMode={isDarkMode} />
        <button
          ref={toggleRef}
          onClick={handleThemeToggle}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDarkMode ? 'bg-[#3a3a3a] text-yellow-400 hover:bg-[#444]' : 'bg-white text-gray-700 hover:bg-[#f0f0f0]'} shadow-md hover:shadow-lg`}
          title={isDarkMode ? 'Light mode' : 'Dark mode'}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>

      {/* Fixed Header Background */}
      <div className="fixed top-16 left-0 right-0 h-[calc(100vh-64px)] pointer-events-none z-0">
        <Header isDarkMode={isDarkMode} />
      </div>

      <motion.main 
        className={`flex-1 min-h-screen w-full p-0 relative z-10`}
        initial={false}
        animate={{
          color: isDarkMode ? '#ddd' : '#555',
        }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
        }}
        style={{
          opacity: Math.max(contentOpacity, isAnimating ? 0.7 : 1),
          marginTop: 'calc(100vh)',
        }}
      >
        <div className={`p-4 sm:p-8 lg:p-16 min-h-screen ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-[#fafaf8]'}`}>
          <Content activeSection={activeSection} onNavigate={scrollToSection} isDarkMode={isDarkMode} />
        </div>
      </motion.main>
    </div>
  )
}

export default App
