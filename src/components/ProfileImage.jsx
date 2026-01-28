import React from 'react'

function ProfileImage() {
  return (
    <div className="w-full flex items-center justify-center animate-fadeIn">
      <img
        src="/profile.jpg"
        alt="Marc Aedrian C. Andres"
        className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 rounded-full object-cover shadow-[0_8px_32px_rgba(0,0,0,0.12)] border-4 sm:border-[6px] border-white transition-all hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
      />
    </div>
  )
}

export default ProfileImage
