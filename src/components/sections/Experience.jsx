import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '../../data/experience'
import { GoldmanSachsLogo, HexagonLogo, PittLogo, D2SolLogo, SCIGSOLogo, LevyLabLogo } from '../ui/Logos'

gsap.registerPlugin(ScrollTrigger)

function CompanyLogo({ company, color }) {
  if (company.includes('Goldman'))    return <GoldmanSachsLogo />
  if (company.includes('Hexagon'))    return <HexagonLogo />
  if (company.includes('SCI'))        return <SCIGSOLogo />
  if (company.includes('LevyLab'))    return <LevyLabLogo />
  if (company.includes('Pittsburgh')) return <PittLogo />
  if (company.includes('D2Sol'))      return <D2SolLogo />
  const initials = company.split(/[\s—-]+/).slice(0,2).map(w=>w[0]).join('').toUpperCase()
  return (
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold font-mono flex-shrink-0"
      style={{ background: `${color}18`, border: `1px solid ${color}44`, color }}>
      {initials}
    </div>
  )
}

export default function Experience({ onUnlock }) {
  const lineRef    = useRef(null)
  const sectionRef = useRef(null)
  const { ref: inViewRef, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  useEffect(() => {
    if (!inView) return
    onUnlock('experience')
    if (!lineRef.current) return
    gsap.fromTo(lineRef.current,
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 1, duration: 1.2, ease: 'power2.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', end: 'bottom 60%', scrub: 0.8 }
      }
    )
  }, [inView, onUnlock])

  return (
    <section id="experience" className="section-pad dot-grid" ref={sectionRef}>
      <div ref={inViewRef} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-px bg-[#00FF88]" />
          <span className="text-xs font-mono tracking-widest text-[#00FF8888] uppercase">Experience</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-5xl font-display font-bold mb-14"
        >
          Career <span className="gradient-text">Journey</span>
        </motion.h2>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-white/5">
            <div ref={lineRef} className="absolute inset-0 bg-[#F9731644]" style={{ scaleY: 0 }} />
          </div>

          <div className="space-y-10">
            {experience.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6, ease: 'power2.out' }}
                className="relative pl-14"
              >
                {/* Timeline node */}
                <div
                  className="absolute left-0 top-6 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: `${job.color}18`, border: `1px solid ${job.color}55` }}
                >
                  <div className="w-3 h-3 rounded-full relative pulse-ring" style={{ background: job.color }} />
                </div>

                <div
                  className="glass rounded-2xl p-6 hover:scale-[1.01] transition-transform duration-300"
                  style={{ borderColor: `${job.color}22`, boxShadow: `0 0 40px ${job.color}08` }}
                >
                  {/* Header row */}
                  <div className="flex items-start gap-3 mb-4">
                    <CompanyLogo company={job.company} color={job.color} />

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-display font-bold text-white leading-tight">{job.title}</h3>
                      <p className="text-sm font-mono mt-1" style={{ color: job.color }}>{job.company}</p>
                      <p className="text-xs font-mono text-white/30 mt-0.5">{job.location}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs font-mono text-white/30">{job.duration}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 font-mono">{job.type}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {job.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2 text-sm text-white/60">
                        <span style={{ color: job.color }} className="mt-1.5 flex-shrink-0">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {job.tech.map(t => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{ background: `${job.color}14`, color: `${job.color}CC`, border: `1px solid ${job.color}33` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
