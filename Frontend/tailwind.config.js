/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        // Healthcare-specific colors
        medical: {
          100: "#e6f7f5",
          200: "#bfeae5",
          300: "#8dd9d2",
          400: "#4cc3b9",
          500: "#2ca99e", // Primary medical teal
          600: "#1e8c82",
          700: "#166f67",
          800: "#0e524c",
          900: "#083532",
        },
        healing: {
          100: "#e8f4ff",
          200: "#c7e2ff",
          300: "#94c6ff",
          400: "#5aa6ff",
          500: "#1a82ff", // Secondary medical blue
          600: "#0066e3",
          700: "#0052b8",
          800: "#003c85",
          900: "#002857",
        },
        alert: {
          100: "#fff0e6",
          200: "#ffd9c0",
          300: "#ffb999",
          400: "#ff9466",
          500: "#ff6b33", // Warning orange
          600: "#e54e00",
          700: "#b33d00",
          800: "#802c00",
          900: "#4d1a00",
        },
        success: {
          100: "#e6f9ed",
          200: "#c0efd5",
          300: "#8ce0b4",
          400: "#4dcc8c",
          500: "#2ab06e", // Success green
          600: "#1e8c55",
          700: "#166f44",
          800: "#0e5232",
          900: "#083521",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
