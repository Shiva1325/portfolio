import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const letters = 'SP'.split('')
const messages = ['LOADING MODULES', 'INIT ANIMATIONS', 'BOOTING EXPERIENCE']

export default function LoadingScreen({ onComplete }) {
  const [msgIdx, setMsgIdx] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t1 = setInterval(() => setMsgIdx(i => (i + 1) % messages.length), 700)
    const t2 = setTimeout(() => {
      clearInterval(t1)
      setDone(true)
      setTimeout(onComplete, 600)
    }, 2400)
    return () => { clearInterval(t1); clearTimeout(t2) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#050A0E] dot-grid flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.77, 0, 0.18, 1] }}
        >
          {/* Logo initials */}
          <div className="flex gap-3 mb-8">
            {letters.map((l, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-display font-bold neon-text neon-border"
              >
                {l}
              </motion.div>
            ))}
          </div>

          {/* Status message */}
          <motion.p
            key={msgIdx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="font-mono text-xs tracking-[0.3em] text-[#F9731688] mb-6"
          >
            {messages[msgIdx]}
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-[#F97316] load-bar rounded-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
