import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import VanillaTilt from 'vanilla-tilt'
import { projects, projectCategories } from '../../data/projects'

// Only these repos appear in the live GitHub feed
const LIVE_REPOS_WHITELIST = new Set([
  'colloid',
  'dlrm',
  'MLPredictionPipeline',
  'Cassandra_Go',
  'StreamlitXGBoost',
])

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

// ── Live GitHub repos strip ──────────────────────────────────────
function GitHubRepoCard({ repo, index }) {
  const langColors = {
    JavaScript: '#F7DF1E', TypeScript: '#3178C6', Python: '#3572A5',
    Java: '#B07219', Go: '#00ADD8', 'C#': '#239120', HTML: '#E34C26',
    CSS: '#563D7C', Shell: '#89E051',
  }
  const color = langColors[repo.language] || '#888'

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="glass rounded-xl p-4 flex flex-col gap-3 hover:border-[#F9731644] transition-all duration-200 hover:scale-[1.02] group"
      data-hover
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-white/30 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span className="text-sm font-display font-semibold text-white/80 group-hover:text-[#F97316] transition-colors truncate">{repo.name}</span>
        </div>
        <svg className="w-3.5 h-3.5 text-white/20 group-hover:text-[#F97316] flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      <p className="text-xs text-white/40 leading-relaxed line-clamp-2 flex-1">
        {repo.description || 'No description'}
      </p>

      <div className="flex items-center gap-3 text-[10px] font-mono text-white/30">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: color }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            {repo.stargazers_count}
          </span>
        )}
        <span className="ml-auto">{new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
      </div>
    </motion.a>
  )
}

function LiveGitHubRepos({ inView }) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastFetched, setLastFetched] = useState(null)

  useEffect(() => {
    if (!inView) return
    fetch('https://api.github.com/users/Shiva1325/repos?sort=updated&per_page=20&type=public')
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data)) return
        const filtered = data.filter(r => !r.fork && LIVE_REPOS_WHITELIST.has(r.name))
        setRepos(filtered)
        setLastFetched(new Date())
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [inView])

  if (loading) return (
    <div className="flex items-center gap-2 text-white/20 text-xs font-mono mt-16">
      <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
      </svg>
      Loading live repos...
    </div>
  )

  if (!repos.length) return null

  return (
    <div className="mt-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
          <span className="text-xs font-mono text-white/40 tracking-widest uppercase">Live from GitHub</span>
        </div>
        {lastFetched && (
          <span className="text-[10px] font-mono text-white/20">
            synced {lastFetched.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo, i) => (
          <GitHubRepoCard key={repo.id} repo={repo} index={i} />
        ))}
      </div>
    </div>
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
          <div className="w-8 h-px bg-[#FF6B6B]" />
          <span className="text-xs font-mono tracking-widest text-[#FF6B6B88] uppercase">Projects</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-5xl font-display font-bold mb-10">
          Things I've <span className="gradient-text">Built</span>
        </motion.h2>

        <div className="flex flex-wrap gap-2 mb-10">
          {projectCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                activeCategory === cat ? 'bg-[#FF6B6B] text-white font-bold' : 'glass text-white/50 hover:text-white/80'
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

        {/* Live GitHub repos — always current, no rebuild needed */}
        {activeCategory === 'All' && <LiveGitHubRepos inView={inView} />}

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
