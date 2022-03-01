module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        huat: {
          10: '#fcc878ff',
          20: '#c5603aff',
          30: '#b82b2fff',
          40: '#5f1717ff',
          50: '#ca3a32ff',
          60: '#d35837ff',
          70: '#de7442ff',
          80: '#e1b482ff',
          90: '#fcdbc3ff',
          100: '#ffe2b5ff',
        },
      },
      'animation': {
          'gradient-x':'gradient-x 15s ease infinite',
          'gradient-y':'gradient-y 15s ease infinite',
          'gradient-xy':'gradient-xy 5s ease infinite',
          blob: "blob 4s infinite",
      },
      'keyframes': {
        'gradient-y': {
          '0%, 100%': {
              'background-size':'400% 400%',
              'background-position': 'center top'
          },
          '50%': {
              'background-size':'200% 200%',
              'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
              'background-size':'200% 200%',
              'background-position': 'left center'
          },
          '50%': {
              'background-size':'200% 200%',
              'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
              'background-size':'400% 400%',
              'background-position': 'left center'
          },
          '50%': {
              'background-size':'200% 200%',
              'background-position': 'right center'
          }
        },
        'blob': {
          "0%": {
            transform: "translate(0px, 0px) scale(1)"
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.2)"
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.8)"
          },
          "10%": {
            transform: "translate(0px, 0px) scale(1)"
          },
        }
      }
    },
  },
  plugins: [],
};
