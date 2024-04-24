module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          "2xl": "1080px",
        },
      },
    },
  },
  plugins: [],
};
