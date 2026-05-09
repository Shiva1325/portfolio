import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef    = useRef(null)
  const ringRef   = useRef(null)  // outer: position only, no CSS transition
  const innerRef  = useRef(null)  // inner: scale only, CSS transition OK
  const pos       = useRef({ x: -100, y: -100 })
  const ring      = useRef({ x: -100, y: -100 })
  const rafRef    = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.13
      ring.current.y += (pos.current.y - ring.current.y) * 0.13
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      innerRef.current?.classList.add('scale-[2.2]', 'opacity-80', '!border-[#F97316]')
      dotRef.current?.classList.add('opacity-0')
    }
    const onLeave = () => {
      innerRef.current?.classList.remove('scale-[2.2]', 'opacity-80', '!border-[#F97316]')
      dotRef.current?.classList.remove('opacity-0')
    }
    const onClick = () => {
      innerRef.current?.classList.add('scale-50')
      setTimeout(() => innerRef.current?.classList.remove('scale-50'), 150)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('click', onClick)

    const bind = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    bind()

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Dot — position set directly via JS, no CSS transition */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-150"
        style={{ willChange: 'transform' }}
      >
        <div className="w-2 h-2 bg-[#F97316] rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Ring outer — position only via RAF spring, zero CSS transition on transform */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ willChange: 'transform' }}
      >
        {/* Ring inner — only scale changes via CSS transition, never position */}
        <div
          ref={innerRef}
          className="w-10 h-10 rounded-full border border-[#F9731644] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
        />
      </div>
    </>
  )
}
