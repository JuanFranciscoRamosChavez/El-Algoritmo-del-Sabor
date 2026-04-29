/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores de la taquería
        primary: "#b90027",
        "primary-container": "#e31837",
        "on-primary": "#ffffff",
        "on-primary-container": "#fffaf9",
        "primary-fixed": "#ffdad8",
        "primary-fixed-dim": "#ffb3b1",
        "on-primary-fixed": "#410007",
        "on-primary-fixed-variant": "#92001d",
        
        secondary: "#954a00",
        "secondary-container": "#fd8100",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#5d2c00",
        "secondary-fixed": "#ffdcc6",
        "secondary-fixed-dim": "#ffb785",
        "on-secondary-fixed": "#301400",
        "on-secondary-fixed-variant": "#723700",
        
        tertiary: "#00656f",
        "tertiary-container": "#00808c",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#f2fdff",
        "tertiary-fixed": "#93f1fe",
        "tertiary-fixed-dim": "#77d4e1",
        "on-tertiary-fixed": "#001f23",
        "on-tertiary-fixed-variant": "#004f57",
        
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        
        background: "#fff8f7",
        "on-background": "#291716",
        surface: "#fff8f7",
        "on-surface": "#291716",
        "surface-dim": "#f3d2d1",
        "surface-bright": "#fff8f7",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#fff0ef",
        "surface-container": "#ffe9e8",
        "surface-container-high": "#ffe1e0",
        "surface-container-highest": "#fcdbd9",
        "on-surface-variant": "#5d3f3e",
        
        outline: "#916e6d",
        "outline-variant": "#e6bdbb",
        
        "surface-tint": "#bf0029",
        "inverse-surface": "#402b2b",
        "inverse-on-surface": "#ffedeb",
        "inverse-primary": "#ffb3b1",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      spacing: {
        "section-gap": "40px",
        "stack-lg": "24px",
        "stack-sm": "8px",
        "stack-md": "16px",
        base: "4px",
        gutter: "16px",
        "container-margin": "20px",
      },
      fontFamily: {
        "headline-xl": ["Plus Jakarta Sans"],
        "headline-lg": ["Plus Jakarta Sans"],
        "headline-md": ["Plus Jakarta Sans"],
        "body-lg": ["Be Vietnam Pro"],
        "body-md": ["Be Vietnam Pro"],
        "label-bold": ["Be Vietnam Pro"],
        "label-sm": ["Be Vietnam Pro"],
      },
      fontSize: {
        "headline-xl": [
          "36px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" },
        ],
        "headline-lg": [
          "28px",
          { lineHeight: "1.2", fontWeight: "700" },
        ],
        "headline-md": [
          "20px",
          { lineHeight: "1.2", fontWeight: "700" },
        ],
        "body-lg": [
          "18px",
          { lineHeight: "1.5", fontWeight: "400" },
        ],
        "body-md": [
          "16px",
          { lineHeight: "1.5", fontWeight: "400" },
        ],
        "label-bold": [
          "14px",
          { lineHeight: "1.2", fontWeight: "700" },
        ],
        "label-sm": [
          "12px",
          { lineHeight: "1.2", fontWeight: "500" },
        ],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
