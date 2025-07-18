'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700/60 bg-gradient-to-r from-slate-950/98 via-slate-900/98 to-slate-950/98 backdrop-blur-md supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-slate-950/80 supports-[backdrop-filter]:via-slate-900/80 supports-[backdrop-filter]:to-slate-950/80">
      <div className="container mx-auto px-4 flex h-16 items-center">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
              SpaceX Portal
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              href="/launches" 
              className="text-gray-200 hover:text-blue-300 transition-all duration-200 text-sm lg:text-base hover:scale-105 font-medium"
            >
              Launches
            </Link>
            <a 
              href="https://www.spacex.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-blue-300 transition-all duration-200 text-sm lg:text-base hover:scale-105 font-medium"
            >
              SpaceX Official
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-200 hover:text-blue-300 transition-all duration-200 hover:bg-white/10"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-700/60 bg-gradient-to-r from-slate-950/98 via-slate-900/98 to-slate-950/98 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            <Link 
              href="/launches" 
              className="block text-gray-200 hover:text-blue-300 transition-all duration-200 py-2 hover:pl-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Launches
            </Link>
            <a 
              href="https://www.spacex.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-200 hover:text-blue-300 transition-all duration-200 py-2 hover:pl-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              SpaceX Official
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}