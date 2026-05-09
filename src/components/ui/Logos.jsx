// Real brand logos — Wikipedia CDN for stability

export function GoldmanSachsLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center bg-white`}
      style={{ padding: '6px' }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg"
        alt="Goldman Sachs"
        className="w-full h-full object-contain"
      />
    </div>
  )
}

export function HexagonLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center bg-white`}
      style={{ padding: '5px' }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Hexagon_AB_logo.svg"
        alt="Hexagon"
        className="w-full h-full object-contain"
        onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.setAttribute('data-fallback', '1') }}
      />
    </div>
  )
}

export function PittLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center`}
      style={{ background: '#003594', padding: '4px' }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/en/3/3b/University_of_Pittsburgh_seal.svg"
        alt="University of Pittsburgh"
        className="w-full h-full object-contain"
      />
    </div>
  )
}

export function ISMLogo({ className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center bg-white`}
      style={{ padding: '3px' }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/en/f/f4/IIT_%28ISM%29_Dhanbad_logo.png"
        alt="IIT ISM Dhanbad"
        className="w-full h-full object-contain"
      />
    </div>
  )
}

export function D2SolLogo({ color = '#22D3EE', className = 'w-11 h-11' }) {
  return (
    <div className={`${className} rounded-xl flex-shrink-0 flex items-center justify-center`}
      style={{ background: `${color}18`, border: `1px solid ${color}55` }}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <text x="22" y="20" textAnchor="middle"
          fill={color} fontSize="13" fontWeight="800" fontFamily="monospace" letterSpacing="-0.5">
          D2
        </text>
        <text x="22" y="32" textAnchor="middle"
          fill={color} fontSize="8" fontWeight="500" fontFamily="monospace" letterSpacing="1" opacity="0.7">
          SOL
        </text>
      </svg>
    </div>
  )
}

export function SCIGSOLogo({ className = 'w-11 h-11' }) {
  return <PittLogo className={className} />
}
