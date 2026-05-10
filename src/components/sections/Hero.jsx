import { useEffect, useRef, useState, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useInView } from 'react-intersection-observer'

class WebGLErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

// ── Particle Field ──────────────────────────────────────────────
function ParticleField() {
  const ref = useRef()
  const count = 6000
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 20

  useFrame(({ clock, mouse }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.04
    ref.current.rotation.x = mouse.y * 0.08
    ref.current.rotation.z = mouse.x * 0.04
  })
  return (
    <Points ref={ref} positions={positions} frustumCulled={false}>
      <PointMaterial transparent color="#F97316" size={0.025} sizeAttenuation depthWrite={false} opacity={0.55} />
    </Points>
  )
}

function FloatingGeo({ position, color, speed = 1 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = clock.getElapsedTime() * 0.3 * speed
    ref.current.rotation.y = clock.getElapsedTime() * 0.2 * speed
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed) * 0.3
  })
  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color={color} wireframe opacity={0.4} transparent />
    </mesh>
  )
}

// ── Role Typewriter ──────────────────────────────────────────────
const roles = ['Software Engineer', 'Backend Systems Builder', 'Full-Stack Engineer', 'Distributed Systems Dev']

function TypewriterRole() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = roles[roleIdx]
    let timeout
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 65)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIdx])

  return (
    <span className="neon-text font-mono text-xl md:text-2xl">
      {displayed}<span className="animate-pulse">|</span>
    </span>
  )
}

// ── Terminal Decoration ──────────────────────────────────────────
const terminalLines = [
  { cmd: 'sys.init()',         result: 'OK',   color: '#00FF88' },
  { cmd: 'auth.verify()',      result: 'PASS', color: '#F97316' },
  { cmd: 'assets.load()',      result: '100%', color: '#F97316' },
  { cmd: 'portfolio.render()', result: '→',    color: '#22D3EE' },
]

function TerminalReadout() {
  const [visible, setVisible] = useState(0)
  useEffect(() => {
    let i = 0
    const id = setInterval(() => { i++; setVisible(i); if (i >= terminalLines.length) clearInterval(id) }, 550)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="absolute bottom-20 left-6 z-[2] hidden lg:block">
      <div className="space-y-1">
        {terminalLines.slice(0, visible).map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            className="flex gap-2 items-center font-mono text-[10px]">
            <span className="text-[#00FF88]/40">›</span>
            <span className="text-white/20">{l.cmd}</span>
            <span style={{ color: `${l.color}60` }}>{l.result}</span>
          </motion.div>
        ))}
        {visible >= terminalLines.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex gap-2 items-center font-mono text-[10px]">
            <span className="text-[#00FF88]/40">›</span>
            <span className="text-white/20" style={{ animation: 'terminal-blink 1s step-end infinite' }}>█</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────
function useResumeSyncTime() {
  const [syncTime, setSyncTime] = useState(null)
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}resume-meta.json`)
      .then(r => r.json())
      .then(d => setSyncTime(new Date(d.synced)))
      .catch(() => {})
  }, [])
  return syncTime
}

export default function Hero({ onUnlock }) {
  const nameRef = useRef(null)
  const { ref: inViewRef, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const syncTime = useResumeSyncTime()

  useEffect(() => {
    if (!inView || !nameRef.current) return
    const chars = nameRef.current.querySelectorAll('.char')
    gsap.fromTo(chars,
      { opacity: 0, y: 40, rotationX: -90 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.7, stagger: 0.05, ease: 'back.out(2)' }
    )
    onUnlock('hero')
    const glitchInterval = setInterval(() => {
      if (!nameRef.current) return
      gsap.to(nameRef.current, { skewX: 3, duration: 0.05, yoyo: true, repeat: 3,
        onComplete: () => gsap.set(nameRef.current, { skewX: 0 }) })
    }, 5000)
    return () => clearInterval(glitchInterval)
  }, [inView, onUnlock])

  const scrollDown = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden crt">
      <div className="absolute inset-0 z-0">
        <WebGLErrorBoundary>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} color="#F97316" intensity={0.8} />
            <pointLight position={[-5, -5, -5]} color="#22D3EE" intensity={0.5} />
            <ParticleField />
            <FloatingGeo position={[3.5, 1, -2]} color="#F97316" speed={0.7} />
            <FloatingGeo position={[-3.5, -1, -1]} color="#22D3EE" speed={1.2} />
            <FloatingGeo position={[2, -2, -3]} color="#00FF88" speed={0.5} />
          </Canvas>
        </WebGLErrorBoundary>
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-radial from-transparent via-transparent to-[#050A0E]" />

      <div ref={inViewRef} className="relative z-[2] text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F973160A] border border-[#F9731633] mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
          <span className="text-xs font-mono text-[#F97316CC] tracking-widest">SOFTWARE ENGINEER @ GOLDMAN SACHS</span>
        </motion.div>

        {/* Name */}
        <h1 ref={nameRef} className="font-display font-bold mb-4 leading-none whitespace-nowrap"
          style={{ perspective: '600px', fontSize: 'clamp(1.85rem, 9vw, 8rem)' }}>
          {'Shiva Patibandla'.split('').map((c, i) => (
            <span key={i} className={`char inline-block ${c === ' ' ? 'w-4 md:w-6' : ''}`}
              style={{ opacity: 0, display: 'inline-block' }}
              onMouseEnter={e => {
                gsap.to(e.target, { color: '#F97316', textShadow: '0 0 20px #F97316', duration: 0.1 })
                gsap.to(e.target, { color: '#E8F4FD', textShadow: 'none', duration: 0.4, delay: 0.15 })
              }}>
              {c}
            </span>
          ))}
        </h1>

        <div className="h-10 flex items-center justify-center mb-8">
          <TypewriterRole />
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="text-white/50 text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Software engineer at Goldman Sachs, working on the distributed systems that financial infrastructure runs on. Four years in, and the part I still find most interesting is tracing a failure back to exactly where it started.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row items-start justify-center gap-4">
          <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 rounded-full bg-[#F97316] text-[#050A0E] font-display font-bold text-sm tracking-wide transition-all duration-200 hover:shadow-neon-cyan hover:scale-105 active:scale-95"
            data-hover>
            Explore My Work
          </button>
          <div className="flex flex-col items-center gap-1">
            <a href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Shiva_Patibandla_Resume.pdf"
              className="px-7 py-3 rounded-full border border-[#F9731644] text-[#F97316] font-display font-semibold text-sm tracking-wide transition-all duration-200 hover:bg-[#F973160A] hover:border-[#F9731688]"
              data-hover>
              Download Resume
            </a>
            {syncTime && (
              <span className="text-[10px] font-mono text-white/20">
                synced {syncTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {syncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </motion.div>
      </div>

      <TerminalReadout />

      <button onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-1 text-white/30 hover:text-[#F97316] transition-colors"
        data-hover>
        <span className="text-[10px] font-mono tracking-widest">SCROLL</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
    </section>
  )
}
