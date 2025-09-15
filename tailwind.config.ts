import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '1.5': '0.375rem', /* 6px */
        '2.5': '0.625rem', /* 10px */
        '3.5': '0.875rem', /* 14px */
        '4.5': '1.125rem', /* 18px */
        '5.5': '1.375rem', /* 22px */
        'xs': 'var(--spacing-xs)',     /* 8px */
        'sm': 'var(--spacing-sm)',     /* 12px */
        'md': 'var(--spacing-md)',     /* 16px */
        'lg': 'var(--spacing-lg)',     /* 24px */
        'xl': 'var(--spacing-xl)',     /* 32px */
      },
      height: {
        'input': 'var(--input-height)',
        'button': 'var(--button-height)',
      },
      colors: {
        spotify: {
          green: "#1DB954",
          black: "#191414",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        surface: {
          elevated: "hsl(var(--surface-elevated))",
        },
        text: {
          primary: "hsl(var(--text-primary))",
          secondary: "hsl(var(--text-secondary))",
        },
        ui: {
          surface: "#1F1F21",
          border: "#2A2A2C",
        },
      },
      boxShadow: {
        elevated: "var(--shadow-elevated)",
        card: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "sm": "var(--radius-sm)",   /* 10px */
        "md": "var(--radius-md)",   /* 12px */
      },
      fontSize: {
        'xs': ['var(--text-xs)', '1.3'],
        'sm': ['var(--text-sm)', '1.3'],
        'base': ['var(--text-base)', '1.4'],
        'lg': ['var(--text-lg)', '1.3'],
        'xl': ['var(--text-xl)', '1.2'],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.5s ease-out"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;