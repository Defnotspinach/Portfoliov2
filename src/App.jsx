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
    // Handle smooth scroll to sections
    const handleScroll = () => {
      const sections = ['about', 'skills', 'projects', 'seminars', 'interests']
      const scrollPosition = window.scrollY + 200

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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Save dark mode preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
    
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setMobileMenuOpen(false) // Close menu after clicking
    }
  }

  const handleThemeToggle = () => {
    setIsAnimating(true)
    
    // Set CSS variables for animation origin
    if (toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect()
      document.documentElement.style.setProperty('--toggle-top', `${rect.top}px`)
      document.documentElement.style.setProperty('--toggle-left', `${rect.left}px`)
    }

    // Toggle dark mode in the middle of the animation for smooth transition
    setTimeout(() => {
      setIsDarkMode(!isDarkMode)
    }, 400)

    // End animation after it completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 800)
  }

  return (
    <div className={`relative min-h-screen flex flex-col lg:flex-row ${isDarkMode ? 'dark bg-[#1a1a1a]' : 'bg-[#fafaf8]'}`}>
      <div className="floating-dots" aria-hidden="true" />
      {/* Custom Cursor */}
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
      
      {/* Smooth color overlay during animation */}
      {isAnimating && (
        <motion.div 
          className={`fixed inset-0 pointer-events-none z-40 ${isDarkMode ? 'bg-black' : 'bg-white'}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        />
      )}
      <aside className={`hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:w-[300px] lg:h-screen ${isDarkMode ? 'lg:bg-[#2a2a2a] lg:border-[#444]' : 'lg:bg-white lg:border-[#e0e0e0]'} lg:border-r lg:overflow-y-auto lg:z-100 lg:shadow-[2px_0_8px_rgba(0,0,0,0.05)] flex-col items-center gap-10 p-10`}>
        <ProfileImage />
        <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      </aside>

      {/* Mobile Header with Hamburger */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-40 ${isDarkMode ? 'bg-[#2a2a2a] border-[#444]' : 'bg-white border-[#e0e0e0]'} border-b h-16 flex items-center justify-between px-4`}>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col gap-1.5 cursor-pointer focus:outline-none"
        >
          <span className={`block w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-[#1a1a1a]'} transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-[#1a1a1a]'} transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-[#1a1a1a]'} transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>Marc.</span>
        <div className="w-6"></div>
      </div>

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed top-16 left-0 h-[calc(100vh-64px)] w-[300px] ${isDarkMode ? 'bg-[#2a2a2a] border-[#444]' : 'bg-white border-[#e0e0e0]'} border-r shadow-[2px_0_8px_rgba(0,0,0,0.05)] overflow-y-auto flex flex-col items-center gap-10 p-10 transition-transform duration-300 z-30 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <ProfileImage />
        <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      </aside>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-20 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Theme Toggle Button - Top Right */}
      <button
        ref={toggleRef}
        onClick={handleThemeToggle}
        className={`fixed top-6 right-6 lg:top-8 lg:right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all ${isDarkMode ? 'bg-[#3a3a3a] text-yellow-400 hover:bg-[#444]' : 'bg-white text-gray-700 hover:bg-[#f0f0f0]'} shadow-lg hover:shadow-xl`}
        title={isDarkMode ? 'Light mode' : 'Dark mode'}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <motion.main 
        className={`lg:ml-[300px] flex-1 min-h-screen w-full p-4 sm:p-8 lg:p-16 mt-16 lg:mt-0`}
        initial={false}
        animate={{
          color: isDarkMode ? '#ddd' : '#555',
        }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
        }}
        style={{
          opacity: isAnimating ? 0.7 : 1,
        }}
      >
        <Header isDarkMode={isDarkMode} />
        <Content activeSection={activeSection} onNavigate={scrollToSection} isDarkMode={isDarkMode} />
      </motion.main>
    </div>
  )
}

export default App
