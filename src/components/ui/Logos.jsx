// Brand logos — Goldman Sachs served from public/, others are inline SVG

const BASE = import.meta.env.BASE_URL

export function GoldmanSachsLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center bg-white`}
      style={{ padding: '6px' }}>
      <img
        src={`${BASE}logos/goldman_sachs.svg`}
        alt="Goldman Sachs"
        className="w-full h-full object-contain"
      />
    </div>
  )
}

// Hexagon AB — blue geometric hex + wordmark
export function HexagonLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <rect width="44" height="44" fill="#ffffff" />
        {/* Outer hex */}
        <polygon points="22,4 36,12 36,28 22,36 8,28 8,12"
          fill="none" stroke="#00A9E0" strokeWidth="2" />
        {/* Inner hex filled */}
        <polygon points="22,10 31,15.5 31,26.5 22,32 13,26.5 13,15.5"
          fill="#00A9E015" />
        {/* H letterform */}
        <text x="22" y="27" textAnchor="middle"
          fill="#00A9E0" fontSize="14" fontWeight="800" fontFamily="Arial,Helvetica,sans-serif">
          H
        </text>
      </svg>
    </div>
  )
}

// University of Pittsburgh — blue/gold shield + PITT script
export function PittLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <rect width="44" height="44" fill="#003594" />
        {/* Gold accent bars */}
        <rect x="0" y="0" width="44" height="4" fill="#FFB81C" />
        <rect x="0" y="40" width="44" height="4" fill="#FFB81C" />
        {/* Shield shape */}
        <path d="M12,8 H32 V28 C32,36 22,40 22,40 C22,40 12,36 12,28 Z"
          fill="none" stroke="#FFB81C" strokeWidth="1.2" opacity="0.6" />
        {/* PITT text */}
        <text x="22" y="30" textAnchor="middle"
          fill="#FFB81C" fontSize="13" fontWeight="900" fontFamily="Georgia,serif" letterSpacing="1">
          PITT
        </text>
      </svg>
    </div>
  )
}

// IIT (ISM) Dhanbad — navy + gold oil lamp (their iconic symbol)
export function ISMLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <rect width="44" height="44" fill="#1a1340" />
        {/* Flame */}
        <ellipse cx="22" cy="9" rx="3.5" ry="5" fill="#FFD700" opacity="0.9" />
        <ellipse cx="22" cy="11" rx="2" ry="3" fill="#FFA500" />
        {/* Lamp spout */}
        <path d="M14,22 Q14,18 19,18 L25,18 Q28,18 30,16 Q32,14 34,15 Q32,17 30,19 L25,20 L22,20"
          fill="none" stroke="#C5A31B" strokeWidth="1.4" strokeLinecap="round" />
        {/* Lamp bowl */}
        <ellipse cx="20" cy="22" rx="8" ry="3.5" fill="none" stroke="#C5A31B" strokeWidth="1.4" />
        <path d="M12,22 Q11,27 14,28 L26,28 Q29,27 28,22"
          fill="#C5A31B22" stroke="#C5A31B" strokeWidth="1.2" />
        {/* Handle */}
        <path d="M28,24 Q33,24 33,22 Q33,20 28,20"
          fill="none" stroke="#C5A31B" strokeWidth="1.2" />
        {/* Wick stem */}
        <line x1="22" y1="18" x2="22" y2="13" stroke="#C5A31B" strokeWidth="1" />
        {/* ISM text */}
        <text x="22" y="40" textAnchor="middle"
          fill="#C5A31B" fontSize="7.5" fontWeight="700" fontFamily="monospace" letterSpacing="1">
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
