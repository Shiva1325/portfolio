// Inline SVG logo marks — no external CDN dependency

export function GoldmanSachsLogo() {
  return (
    <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
      style={{ background: '#fff', padding: 5 }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg"
        alt="Goldman Sachs"
        className="w-full h-full object-contain"
      />
    </div>
  )
}

export function HexagonLogo() {
  return (
    <svg viewBox="0 0 44 44" width="44" height="44" className="flex-shrink-0">
      <rect width="44" height="44" rx="10" fill="#0e1a26" />
      {/* Hexagon ring */}
      <polygon
        points="22,5 36,13.5 36,30.5 22,39 8,30.5 8,13.5"
        fill="none" stroke="#00A9E0" strokeWidth="1.6"
      />
      {/* Inner filled hex */}
      <polygon
        points="22,11 31,16.5 31,27.5 22,33 13,27.5 13,16.5"
        fill="#00A9E022"
      />
      <text x="22" y="26" textAnchor="middle"
        fill="#00A9E0" fontSize="9" fontWeight="700" fontFamily="monospace" letterSpacing="0.5">
        HEX
      </text>
    </svg>
  )
}

export function PittLogo() {
  return (
    <svg viewBox="0 0 44 44" width="44" height="44" className="flex-shrink-0">
      <rect width="44" height="44" rx="10" fill="#003594" />
      {/* Gold bar top */}
      <rect x="4" y="4" width="36" height="3" rx="1.5" fill="#FFB81C" />
      {/* Gold bar bottom */}
      <rect x="4" y="37" width="36" height="3" rx="1.5" fill="#FFB81C" />
      <text x="22" y="28" textAnchor="middle"
        fill="#FFB81C" fontSize="14" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
        PITT
      </text>
    </svg>
  )
}

export function ISMLogo() {
  return (
    <svg viewBox="0 0 44 44" width="44" height="44" className="flex-shrink-0">
      <rect width="44" height="44" rx="10" fill="#1a1a3e" />
      {/* Lamp flame */}
      <ellipse cx="22" cy="12" rx="5" ry="7" fill="#C5A31B44" />
      <ellipse cx="22" cy="13" rx="3" ry="4.5" fill="#C5A31B" opacity="0.9" />
      {/* Lamp base */}
      <ellipse cx="22" cy="22" rx="8" ry="3" fill="none" stroke="#C5A31B" strokeWidth="1.4" />
      <line x1="22" y1="19" x2="22" y2="25" stroke="#C5A31B" strokeWidth="1.2" />
      <text x="22" y="36" textAnchor="middle"
        fill="#C5A31B" fontSize="8" fontWeight="700" fontFamily="monospace" letterSpacing="1">
        IIT ISM
      </text>
    </svg>
  )
}

export function D2SolLogo({ color = '#22D3EE' }) {
  return (
    <svg viewBox="0 0 44 44" width="44" height="44" className="flex-shrink-0">
      <rect width="44" height="44" rx="10" fill={`${color}18`} />
      <rect width="44" height="44" rx="10" fill="none" stroke={`${color}55`} strokeWidth="1" />
      <text x="22" y="29" textAnchor="middle"
        fill={color} fontSize="16" fontWeight="800" fontFamily="monospace" letterSpacing="-0.5">
        D2
      </text>
    </svg>
  )
}

export function SCIGSOLogo() {
  return <PittLogo />
}
