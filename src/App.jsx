import { useState, useEffect, useCallback } from 'react'
import LoadingScreen from './components/ui/LoadingScreen'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/ui/Navbar'
import AchievementToast from './components/ui/AchievementToast'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'
import Projects from './components/sections/Projects'
import Achievements from './components/sections/Achievements'
import Contact from './components/sections/Contact'
import { useAchievements } from './components/hooks/useAchievements'

// Konami code sequence
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const { unlocked, unlock, toastQueue, dismissToast, progress } = useAchievements()
  const [konamiIdx, setKonamiIdx] = useState(0)

  const handleUnlock = useCallback((section) => {
    unlock(section)
  }, [unlock])

  // Konami code listener
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === KONAMI[konamiIdx]) {
        const next = konamiIdx + 1
        if (next === KONAMI.length) {
          setKonamiIdx(0)
          unlock('konami')
          // Particle burst effect
          document.body.style.animation = 'glitch 0.3s steps(2) 3'
          setTimeout(() => document.body.style.animation = '', 1000)
        } else {
          setKonamiIdx(next)
        }
      } else {
        setKonamiIdx(0)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [konamiIdx, unlock])

  if (!loaded) {
    return <LoadingScreen onComplete={() => setLoaded(true)} />
  }

  return (
    <div className="relative bg-[#050A0E] min-h-screen">
      <CustomCursor />
      <Navbar exploredProgress={progress} />
      <AchievementToast achievement={toastQueue[0]} onDismiss={dismissToast} />

      <main>
        <Hero onUnlock={handleUnlock} />
        <About />
        <Skills onUnlock={handleUnlock} />
        <Experience onUnlock={handleUnlock} />
        <Education />
        <Projects onUnlock={handleUnlock} />
        <Achievements unlocked={unlocked} />
        <Contact onUnlock={handleUnlock} />
      </main>
    </div>
  )
}
