const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#366AF7',
        danger: '#FF1E56',
        success: '#0FB50F',
        gray1: '#E9ECEF',
        gray2: '#A8AAAC',
        black1: '#151515',
        blue: '#4D91C6',
      },
      fontSize: {
        2.5: '0.625rem',
        3.25: '0.813rem',
        3.5: '0.875rem',
        4.25: '1.0625rem',
        7: '1.75rem',
      },
      spacing: {
        1.25: '0.313rem',
        6.25: '1.563rem',
        7.5: '1.875rem',
        12.5: '3.125rem',
        400: '90rem',
        500: '110rem',
      },
      maxHeight: {
        120: '30rem',
      },
      minWidth: {
        250: '62.5rem',
        207: '51.938rem',
      },
      maxWidth: {
        400: '100rem',
        207: '51.938rem',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const utilities = {
        '.capitalize-first:first-letter': {
          textTransform: 'uppercase',
        },
      };
      addUtilities(utilities, ['responsive', 'hover']);
    }),
  ],
};
