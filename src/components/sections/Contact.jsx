import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import emailjs from '@emailjs/browser'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Shiva1325', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ) },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shiva-patibandla-515453120/', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ) },
  { label: 'Instagram', href: 'https://www.instagram.com/shiva_s.s/', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ) },
  { label: 'Email', href: 'mailto:kumar.shivasai8@gmail.com', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ) },
]

export default function Contact({ onUnlock }) {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '' })
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus]   = useState('idle')
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true })

  useEffect(() => { if (inView) onUnlock('contact') }, [inView, onUnlock])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Honeypot — bots fill this, humans don't
    if (honeypot) return

    // Rate limit — one submission per 60 seconds
    const lastSent = parseInt(localStorage.getItem('_contact_last') || '0', 10)
    if (Date.now() - lastSent < 60_000) {
      setStatus('rate')
      return
    }

    setStatus('loading')
    localStorage.setItem('_contact_last', Date.now().toString())

    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    emailjs.send(
      serviceId,
      templateId,
      { from_name: form.name, reply_to: form.email, message: form.message, phone: form.phone || 'N/A' },
      { publicKey }
    )
      .then(() => {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', message: '' })
      })
      .catch(() => setStatus('error'))
  }

  return (
    <section id="contact" className="section-pad dot-grid" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-px bg-[#F97316]" />
          <span className="text-xs font-mono tracking-widest text-[#F9731688] uppercase">Contact</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-white/50 leading-relaxed mb-8">
              Whether you have a project idea, want to collaborate, or just want to chat about tech — my inbox is always open.
            </p>

            {/* Status */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
              <span className="text-sm font-mono text-[#F9731688]">Salt Lake City, UT · Open to connect</span>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 glass rounded-xl flex items-center justify-center text-white/40 hover:text-[#F97316] hover:border-[#F9731644] transition-all duration-200 hover:scale-110 neon-border"
                  title={s.label}
                  data-hover
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Honeypot — hidden from humans, bots fill it */}
            <input
              type="text"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            {['name', 'email', 'phone', 'message'].map(field => (
              <div key={field} className="relative group">
                <label className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                  {field}
                  {field === 'phone' && <span className="text-white/20 normal-case tracking-normal">optional</span>}
                </label>
                {field === 'message' ? (
                  <textarea
                    required
                    rows={4}
                    value={form[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    className="w-full bg-transparent glass rounded-xl px-4 py-3 text-sm text-white/80 font-mono resize-none outline-none focus:border-[#F9731666] transition-colors border border-white/5"
                    placeholder={`Your ${field}...`}
                  />
                ) : (
                  <input
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                    required={field !== 'phone'}
                    value={form[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    className="w-full bg-transparent glass rounded-xl px-4 py-3 text-sm text-white/80 font-mono outline-none focus:border-[#F9731666] transition-colors border border-white/5"
                    placeholder={field === 'phone' ? 'Your phone (optional)' : `Your ${field}...`}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full py-3 rounded-xl font-display font-bold text-sm transition-all duration-300 disabled:opacity-70"
              style={{
                background: status === 'success' ? '#00FF88'
                  : status === 'error' || status === 'rate' ? '#FF4444'
                  : '#F97316',
                color: '#050A0E'
              }}
              onClick={status === 'error' || status === 'rate' ? () => setStatus('idle') : undefined}
              data-hover
            >
              {status === 'idle'    && 'Send Message'}
              {status === 'loading' && (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending...
                </span>
              )}
              {status === 'success' && '✓ Message Sent!'}
              {status === 'error'   && '✕ Failed — Click to Retry'}
              {status === 'rate'    && '⏱ Please wait 60s before sending again'}
            </button>
          </motion.form>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <span className="text-xs font-mono text-white/20">
            © 2026 Shiva Patibandla · Built with React + Vite + GSAP
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-mono text-white/30 hover:text-[#F97316] transition-colors flex items-center gap-1"
            data-hover
          >
            Back to top ↑
          </button>
        </motion.div>
      </div>
    </section>
  )
}
