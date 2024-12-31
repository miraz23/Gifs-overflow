

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      keyframes: {
        underline: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        underline: 'underline 0.3s ease-in-out forwards',
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(180,80,58,1) 0%, rgba(253,80,29,1) 50%, rgba(252,176,69,1) 100%)',
        'custom-gradient-hover': 'linear-gradient(90deg, rgba(200, 200, 200, 1) 0%, rgba(169, 169, 169, 1) 50%, rgba(120, 120, 120, 1) 100%)',

      },
      borderImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(180,80,58,1) 0%, rgba(253,80,29,1) 50%, rgba(252,176,69,1) 100%)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.smooth-underline': {
          position: 'relative',
        },
        '.smooth-underline::after': {
          content: '""',
          position: 'absolute',
          left: '0',
          bottom: '0',
          width: '0',
          height: '3px',
          backgroundColor: 'orange',
          transition: 'width 0.3s ease-in-out',
        },
        '.smooth-underline:hover::after': {
          width: '100%',
        },
      });
    },
    function ({ addUtilities, theme }) {
      addUtilities({
        '.border-custom-gradient': {
          borderStyle: 'solid',
          borderWidth: '2px',
          borderImage: theme('backgroundImage.custom-gradient') + ' 1',
        },
      });
    },
    require('daisyui'), 
    
  ],
  daisyui:{
    themes:true,
    darkTheme:['selector', '[data-theme="night"]'],
  }
}

