import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'

const stats = [
  { value: 4,    suffix: '+', label: 'Years Experience', color: '#F97316' },
  { value: 5,    suffix: '',  label: 'Companies',        color: '#22D3EE' },
  { value: 20,   suffix: '+', label: 'Skills Mastered',  color: '#00FF88' },
  { value: 1200, suffix: '+', label: 'Users Served',     color: '#FFB800' },
]

function CountUp({ value, suffix, color, inView }) {
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    if (!inView || animated.current || !ref.current) return
    animated.current = true
    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix
      },
    })
  }, [inView, value, suffix])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold" style={{ color }}>
      0{suffix}
    </span>
  )
}

// ── Animated Profile Photo ────────────────────────────────────────
function ProfilePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative w-44 h-44 mx-auto flex-shrink-0"
    >
      {/* Outer ambient glow */}
      <motion.div
        className="absolute -inset-4 rounded-full pointer-events-none"
        animate={{ opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 70%)',
        }}
      />

      {/* Spinning conic gradient ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{
          background: 'conic-gradient(from 0deg, #F97316, #22D3EE, #00FF88, #FFB800, #F97316)',
          padding: 3,
          borderRadius: '50%',
        }}
      />

      {/* Dark gap */}
      <div className="absolute inset-[3px] rounded-full bg-[#050A0E]" />

      {/* Photo with scan sweep */}
      <div className="absolute inset-[3px] rounded-full overflow-hidden">
        <img
          src={import.meta.env.BASE_URL + 'avatar.jpg'}
          alt="Shiva Patibandla"
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-x-0 h-[40%] pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(249,115,22,0.18), transparent)',
          }}
          animate={{ top: ['-40%', '140%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 6 }}
        />
      </div>

      {/* Status dot */}
      <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-[#050A0E] flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-[#00FF88] relative">
          <div className="absolute inset-0 rounded-full bg-[#00FF88] animate-ping opacity-60" />
        </div>
      </div>
    </motion.div>
  )
}

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="about" className="section-pad dot-grid" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-px bg-[#F97316]" />
          <span className="text-xs font-mono tracking-widest text-[#F9731688] uppercase">About Me</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: photo + stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center md:items-start gap-8"
          >
            <ProfilePhoto />

            <div className="grid grid-cols-2 gap-4 w-full">
              {stats.map(s => (
                <div
                  key={s.label}
                  className="glass rounded-2xl p-5 flex flex-col gap-2 hover:scale-105 transition-transform duration-300"
                  style={{ borderColor: `${s.color}22`, boxShadow: `0 0 30px ${s.color}08` }}
                >
                  <CountUp value={s.value} suffix={s.suffix} color={s.color} inView={inView} />
                  <span className="text-white/40 text-sm font-display">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              I build things that <span className="gradient-text">matter</span>
            </h2>
            <div className="space-y-4 text-white/60 text-base leading-relaxed">
              <p>
                I'm Shiva Patibandla, a software engineer at Goldman Sachs building critical financial systems. I thrive across the full stack — Java and .NET backends, React and Angular frontends, distributed systems in Go.
              </p>
              <p>
                Over 4+ years across Goldman Sachs, Hexagon, and the University of Pittsburgh, I've shipped features used by thousands, led SSO integrations, built ETL pipelines, and obsessed over clean, maintainable code.
              </p>
              <p>
                MS in Computer Science from University of Pittsburgh. IIT (ISM) Dhanbad alumnus. Outside of work: distributed systems papers, Go side projects, and the occasional Raft implementation.
              </p>
            </div>

            <div className="mt-8 p-4 glass rounded-xl border border-white/5">
              <pre className="font-mono text-xs text-white/30 leading-relaxed">
                <span className="text-[#22D3EE]">const</span>{' '}
                <span className="text-[#F97316]">me</span> = {'{'}
                {'\n  '}
                <span className="text-[#00FF88]">name</span>: <span className="text-white/50">'Shiva Patibandla'</span>,
                {'\n  '}
                <span className="text-[#00FF88]">role</span>: <span className="text-white/50">'Software Engineer'</span>,
                {'\n  '}
                <span className="text-[#00FF88]">location</span>: <span className="text-white/50">'Salt Lake City, UT'</span>
                {'\n}'}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
