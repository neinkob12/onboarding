/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#0071E3',
        success: '#34C759',
        danger: '#FF3B30',
        'text-primary': '#1D1D1F',
        'text-secondary': '#6E6E73',
        'bg-page': '#FFFFFF',
        'bg-section': '#F5F5F7',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', "'Helvetica Neue'", 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        input: '8px',
        chip: '20px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08)',
      },
      maxWidth: {
        content: '680px',
      },
    },
  },
  plugins: [],
}
