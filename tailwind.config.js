const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

let gradients = {
  'ocean-light': ['#4398ee', '#5f54f1'],
  'ocean-dark': ['#4398ee', '#4f45d6'],
  'grey-dark': ['#b8c2cc', '#8795a1'],
  'vscode': ['#2c303b', '#414758'],
  'grey-code': ['#fff', '#f0f0f0'],
  'code': ['#fff', '#f7fafc'],
  'red-dark': ['#f05252', '#c81e1e'],
  'orange-dark': ['#f6993f', '#de751f'],
  'yellow-dark': ['#ffed4a', '#f2d024'],
  'green-dark': ['#38c172', '#1f9d55'],
  'teal-dark': ['#4dc0b5', '#38a89d'],
  'blue-dark': ['#3490dc', '#2779bd'],
  'indigo-dark': ['#6574cd', '#5661b3'],
  'purple-dark': ['#9561e2', '#794acf'],
  'pink-dark': ['#f66d9b', '#eb5286'],
}

module.exports = {
  purge: {
    content: [
      './src/assets/**/*.css',
      './content/**/*.md',
      './src/**/*.vue',
      './src/**/*.js'
    ],
    options: {
      defaultExtractor: content => content.match(/[\w-/:.%]+(?<!:)/g) || [],
      whitelistPatterns: [/a(lgoli)?a/, /anchor/, /carbon/],
    }
  },
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors: {
        inherit: 'inherit',
        black: '#22292f',
        ocean: {
          DEFAULT: '#4398ee',
          dark: '#5f54f1',
          darker: '#4f45d6',
        },
        code: {
          DEFAULT: '#f9fcfd',
        },
        yellow: {
          450: '#ffed4a',
          'markdown-highlight': '#ff9',
        },
        gray: {
          codeblock: '#fbfcfd',
          DEFAULT: '#b8c2cc',
        },
        'cool-gray': colors.coolGray,
        mailviews: {
          light: '#454c6e',
          DEFAULT: '#7C84AF',
          dark: '#1E2131',
          darker: '#171725',
        },
      },
      cursor: {
        help: 'help',
      },
      spacing: {
        14: '3.5rem',
        72: '18rem',
        80: '20rem',
      },
      boxShadow: {
        'lg-soft': '0 10px 20px rgba(91,107,174,.2)',
        'xl-cards': '0 20px 25px -5px rgba(67, 152, 238, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      fontFamily: {
        inter: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxxs: '.625rem',
        xxs: '.75rem',
      },
      height: {
        quickies: 'calc(100vh - 6rem)',
      },
      inset: {
        '16': '3.5rem',
        '24': '6rem',
      },
      linearBorderGradients: {
        colors: gradients,
        directions: {
          t: 'to top',
          tr: 'to top right',
          r: 'to right',
          br: 'to bottom right',
          b: 'to bottom',
          bl: 'to bottom left',
          l: 'to left',
          tl: 'to top left',
        },
      },
      linearGradientColors: gradients,
      linearGradientDirections: {
        t: 'to top',
        tr: 'to top right',
        r: 'to right',
        br: 'to bottom right',
        b: 'to bottom',
        bl: 'to bottom left',
        l: 'to left',
        tl: 'to top left',
      },
      lineHeight: {
        code: '1.75',
      },
      margin: {
        '1/6': '16.66667%',
      },
      maxWidth: {
        xxs: '16rem',
      },
      maxHeight: {
        sm: '30rem',
      },
      minHeight: {
        128: '32rem',
      },
      minWidth: {
        24: '6rem',
      },
      opacity: {
        90: '0.9',
      },
      zIndex: {
        '-1': '-1',
      },
    },
  },
  variants: {
    linearBorderGradients: ['responsive', 'hover'],
    linearGradients: ['responsive', 'hover'],
    margin: ['responsive', 'group-hover'],
    opacity: ['responsive', 'hover', 'group-hover'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  corePlugins: {},
  plugins: [
    require('tailwindcss-gradients'),
    require('tailwindcss-border-gradients')(),
  ],
}
