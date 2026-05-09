import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ exploredProgress }) {
  const { activeSection, progress: scrollPct } = useScrollProgress()
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -70, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] glass rounded-full px-5 py-2.5 flex items-center gap-1 overflow-hidden"
        >
          {/* Scroll progress bar at top */}
          <div
            className="absolute top-0 left-0 h-0.5 bg-[#F97316] rounded-full transition-all duration-150"
            style={{ width: `${scrollPct}%` }}
          />

          {/* Nav links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`px-3 py-1 rounded-full text-sm font-display transition-colors duration-200 ${
                  activeSection === l.id
                    ? 'bg-[#F9731614] text-[#F97316]'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Exploration progress pill */}
          <div className="ml-2 px-2.5 py-1 rounded-full bg-[#22D3EE22] border border-[#22D3EE44] flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            <span className="text-xs font-mono text-[#22D3EE]">{exploredProgress}%</span>
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden ml-1 p-1 text-white/60"
            onClick={() => setMenuOpen(o => !o)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </motion.nav>
      )}

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-16 left-1/2 -translate-x-1/2 z-[99] glass rounded-2xl px-4 py-3 flex flex-col gap-1 w-48"
        >
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-left px-3 py-2 rounded-lg text-sm font-display text-white/70 hover:text-[#F97316] hover:bg-[#F973160A] transition-colors"
            >
              {l.label}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
