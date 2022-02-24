module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#264653",
        customLightBlue: "#2A9D8F",
        cutsomYellow: "#E9C46A",
        customLightOrange: "#F4A261",
        customOrange: "#E76F51",
        customTrans2: "rgb(255,255,255,0.2)",
        customTrans1: "rgb(255,255,255,0.1)",
        ["customTrans05"]: "rgb(255,255,255,0.05)",
      },
      fontFamily: {
        "Anonymous Pro": ["Anonymous Pro", "monospace"],
      },
    },
  },
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("tailwind-scrollbar-hide"),
  ],
};
