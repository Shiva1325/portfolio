import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { education } from '../../data/education'
import { PittLogo, ISMLogo } from '../ui/Logos'

function UniversityLogo({ university }) {
  if (university.includes('Pittsburgh'))   return <PittLogo className="w-14 h-14" />
  if (university.includes('IIT') || university.includes('ISM') || university.includes('Indian'))
    return <ISMLogo className="w-14 h-14" />
  const initials = university.split(/[\s()]+/).filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase()
  return (
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-base font-bold font-mono flex-shrink-0 bg-[#F9731614] border border-[#F9731633] text-[#F97316]">
      {initials}
    </div>
  )
}

export default function Education() {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true })

  return (
    <section id="education" className="section-pad" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-px bg-[#F97316]" />
          <span className="text-xs font-mono tracking-widest text-[#F9731688] uppercase">Education</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-5xl font-display font-bold mb-14"
        >
          Academic <span className="gradient-text">Foundation</span>
        </motion.h2>

        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="glass rounded-2xl p-8 neon-border"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <UniversityLogo university={edu.university} />

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1 mb-0.5">
                    <div className="overflow-hidden">
                      <motion.h3
                        initial={{ y: '100%' }}
                        animate={inView ? { y: '0%' } : {}}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
                        className="text-xl md:text-3xl font-display font-bold neon-text"
                      >
                        {edu.degree}
                      </motion.h3>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="text-sm font-mono text-white/30 whitespace-nowrap">{edu.duration}</span>
                      {edu.gpa && (
                        <span className="text-xs font-mono text-[#00FF88] px-2.5 py-0.5 rounded-full bg-[#00FF8814] border border-[#00FF8833] whitespace-nowrap">
                          GPA {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <motion.p
                      initial={{ y: '100%' }}
                      animate={inView ? { y: '0%' } : {}}
                      transition={{ delay: 0.45 + i * 0.1, duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
                      className="text-base md:text-lg text-white/70 font-display"
                    >
                      {edu.major}
                    </motion.p>
                  </div>
                  <p className="text-white/40 font-mono text-xs md:text-sm mt-1.5 leading-snug">{edu.university} · {edu.location}</p>
                </div>
              </div>

              {/* Honors */}
              {edu.honors.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {edu.honors.map(h => (
                    <span key={h} className="text-xs font-mono px-3 py-1 rounded-full bg-[#FFB80014] text-[#FFB800CC] border border-[#FFB80033]">
                      🏅 {h}
                    </span>
                  ))}
                </div>
              )}

              {/* Courses */}
              <div>
                <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">Key Courses</p>
                <div className="flex flex-wrap gap-2">
                  {edu.courses.map((c, ci) => (
                    <motion.span
                      key={c}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + ci * 0.06 }}
                      className="text-xs font-mono px-2.5 py-1 rounded-full glass text-white/50 border border-white/5 hover:text-[#F97316] hover:border-[#F9731633] transition-colors cursor-default"
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
