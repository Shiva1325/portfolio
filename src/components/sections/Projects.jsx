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
        {/* Card top — gradient banner */}
        <div
          className={`relative ${project.featured ? 'h-48' : 'h-32'} bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
        >
          <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{project.icon}</span>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-mono hover:bg-white/20 transition-colors"
              data-hover
            >
              GitHub ↗
            </a>
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                className="px-4 py-2 rounded-full bg-[#818CF8] text-[#050A0E] text-xs font-mono font-bold hover:opacity-90 transition-opacity"
                data-hover
              >
                Live ↗
              </a>
            )}
          </div>
        </div>

        {/* Card body */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-base font-display font-bold text-white group-hover:text-[#818CF8] transition-colors">{project.title}</h3>
            <span className="text-[10px] font-mono text-white/30 ml-2 flex-shrink-0">{project.category}</span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(t => (
              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5">
                {t}
              </span>
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
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-px bg-[#FF6B6B]" />
          <span className="text-xs font-mono tracking-widest text-[#FF6B6B88] uppercase">Projects</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-5xl font-display font-bold mb-10"
        >
          Things I've <span className="gradient-text">Built</span>
        </motion.h2>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {projectCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#FF6B6B] text-white font-bold'
                  : 'glass text-white/50 hover:text-white/80'
              }`}
              data-hover
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                inView={inView}
                index={i}
                onProjectClick={handleProjectClick}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
