/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FAFAF9',
        surface: '#FFFFFF',
        ink: '#1C1B1A',
        'ink-soft': '#6B6862',
        'ink-faint': '#A6A29B',
        border: '#E7E5E2',
        accent: '#2F5D50',
        'accent-soft': '#E7EFEC',
        'accent-dark': '#213F37',
        dark: '#161512'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      maxWidth: {
        content: '72rem'
      }
    },
  },
  plugins: [],
}
