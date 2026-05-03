import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { achievements } from '../../data/achievements'

export default function Achievements({ unlocked }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const nonSecret = achievements.filter(a => !a.secret)
  const secretAch = achievements.find(a => a.secret)

  return (
    <section id="achievements" className="section-pad" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-px bg-[#FFD700]" />
          <span className="text-xs font-mono tracking-widest text-[#FFD70088] uppercase">Achievements</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-5xl font-display font-bold mb-4"
        >
          Explorer <span className="gradient-text">Badges</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-white/40 text-sm font-mono mb-10"
        >
          Unlock badges by exploring different sections. {unlocked.size}/{nonSecret.length} collected.
          <span className="text-[#FFD700] ml-2">+1 secret badge hidden somewhere...</span>
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-10"
        >
          <div
            className="h-full bg-gradient-to-r from-[#818CF8] to-[#F472B6] rounded-full transition-all duration-700"
            style={{ width: `${(unlocked.size / nonSecret.length) * 100}%` }}
          />
        </motion.div>

        {/* Badge grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {nonSecret.map((ach, i) => {
            const isUnlocked = unlocked.has(ach.id)
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={`glass rounded-2xl p-5 flex flex-col items-center gap-3 text-center transition-all duration-500 ${
                  isUnlocked ? 'neon-border' : 'opacity-40 grayscale'
                }`}
                style={isUnlocked ? { boxShadow: `0 0 30px ${ach.color}22` } : {}}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
                  style={{ background: isUnlocked ? `${ach.color}18` : 'rgba(255,255,255,0.04)', border: `1px solid ${isUnlocked ? ach.color : 'transparent'}44` }}
                >
                  {isUnlocked ? ach.icon : '🔒'}
                </div>
                <div>
                  <div className="text-sm font-display font-semibold text-white mb-0.5">{ach.title}</div>
                  <div className="text-xs text-white/40">{ach.description}</div>
                </div>
                {isUnlocked && (
                  <div className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${ach.color}18`, color: ach.color }}>
                    UNLOCKED
                  </div>
                )}
              </motion.div>
            )
          })}

          {/* Secret badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6 }}
            className={`glass rounded-2xl p-5 flex flex-col items-center gap-3 text-center transition-all duration-500 ${
              secretAch && unlocked.has(secretAch.id) ? '' : 'opacity-30 grayscale'
            }`}
            style={secretAch && unlocked.has(secretAch.id) ? { boxShadow: '0 0 30px #FFD70022', border: '1px solid #FFD70044' } : {}}
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl bg-[#FFD70014] border border-[#FFD70033]">
              {secretAch && unlocked.has(secretAch.id) ? '🎮' : '❓'}
            </div>
            <div>
              <div className="text-sm font-display font-semibold text-white mb-0.5">Secret Badge</div>
              <div className="text-xs text-white/40">Try the Konami code ↑↑↓↓←→←→BA</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
