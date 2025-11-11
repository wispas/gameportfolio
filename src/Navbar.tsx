import { useState } from 'react'

interface NavbarProps {
  onReset: () => void
}

export default function Navbar({ onReset }: NavbarProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [showAbout, setShowAbout] = useState(false)

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Title */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-4xl">♟️</span>
                Chess Portfolio
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setShowAbout(true)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                About Me
              </button>
              <button
                onClick={onReset}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Reset Board
              </button>
              <a
                href="https://github.com/wispas"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium"
              >
                GitHub
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-white p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {showMenu ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMenu && (
            <div className="md:hidden pb-4 space-y-2">
              <button
                onClick={() => {
                  setShowAbout(true)
                  setShowMenu(false)
                }}
                className="w-full text-left px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                About Me
              </button>
              <button
                onClick={() => {
                  onReset()
                  setShowMenu(false)
                }}
                className="w-full text-left px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Reset Board
              </button>
              <a
                href="https://github.com/wispas"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium"
              >
                GitHub
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* About Me Modal */}
      {showAbout && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowAbout(false)}
        >
          <div 
            className="bg-gray-800 p-8 rounded-lg max-w-lg w-full mx-4 backdrop-blur-lg border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">👋</div>
              <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
              <p className="text-gray-300 mb-6">
                Full-stack developer from Mongolia, Ulaanbaatar. Passionate about creating 
                innovative software solutions and interactive experiences.
              </p>
              
              <div className="mb-6 space-y-2">
                <p className="text-white font-semibold">Skills:</p>
                <p className="text-gray-300">JavaScript, TypeScript, Python, PHP, Flask, React, 3D Web Development</p>
              </div>

              <div className="mb-6 space-y-2">
                <p className="text-white font-semibold">Education:</p>
                <p className="text-gray-300">MSE (Mongolia) - Constantly learning and growing</p>
              </div>

              <div className="flex gap-4 justify-center mb-6">
                <a
                  href="https://github.com/wispas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  View GitHub
                </a>
                <a
                  href="https://twitter.com/wispa_sultan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Follow on X
                </a>
              </div>

              <button
                onClick={() => setShowAbout(false)}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}