import { useState, useCallback } from 'react'
import { achievements } from '../../data/achievements'

export function useAchievements() {
  const [unlocked, setUnlocked] = useState(new Set())
  const [toastQueue, setToastQueue] = useState([])

  const unlock = useCallback((sectionId) => {
    const achievement = achievements.find(a => a.section === sectionId)
    if (!achievement || unlocked.has(achievement.id)) return

    setUnlocked(prev => new Set([...prev, achievement.id]))
    setToastQueue(prev => [...prev, achievement])
  }, [unlocked])

  const dismissToast = useCallback(() => {
    setToastQueue(prev => prev.slice(1))
  }, [])

  const progress = Math.round((unlocked.size / achievements.filter(a => !a.secret).length) * 100)

  return { unlocked, unlock, toastQueue, dismissToast, progress }
}
