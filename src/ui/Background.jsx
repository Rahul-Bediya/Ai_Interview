import React from 'react'

const Background = () => {
  return (
   <div className="absolute inset-0 -z-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-900/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-900/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
  )
}

export default Background
