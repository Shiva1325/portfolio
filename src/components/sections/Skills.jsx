import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills, skillCategories } from '../../data/skills'

const COLOR = { Frontend: '#F97316', Backend: '#22D3EE', Cloud: '#00FF88', Data: '#FFB800' }
const getColor = (cat) => COLOR[cat] || '#F97316'

const R = 200

function buildPositions(n) {
  return Array.from({ length: n }, (_, i) => {
    const phi   = Math.acos(1 - 2 * (i + 0.5) / n)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    return {
      x: R * Math.sin(phi) * Math.cos(theta),
      y: R * Math.sin(phi) * Math.sin(theta),
      z: R * Math.cos(phi),
    }
  })
}
function applyRY(p, a) {
  const c = Math.cos(a), s = Math.sin(a)
  return { x: p.x*c + p.z*s, y: p.y, z: -p.x*s + p.z*c }
}
function applyRX(p, a) {
  const c = Math.cos(a), s = Math.sin(a)
  return { x: p.x, y: p.y*c - p.z*s, z: p.y*s + p.z*c }
}

// ── Smoke + colour-depth background ──────────────────────────────
function SmokeBg() {
  const colorBlobs = [
    { color: '#F97316', w: 600, h: 500, left: '0%',   top: '-15%',   anim: 'nebula-1 18s ease-in-out infinite',   op: 0.28 },
    { color: '#22D3EE', w: 560, h: 560, right: '-5%',  top: '0%',    anim: 'nebula-2 22s ease-in-out infinite',   op: 0.24 },
    { color: '#00FF88', w: 420, h: 400, left: '22%',   bottom: '-10%', anim: 'nebula-3 15s ease-in-out infinite', op: 0.18 },
    { color: '#F97316', w: 300, h: 280, left: '50%',   top: '10%',   anim: 'nebula-2 20s ease-in-out infinite',   op: 0.12 },
  ]

  const wisps = [
    { w: 210, h: 270, left: '18%', bottom: '0%',   blur: 55,  anim: 'smoke-rise-1 9s ease-out  infinite',          delay: '0s'   },
    { w: 260, h: 310, left: '38%', bottom: '-5%',  blur: 65,  anim: 'smoke-rise-2 11s ease-out infinite',          delay: '2.5s' },
    { w: 185, h: 245, left: '58%', bottom: '0%',   blur: 50,  anim: 'smoke-rise-3 8s ease-out  infinite',          delay: '1.2s' },
    { w: 230, h: 290, left: '75%', bottom: '-3%',  blur: 60,  anim: 'smoke-rise-1 12s ease-out infinite',          delay: '4s'   },
    { w: 165, h: 225, left: '6%',  bottom: '5%',   blur: 45,  anim: 'smoke-rise-2 10s ease-out infinite',          delay: '3.1s' },
    { w: 290, h: 340, left: '48%', bottom: '-8%',  blur: 70,  anim: 'smoke-rise-3 14s ease-out infinite',          delay: '5.8s' },
    { w: 200, h: 260, left: '28%', bottom: '2%',   blur: 52,  anim: 'smoke-rise-1 10s ease-out infinite',          delay: '7s'   },
    // Ground-hugging haze
    { w: 900, h: 110, left: '-5%', bottom: '0%',   blur: 35,  anim: 'smoke-sway 14s ease-in-out infinite',         delay: '0s',  op: 0.18 },
    { w: 750, h: 90,  left: '8%',  bottom: '10%',  blur: 30,  anim: 'smoke-sway 18s ease-in-out infinite reverse', delay: '3s',  op: 0.13 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
      {/* Neon glow blobs — screen blend so they shine through smoke */}
      {colorBlobs.map((b, i) => (
        <div key={`c${i}`} className="absolute rounded-full"
          style={{ width: b.w, height: b.h,
            ...(b.left  ? { left: b.left }  : {}),
            ...(b.right ? { right: b.right } : {}),
            ...(b.top   ? { top: b.top }    : {}),
            ...(b.bottom? { bottom: b.bottom} : {}),
            background: b.color,
            filter: 'blur(100px)',
            opacity: b.op,
            animation: b.anim,
            mixBlendMode: 'screen',
          }}
        />
      ))}

      {/* Smoke wisps — rise from bottom and fade */}
      {wisps.map((w, i) => (
        <div key={`s${i}`} className="absolute rounded-full"
          style={{
            width: w.w, height: w.h,
            left: w.left,
            bottom: w.bottom,
            background: 'rgba(210,225,245,1)',
            filter: `blur(${w.blur}px)`,
            opacity: w.op ?? 0,
            animation: w.anim,
            animationDelay: w.delay,
            transformOrigin: 'bottom center',
            mixBlendMode: 'overlay',
          }}
        />
      ))}
    </div>
  )
}

// ── Sphere ────────────────────────────────────────────────────────
function SkillSphere({ activeCategory }) {
  const tagRefs   = useRef([])
  const raf       = useRef(null)
  const angleY    = useRef(0)
  const angleX    = useRef(0.22)
  const velY      = useRef(0.005)
  const drag      = useRef(null)
  const positions = useMemo(() => buildPositions(skills.length), [])

  useEffect(() => {
    const frame = () => {
      if (!drag.current) angleY.current += velY.current
      skills.forEach((skill, i) => {
        const el = tagRefs.current[i]
        if (!el) return
        const p1 = applyRY(positions[i], angleY.current)
        const p2 = applyRX(p1, angleX.current)
        const depth = (p2.z + R) / (2 * R)
        const on    = activeCategory === 'All' || skill.category === activeCategory
        const scale = 0.6 + depth * 0.6
        const opac  = on ? (0.18 + depth * 0.82) : 0.06
        const hex   = Math.round(28 + depth * 88).toString(16).padStart(2, '0')
        const glow  = on && depth > 0.72 ? `0 0 14px ${getColor(skill.category)}66` : 'none'
        el.style.transform  = `translate(${p2.x}px,${p2.y}px) scale(${scale})`
        el.style.opacity    = opac
        el.style.zIndex     = Math.round(depth * 100)
        el.style.boxShadow  = glow
        el.style.borderColor = `${getColor(skill.category)}${on ? hex : '0e'}`
      })
      raf.current = requestAnimationFrame(frame)
    }
    raf.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf.current)
  }, [positions, activeCategory])

  const onMouseDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY, ry: angleY.current, rx: angleX.current }
  }
  const onMouseMove = (e) => {
    if (!drag.current) return
    const dx = (e.clientX - drag.current.x) * 0.007
    const dy = (e.clientY - drag.current.y) * 0.007
    angleY.current = drag.current.ry + dx
    angleX.current = Math.max(-0.7, Math.min(0.7, drag.current.rx + dy))
    velY.current   = dx * 0.22
  }
  const onMouseUp = () => { drag.current = null }

  const onTouchStart = (e) => {
    const t = e.touches[0]
    drag.current = { x: t.clientX, y: t.clientY, ry: angleY.current, rx: angleX.current }
  }
  const onTouchMove = (e) => {
    if (!drag.current) return
    const t = e.touches[0]
    const dx = (t.clientX - drag.current.x) * 0.007
    const dy = (t.clientY - drag.current.y) * 0.007
    angleY.current = drag.current.ry + dx
    angleX.current = Math.max(-0.7, Math.min(0.7, drag.current.rx + dy))
    velY.current   = dx * 0.22
  }
  const onTouchEnd = () => { drag.current = null }

  return (
    <div
      className="absolute inset-0 select-none cursor-grab active:cursor-grabbing"
      onMouseDown={onMouseDown} onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}   onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
    >
      {/* Faint sphere ring */}
      <div className="absolute rounded-full border border-white/[0.05] pointer-events-none"
        style={{ width: R*2, height: R*2,
          left: `calc(50% - ${R}px)`, top: `calc(50% - ${R}px)` }} />
      <div className="absolute border-t border-white/[0.03] pointer-events-none"
        style={{ width: R*2, left: `calc(50% - ${R}px)`, top: '50%' }} />

      {/* Core glow */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 12, height: 12,
          left: 'calc(50% - 6px)', top: 'calc(50% - 6px)',
          background: '#F97316', boxShadow: '0 0 36px 12px #F9731644' }} />

      {/* Tags */}
      <div className="absolute" style={{ left: '50%', top: '50%' }}>
        {skills.map((skill, i) => (
          <div key={skill.name}
            ref={el => tagRefs.current[i] = el}
            className="absolute px-3 py-1.5 rounded-full text-[11px] font-mono whitespace-nowrap pointer-events-auto"
            style={{
              transform: 'translate(-9999px,-9999px)',
              background: `${getColor(skill.category)}0e`,
              border: `1px solid ${getColor(skill.category)}30`,
              color: 'rgba(255,255,255,0.88)',
              willChange: 'transform,opacity',
              transformOrigin: '50% 50%',
            }}
            data-hover
          >
            {skill.icon}&nbsp;{skill.name}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────
export default function Skills({ onUnlock }) {
  const [active, setActive] = useState('All')
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => { if (inView) onUnlock('skills') }, [inView, onUnlock])

  return (
    <section id="skills" className="section-pad" ref={ref}>
      <div className="max-w-6xl mx-auto">

        <motion.div initial={{ opacity:0, x:-20 }} animate={inView ? {opacity:1,x:0} : {}}
          className="flex items-center gap-3 mb-12">
          <div className="w-8 h-px bg-[#22D3EE]" />
          <span className="text-xs font-mono tracking-widest text-[#22D3EE88] uppercase">Skills</span>
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} animate={inView ? {opacity:1,y:0} : {}}
          className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            My <span className="gradient-text">Arsenal</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {skillCategories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} data-hover
                className="px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200"
                style={active === cat
                  ? { background: getColor(cat) || '#F97316', color: '#050A0E', fontWeight: 700 }
                  : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.45)',
                      border: '1px solid rgba(255,255,255,0.08)' }
                }
              >{cat}</button>
            ))}
          </div>
        </motion.div>

        {/* Sphere + nebula container */}
        <motion.div
          initial={{ opacity:0, scale:0.96 }}
          animate={inView ? { opacity:1, scale:1 } : {}}
          transition={{ delay:0.2, duration:0.7 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ height: 520, background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <SmokeBg />
          {inView && <SkillSphere activeCategory={active} />}

          {/* Legend + hint stacked at bottom */}
          <div className="absolute bottom-4 left-0 right-0 px-5 flex flex-col items-center gap-2 z-10 pointer-events-none sm:flex-row sm:justify-between sm:items-end">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 sm:justify-start">
              {Object.entries(COLOR).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 5px ${color}` }} />
                  <span className="text-[9px] font-mono text-white/30">{cat}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] font-mono text-white/35 tracking-[0.15em]">DRAG TO ROTATE</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
