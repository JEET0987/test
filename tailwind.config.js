/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        circusRed: '#FF4C4C',
        balloonBlue: '#4C9AFF',
        festiveYellow: '#FFD93D',
        partyPurple: '#9B59B6',
        confettiGreen: '#27AE60',
        ribbonPink: '#FF6F91',
      },
    },
  },
  plugins: [],
}
