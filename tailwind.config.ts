import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#2563eb',
          yellow: '#fbbf24',
          green: '#10b981',
        },
        acture: {
          blue: '#1e40af',
          yellow: '#f59e0b',
          green: '#059669',
        }
      },
      borderRadius: {
        'modern': '20px',
        'modern-lg': '24px',
        'modern-xl': '32px',
      },
      boxShadow: {
        'modern': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'modern-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'modern-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'colored': '0 10px 40px rgba(30, 64, 175, 0.2)',
        'colored-green': '0 10px 40px rgba(5, 150, 105, 0.2)',
        'colored-yellow': '0 10px 40px rgba(245, 158, 11, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config

