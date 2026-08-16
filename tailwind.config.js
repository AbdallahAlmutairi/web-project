/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#121214",
        panel: "#1a1a1e",
        panelmuted: "#202024",
        border: "#2c2c31",
        muted: "#57575f",
        subtext: "#8a8a92",
        text: "#d1d0c5",
        accent: "#e2b714",
        accent2: "#7c9cff",
        good: "#4ade80",
        bad: "#f26161",
        badbg: "rgba(242, 97, 97, 0.14)",
        caret: "#e2b714",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        popIn: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-3px)" },
          "75%": { transform: "translateX(3px)" },
        },
      },
      animation: {
        caret: "blink 1s step-start infinite",
        popIn: "popIn 0.2s ease-out",
        shake: "shake 0.2s ease-in-out",
      },
    },
  },
  plugins: [],
};
