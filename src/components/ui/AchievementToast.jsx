import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AchievementToast({ achievement, onDismiss }) {
  useEffect(() => {
    if (!achievement) return
    const timer = setTimeout(onDismiss, 3500)
    return () => clearTimeout(timer)
  }, [achievement, onDismiss])

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          key={achievement.id}
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed top-6 right-6 z-[9990] glass rounded-xl px-4 py-3 flex items-center gap-3 max-w-xs"
          style={{ borderColor: `${achievement.color}44`, boxShadow: `0 0 20px ${achievement.color}22` }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${achievement.color}22`, border: `1px solid ${achievement.color}66` }}
          >
            {achievement.icon}
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest mb-0.5" style={{ color: achievement.color }}>
              Achievement Unlocked
            </div>
            <div className="text-sm font-display font-semibold text-off-white">{achievement.title}</div>
            <div className="text-xs text-white/40">{achievement.description}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
