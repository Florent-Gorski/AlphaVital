/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx,js,jsx,mdx,html}',
    './app/**/*.{ts,tsx,js,jsx,mdx,html}',
    './pages/**/*.{ts,tsx,js,jsx,mdx,html}',
    './components/**/*.{ts,tsx,js,jsx,mdx,html}',
    '../../packages/ui/src/**/*.{ts,tsx,js,jsx,mdx,html}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        ink: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1f2937',
          900: '#0f172a'
        }
      },
      boxShadow: {
        elevated: '0 10px 25px -5px rgba(2,6,23,.1), 0 8px 10px -6px rgba(2,6,23,.08)'
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.5rem'
      },
      animation: {
        'floaty': 'floaty 4s cubic-bezier(.2,.7,.1,1) infinite'
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      }
    }
  },
  plugins: []
};