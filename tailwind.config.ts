import { max } from "lodash";
import type { Config } from "tailwindcss";
import tailwindcssAnimatePlugin from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    "./src/ui-kit/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
    ".storybook/**/*",
    "./.storybook/**/*",
    "./storybook-static/**/*",
  ],
  theme: {
    extend: {
      maxWidth: {
        '10rem': '10rem',
        '9rem': '9rem',
        '8rem': '8rem',
      },
      screens: {
        landscape: { raw: "(orientation: landscape)" },
        maxlg: { raw: "(max-width: 1024px)" },
        maxmd: { raw: "(max-width: 768px)" },
        maxsm: { raw: "(max-width: 640px)" },
      },
      colors: {
        b0: "hsl(var(--b0))",
        b1: "hsl(var(--b1))",
        b2: "hsl(var(--b2))",
        b3: "hsl(var(--b3))",
        b4: "hsl(var(--b4))",
        b5: "hsl(var(--b5))",
        b6: "hsl(var(--b6))",
        b7: "hsl(var(--b7))",
        b8: "hsl(var(--b8))",
        b9: "hsl(var(--b9))",
        b01: "hsl(var(--b01))",
        a02: "hsl(var(--a02))",
        a01: "hsl(var(--a01))",
        a0: "hsl(var(--a0))",
        a1: "hsl(var(--a1))",
        a2: "hsl(var(--a2))",
        a3: "hsl(var(--a3))",
        a4: "hsl(var(--a4))",
        a5: "hsl(var(--a5))",
        a6: "hsl(var(--a6))",
        a7: "hsl(var(--a7))",
        a8: "hsl(var(--a8))",
        a9: "hsl(var(--a9))",
        a14: "hsl(var(--a14))",
        e0: "hsl(var(--e0))",
        e1: "hsl(var(--e1))",
        s0: "hsl(var(--s0))",
        s1: "hsl(var(--s1))",
        w0: "hsl(var(--w0))",
        c03: "hsl(var(--c03))",
        c02: "hsl(var(--c02))",
        c01: "hsl(var(--c01))",
        c0: "hsl(var(--c0))",
        c1: "hsl(var(--c1))",
        c2: "hsl(var(--c2))",
        c3: "hsl(var(--c3))",
        c4: "hsl(var(--c4))",
        c5: "hsl(var(--c5))",
        c6: "hsl(var(--c6))",
        c7: "hsl(var(--c7))",
        c8: "hsl(var(--c8))",
        d0: "hsl(var(--d0))",
        d1: "hsl(var(--d1))",
        d2: "hsl(var(--d2))",
        tDefault: "hsl(var(--tDefault))",
        blue: "hsl(var(--blue))",
        tPlaceholder: "hsl(var(--tPlaceholder))",
        absoluteBlack: "hsl(var(--absoluteBlack))",
        extraBlue: "hsl(var(--extraBlue))",
        greyDefault: "hsl(var(--greyDefault))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        mainBackground: "hsl(var(--main-background))",
        grass: "#647a67",
        algae: "#819c85",
        cream: '#faf9f4',
        mint: "#cdddcd",
        san: "#cfc9c1",
        beige: "#eeeada",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        basic: {
          DEFAULT: "hsl(var(--a0))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      boxShadow: {
        custom: "0px 0px 14px 0px rgba(0,0,0,0.03)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", ...fontFamily.sans],
      },
      spacing: {
        "safe-bottom": "calc(env(safe-area-inset-bottom) + 16px)",
        "safe-bottom-8": "calc(env(safe-area-inset-bottom) + 8px)",
        "safe-bottom-28": "calc(env(safe-area-inset-bottom) + 28px)",
        "insets-bottom": "env(safe-area-inset-bottom)",
        "13": "3.25rem", // 52px
      },
      height: {
        "screen-dynamic": "var(--app-height)",
      },
    },
  },
  plugins: [tailwindcssAnimatePlugin],
} satisfies Config;
