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
          100: '#7a46bed7',
        },
      },
      'animation': {
          'gradient-x':'gradient-x 15s ease infinite',
          'gradient-y':'gradient-y 15s ease infinite',
          'gradient-xy':'gradient-xy 5s ease infinite',
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
        }
      }
    },
  },
  plugins: [],
};
