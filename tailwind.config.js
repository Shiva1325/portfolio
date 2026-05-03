/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050A0E',
        'neon-cyan': '#818CF8',
        'neon-purple': '#F472B6',
        'neon-green': '#00FF88',
        'off-white': '#E8F4FD',
        'glass': 'rgba(255,255,255,0.04)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(129,140,248,0.4), 0 0 60px rgba(129,140,248,0.1)',
        'neon-purple': '0 0 20px rgba(244,114,182,0.4), 0 0 60px rgba(244,114,182,0.1)',
        'neon-green': '0 0 20px rgba(0,255,136,0.4)',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, rgba(129,140,248,0.08) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'dot-grid': '32px 32px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 0.3s steps(2) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '25%': { transform: 'translate(-2px, 1px)' },
          '50%': { transform: 'translate(2px, -1px)' },
          '75%': { transform: 'translate(-1px, 2px)' },
          '100%': { transform: 'translate(0)' },
        },
      },
    },
  },
  plugins: [],
}
