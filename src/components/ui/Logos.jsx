// All logos are self-contained inline SVGs — no external URLs

export function GoldmanSachsLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <rect width="44" height="44" fill="#003366" />
        {/* Thin gold accent bar at top */}
        <rect x="0" y="0" width="44" height="3" fill="#C9A84C" />
        {/* GS monogram */}
        <text x="22" y="30" textAnchor="middle"
          fill="#ffffff" fontSize="22" fontWeight="700" fontFamily="Georgia,serif" letterSpacing="1">
          GS
        </text>
      </svg>
    </div>
  )
}

export function HexagonLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <rect width="44" height="44" fill="#fff" />
        {/* Outer hexagon ring */}
        <polygon points="22,5 35,12.5 35,27.5 22,35 9,27.5 9,12.5"
          fill="none" stroke="#00A9E0" strokeWidth="2" />
        {/* Inner fill */}
        <polygon points="22,11 30,15.5 30,24.5 22,29 14,24.5 14,15.5"
          fill="#00A9E018" />
        {/* H letter */}
        <text x="22" y="26" textAnchor="middle"
          fill="#00A9E0" fontSize="13" fontWeight="900" fontFamily="Arial,Helvetica,sans-serif">
          H
        </text>
      </svg>
    </div>
  )
}

export function PittLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <rect width="44" height="44" fill="#003594" />
        {/* Top gold bar */}
        <rect x="0" y="0" width="44" height="5" fill="#FFB81C" />
        {/* Bottom gold bar */}
        <rect x="0" y="39" width="44" height="5" fill="#FFB81C" />
        {/* Shield outline */}
        <path d="M14,8 H30 V26 C30,33 22,37 22,37 C22,37 14,33 14,26 Z"
          fill="none" stroke="#FFB81C" strokeWidth="1.4" opacity="0.7" />
        {/* PITT text */}
        <text x="22" y="29" textAnchor="middle"
          fill="#FFB81C" fontSize="11" fontWeight="900" fontFamily="Georgia,serif" letterSpacing="1.5">
          PITT
        </text>
      </svg>
    </div>
  )
}

export function ISMLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <rect width="44" height="44" fill="#1a1340" />
        {/* Flame */}
        <ellipse cx="22" cy="9" rx="3" ry="4.5" fill="#FFD700" opacity="0.95" />
        <ellipse cx="22" cy="11" rx="1.8" ry="2.8" fill="#FFA500" />
        {/* Wick */}
        <line x1="22" y1="13.5" x2="22" y2="17" stroke="#C5A31B" strokeWidth="1.2" />
        {/* Spout */}
        <path d="M15,21 Q15,18 19,18 L25,18 Q27.5,18 29,16.5 Q31,15 33,15.5 Q31,17 29,18.5 L25,19.5 L22,20"
          fill="none" stroke="#C5A31B" strokeWidth="1.3" strokeLinecap="round" />
        {/* Lamp bowl */}
        <ellipse cx="20" cy="21" rx="7" ry="3" fill="none" stroke="#C5A31B" strokeWidth="1.3" />
        <path d="M13,21 Q12.5,26 15.5,27 L24.5,27 Q27,26 26.5,21"
          fill="#C5A31B1a" stroke="#C5A31B" strokeWidth="1.1" />
        {/* Handle */}
        <path d="M27,23 Q32,23 32,21 Q32,19 27,19"
          fill="none" stroke="#C5A31B" strokeWidth="1.2" />
        {/* Label */}
        <text x="22" y="39" textAnchor="middle"
          fill="#C5A31B" fontSize="7" fontWeight="700" fontFamily="monospace" letterSpacing="0.5">
          IIT ISM
        </text>
      </svg>
    </div>
  )
}

export function D2SolLogo({ color = '#22D3EE', className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl flex-shrink-0 flex items-center justify-center`}
      style={{ background: `${color}18`, border: `1px solid ${color}55` }}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <text x="22" y="21" textAnchor="middle"
          fill={color} fontSize="14" fontWeight="800" fontFamily="monospace" letterSpacing="-0.5">
          D2
        </text>
        <text x="22" y="33" textAnchor="middle"
          fill={color} fontSize="8" fontWeight="500" fontFamily="monospace" letterSpacing="2" opacity="0.7">
          SOL
        </text>
      </svg>
    </div>
  )
}

export function SCIGSOLogo({ className = 'w-11 h-11' }) {
  return <PittLogo className={className} />
}
