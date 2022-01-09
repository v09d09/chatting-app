module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "Anonymous Pro": ["Anonymous Pro", "monospace"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
