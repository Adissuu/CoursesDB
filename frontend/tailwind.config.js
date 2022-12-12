module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx}', './components/**/*.{js,ts,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'signupChar': "url('../public/images/grid.svg')"
      },
      colors: {
        'forest': {
          100: '#1BD175',
          200: '#379683',
          300: '#bbf7d0',
        },
        'azur': {
          100: '#011120',
          200: '#05386B'
        }
      },
      letterSpacing: {
        widest: '.15em',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}