import React from 'react'

function Navigation({ activeSection, onNavigate }) {
  const sections = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'education/seminar', label: 'Education/Seminar' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },

  ]

  return (
    <nav className="w-full mt-5 lg:mt-5">
      <ul className="flex flex-col gap-3 items-stretch w-full">
        {sections.map(section => (
          <li key={section.id} className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault()
                onNavigate(section.id)
              }}
              className={`px-4 py-2.5 text-sm font-medium rounded-md transition-all w-full text-center ${
                activeSection === section.id
                  ? 'text-[#1a1a1a] font-semibold bg-[#f0f0f0] border border-[#999]'
                  : 'text-[#666] hover:text-[#1a1a1a] hover:bg-[#f0f0f0]'
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
