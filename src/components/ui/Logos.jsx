// All logos are self-contained inline SVGs — no external URLs

// Goldman Sachs — official brand blue #7399C6, white GS
export function GoldmanSachsLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <rect width="44" height="44" fill="#7399C6" />
        <text x="22" y="30" textAnchor="middle"
          fill="#ffffff" fontSize="22" fontWeight="700" fontFamily="Georgia,serif" letterSpacing="1">
          GS
        </text>
      </svg>
    </div>
  )
}

// Hexagon AB — white bg, brand blue #00A9E0 hex geometry
export function HexagonLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <rect width="44" height="44" fill="#ffffff" />
        <polygon points="22,5 35,12.5 35,27.5 22,35 9,27.5 9,12.5"
          fill="none" stroke="#00A9E0" strokeWidth="2.2" />
        <polygon points="22,12 30,16.5 30,25.5 22,30 14,25.5 14,16.5"
          fill="#00A9E020" />
        <text x="22" y="27" textAnchor="middle"
          fill="#00A9E0" fontSize="13" fontWeight="900" fontFamily="Arial,Helvetica,sans-serif">
          H
        </text>
      </svg>
    </div>
  )
}

// University of Pittsburgh — official blue #003594 + gold #FFB81C
export function PittLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <rect width="44" height="44" fill="#003594" />
        <rect x="0" y="0" width="44" height="5" fill="#FFB81C" />
        <rect x="0" y="39" width="44" height="5" fill="#FFB81C" />
        <path d="M14,8 H30 V26 C30,33 22,37 22,37 C22,37 14,33 14,26 Z"
          fill="none" stroke="#FFB81C" strokeWidth="1.4" opacity="0.7" />
        <text x="22" y="29" textAnchor="middle"
          fill="#FFB81C" fontSize="11" fontWeight="900" fontFamily="Georgia,serif" letterSpacing="1.5">
          PITT
        </text>
      </svg>
    </div>
  )
}

// IIT (ISM) Dhanbad — maroon #9d0f17 bg, gold #ffb339 lamp
export function ISMLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <rect width="44" height="44" fill="#9d0f17" />
        {/* Flame */}
        <ellipse cx="22" cy="9" rx="3" ry="4.5" fill="#ffb339" opacity="0.95" />
        <ellipse cx="22" cy="11" rx="1.8" ry="2.8" fill="#ff8c00" />
        {/* Wick */}
        <line x1="22" y1="13.5" x2="22" y2="17" stroke="#ffb339" strokeWidth="1.2" />
        {/* Spout */}
        <path d="M15,21 Q15,18 19,18 L25,18 Q27.5,18 29,16.5 Q31,15 33,15.5 Q31,17 29,18.5 L25,19.5 L22,20"
          fill="none" stroke="#ffb339" strokeWidth="1.3" strokeLinecap="round" />
        {/* Lamp bowl */}
        <ellipse cx="20" cy="21" rx="7" ry="3" fill="none" stroke="#ffb339" strokeWidth="1.3" />
        <path d="M13,21 Q12.5,26 15.5,27 L24.5,27 Q27,26 26.5,21"
          fill="#ffb33920" stroke="#ffb339" strokeWidth="1.1" />
        {/* Handle */}
        <path d="M27,23 Q32,23 32,21 Q32,19 27,19"
          fill="none" stroke="#ffb339" strokeWidth="1.2" />
        {/* Label */}
        <text x="22" y="39" textAnchor="middle"
          fill="#ffb339" fontSize="7" fontWeight="700" fontFamily="monospace" letterSpacing="0.5">
          IIT ISM
        </text>
      </svg>
    </div>
  )
}

// D2Sol — navy #22458b bg, orange #ed8a36 accent
export function D2SolLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <rect width="44" height="44" fill="#22458b" />
        <rect x="0" y="0" width="44" height="3.5" fill="#ed8a36" />
        <text x="22" y="23" textAnchor="middle"
          fill="#ffffff" fontSize="15" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="-0.5">
          D2
        </text>
        <text x="22" y="34" textAnchor="middle"
          fill="#ed8a36" fontSize="8.5" fontWeight="600" fontFamily="Arial,sans-serif" letterSpacing="2">
          SOL
        </text>
      </svg>
    </div>
  )
}

// LevyLab — dark #1a1a1a bg, cyan #02aace accent
export function LevyLabLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <rect width="44" height="44" fill="#111827" />
        {/* Subtle cyan border */}
        <rect x="0" y="0" width="44" height="44" rx="10"
          fill="none" stroke="#02aace" strokeWidth="1.5" opacity="0.5" />
        {/* Flask / lab beaker icon */}
        <path d="M18,10 L18,21 L12,33 Q11,35 13,36 L31,36 Q33,35 32,33 L26,21 L26,10 Z"
          fill="none" stroke="#02aace" strokeWidth="1.4" strokeLinejoin="round" />
        {/* Liquid inside */}
        <path d="M13,31 Q15,28 22,29 Q28,30 31,31 L32,33 Q33,35 31,36 L13,36 Q11,35 12,33 Z"
          fill="#02aace33" />
        {/* Bubbles */}
        <circle cx="20" cy="31" r="1.2" fill="#02aace" opacity="0.7" />
        <circle cx="24" cy="30" r="0.8" fill="#02aace" opacity="0.5" />
        {/* Collar line on flask */}
        <line x1="16" y1="13" x2="28" y2="13" stroke="#02aace" strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  )
}

export function SCIGSOLogo({ className = 'w-11 h-11' }) {
  return <PittLogo className={className} />
}
