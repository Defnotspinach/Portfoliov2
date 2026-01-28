import React from 'react'

function Navigation({ activeSection, onNavigate, isDarkMode }) {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },    
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <nav className="w-full">
      <ul className="flex flex-row gap-2 items-center justify-center w-full">
        {sections.map(section => (
          <li key={section.id} className="flex-shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault()
                onNavigate(section.id)
              }}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                activeSection === section.id
                  ? `${isDarkMode ? 'text-white bg-[#444] border border-[#666]' : 'text-[#1a1a1a] bg-[#f0f0f0] border border-[#999]'}`
                  : `${isDarkMode ? 'text-[#aaa] hover:text-white hover:bg-[#333]' : 'text-[#666] hover:text-[#1a1a1a] hover:bg-[#f0f0f0]'}`
              }`}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
