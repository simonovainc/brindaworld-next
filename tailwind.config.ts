import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brinda: {
          purple: '#6B21A8',
          'purple-light': '#A78BFA',
          'purple-dark': '#4C0A77',
          gold: '#F59E0B',
          'gold-light': '#FBBF24',
          pink: '#FDF2F8',
          'pink-accent': '#F9A8D4',
        },
      },
      backgroundColor: {
        'brinda-purple': '#6B21A8',
        'brinda-gold': '#F59E0B',
        'brinda-pink': '#FDF2F8',
      },
      textColor: {
        'brinda-purple': '#6B21A8',
        'brinda-gold': '#F59E0B',
      },
      borderColor: {
        'brinda-purple': '#6B21A8',
        'brinda-gold': '#F59E0B',
      },
    },
  },
  plugins: [],
};

export default config;
