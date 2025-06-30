module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Quicksand"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'], // for titles
        meta: ['"Poppins"', 'sans-serif'], // for small info text
                serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
                        sans: ['Montserrat', 'ui-sans-serif', 'system-ui'],


      },
    },
  },
  plugins: [],
}
