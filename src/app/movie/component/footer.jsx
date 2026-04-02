import React from 'react'

const Footer = () => {
  return (
    <div className='relative flex w-full justify-center py-6 overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-t border-purple-500/20 footer-beam'>
      <div className='relative z-10 flex items-center space-x-2'>
        <span className='text-purple-400'>✨</span>
        <h1 className='capitalize font-bold text-2xl font-inconsolata animate-shine bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent'>
          created by bidex
        </h1>
        <span className='text-purple-400'>✨</span>
      </div>
    </div>
  )
}

export default Footer