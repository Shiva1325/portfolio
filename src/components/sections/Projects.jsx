import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import VanillaTilt from 'vanilla-tilt'
import { projects, projectCategories } from '../../data/projects'

function ProjectCard({ project, inView, index, onProjectClick }) {
  const tiltRef = useRef(null)

  useEffect(() => {
    if (!tiltRef.current) return
    VanillaTilt.init(tiltRef.current, {
      max: 12, speed: 400, glare: true, 'max-glare': 0.1, scale: 1.03,
    })
    return () => tiltRef.current?.vanillaTilt?.destroy()
  }, [])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={project.featured ? 'md:col-span-2' : ''}
    >
      <div
        ref={tiltRef}
        className="glass rounded-2xl overflow-hidden group h-full flex flex-col cursor-pointer"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        onClick={() => onProjectClick(project)}
        data-hover
      >
        <div className={`relative ${project.featured ? 'h-48' : 'h-32'} bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
          <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{project.icon}</span>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <a href={project.github} target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-mono hover:bg-white/20 transition-colors" data-hover>
              GitHub ↗
            </a>
            {project.live && project.live !== '#' && (
              <a href={project.live} target="_blank" rel="noreferrer"
                onClick={e => e.stopPropagation()}
                className="px-4 py-2 rounded-full bg-[#F97316] text-[#050A0E] text-xs font-mono font-bold hover:opacity-90 transition-opacity" data-hover>
                Live ↗
              </a>
            )}
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-base font-display font-bold text-white group-hover:text-[#F97316] transition-colors">{project.title}</h3>
            <span className="text-[10px] font-mono text-white/30 ml-2 flex-shrink-0">{project.category}</span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(t => (
              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects({ onUnlock }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  useEffect(() => { if (inView) onUnlock('projects') }, [inView, onUnlock])

  const handleProjectClick = (project) => {
    if (project.github && project.github !== '#') window.open(project.github, '_blank')
  }

  const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="section-pad dot-grid" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-3 mb-12">
          <div className="w-8 h-px bg-[#22D3EE]" />
          <span className="text-xs font-mono tracking-widest text-[#22D3EE88] uppercase">Projects</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-5xl font-display font-bold mb-10">
          Things I've <span className="gradient-text">Built</span>
        </motion.h2>

        <div className="flex flex-wrap gap-2 mb-10">
          {projectCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                activeCategory === cat ? 'bg-[#22D3EE] text-[#050A0E] font-bold' : 'glass text-white/50 hover:text-white/80'
              }`} data-hover>
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} inView={inView} index={i} onProjectClick={handleProjectClick} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }} className="flex justify-center mt-14">
          <a href="https://github.com/Shiva1325" target="_blank" rel="noreferrer"
            className="group flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#F9731644] text-[#F97316] font-display font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#F973160A] hover:border-[#F9731688] hover:shadow-[0_0_24px_rgba(249,115,22,0.15)] hover:scale-105" data-hover>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View All on GitHub
            <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
