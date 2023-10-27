/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pinkSoft: '#EDC7B7',
        wheat: '#EEE2DC',
        gray: '#BAB2B5',
        blue: '#BADFE7',
        blue2: '#697184',
        pink: '#D8CFD0',
        bg: '#B1A6A4',
        bgDark: '#413F3D',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  //   daisyui: {
  //     themes: ['winter', 'night'],
  //   },
  // };

  daisyui: {
    themes: [
      {
        night: {
          ...require('daisyui/src/theming/themes')['[data-theme=night]'],
          // neutral: 'red',
          // base-100: '#ffffff'
          '.btn-twitter': {
            'background-color': '#212121',
            'box-shadow': '10px 10px 5px 0px rgba(0,0,0,0.64)',
            '-webkit-box-shadow': '10px 10px 5px 0px rgba(0,0,0,0.64)',
            '-moz-box-shadow': '10px 10px 5px 0px rgba(0,0,0,0.64)',
          },
        },
        winter: {
          ...require('daisyui/src/theming/themes')['[data-theme=winter]'],

          '.btn-twitter': {
            'background-color': 'rgb(240, 246, 255)',
            'box-shadow': '10px 10px 5px 0px rgba(179,175,175,0.75)',
            '-webkit-box-shadow': '10px 10px 5px 0px rgba(179,175,175,0.75)',
            '-moz-box-shadow': '10px 10px 5px 0px rgba(179,175,175,0.75)',
          },
        },
      },
    ],
  },
};
