import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills, skillCategories } from '../../data/skills'

const COLOR = { Frontend: '#818CF8', Backend: '#F472B6', Cloud: '#00FF88', Data: '#FFB800' }
const getColor = (cat) => COLOR[cat] || '#818CF8'

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
  // Deep colour blobs — very faint, just add tonal depth
  const colorBlobs = [
    { color: '#818CF8', w: 500, h: 420, left: '5%',   top: '-10%',   anim: 'nebula-1 18s ease-in-out infinite',          op: 0.055 },
    { color: '#F472B6', w: 460, h: 460, right: '-5%',  top: '5%',    anim: 'nebula-2 22s ease-in-out infinite',          op: 0.06  },
    { color: '#00FF88', w: 340, h: 320, left: '25%',   bottom: '-5%', anim: 'nebula-3 15s ease-in-out infinite',         op: 0.035 },
  ]

  // White smoke wisps — multiple staggered risers
  const wisps = [
    { w: 160, h: 200, left: '18%', bottom: '0%',   blur: 55,  anim: 'smoke-rise-1 9s ease-out  infinite',       delay: '0s'    },
    { w: 200, h: 240, left: '38%', bottom: '-5%',  blur: 65,  anim: 'smoke-rise-2 11s ease-out infinite',       delay: '2.5s'  },
    { w: 140, h: 180, left: '58%', bottom: '0%',   blur: 50,  anim: 'smoke-rise-3 8s ease-out  infinite',       delay: '1.2s'  },
    { w: 180, h: 220, left: '75%', bottom: '-3%',  blur: 60,  anim: 'smoke-rise-1 12s ease-out infinite',       delay: '4s'    },
    { w: 120, h: 160, left: '6%',  bottom: '5%',   blur: 45,  anim: 'smoke-rise-2 10s ease-out infinite',       delay: '3.1s'  },
    { w: 220, h: 260, left: '48%', bottom: '-8%',  blur: 70,  anim: 'smoke-rise-3 14s ease-out infinite',       delay: '5.8s'  },
    { w: 150, h: 190, left: '28%', bottom: '2%',   blur: 52,  anim: 'smoke-rise-1 10s ease-out infinite',       delay: '7s'    },
    // Wide low ground-hugging haze
    { w: 700, h: 80,  left: '0%',  bottom: '0%',   blur: 30,  anim: 'smoke-sway 14s ease-in-out infinite',      delay: '0s',  op: 0.03 },
    { w: 600, h: 70,  left: '10%', bottom: '8%',   blur: 28,  anim: 'smoke-sway 18s ease-in-out infinite reverse', delay: '3s', op: 0.025 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
      {/* Colour depth layer */}
      {colorBlobs.map((b, i) => (
        <div key={`c${i}`} className="absolute rounded-full"
          style={{ width: b.w, height: b.h,
            ...(b.left  ? { left: b.left }  : {}),
            ...(b.right ? { right: b.right } : {}),
            ...(b.top   ? { top: b.top }    : {}),
            ...(b.bottom? { bottom: b.bottom} : {}),
            background: b.color,
            filter: `blur(110px)`,
            opacity: b.op,
            animation: b.anim,
          }}
        />
      ))}

      {/* Smoke wispslayer */}
      {wisps.map((w, i) => (
        <div key={`s${i}`} className="absolute rounded-full"
          style={{
            width: w.w, height: w.h,
            left: w.left,
            bottom: w.bottom,
            background: 'rgba(220,230,255,1)',
            filter: `blur(${w.blur}px)`,
            opacity: w.op ?? 0,
            animation: w.anim,
            animationDelay: w.delay,
            transformOrigin: 'bottom center',
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

  return (
    <div
      className="absolute inset-0 select-none cursor-grab active:cursor-grabbing"
      onMouseDown={onMouseDown} onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}   onMouseLeave={onMouseUp}
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
          background: '#818CF8', boxShadow: '0 0 36px 12px #818CF844' }} />

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
          <div className="w-8 h-px bg-[#F472B6]" />
          <span className="text-xs font-mono tracking-widest text-[#F472B688] uppercase">Skills</span>
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
                  ? { background: getColor(cat) || '#818CF8', color: '#050A0E', fontWeight: 700 }
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

          {/* Legend overlay bottom-left */}
          <div className="absolute bottom-5 left-6 flex gap-4 z-10 pointer-events-none">
            {Object.entries(COLOR).map(([cat, color]) => (
              <div key={cat} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 5px ${color}` }} />
                <span className="text-[9px] font-mono text-white/30">{cat}</span>
              </div>
            ))}
          </div>

          {/* Hint overlay */}
          <p className="absolute bottom-5 right-6 text-[9px] font-mono text-white/20 tracking-[0.18em] z-10 pointer-events-none">
            DRAG TO ROTATE
          </p>
        </motion.div>
      </div>
    </section>
  )
}
