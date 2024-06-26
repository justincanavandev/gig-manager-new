import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import headlessui from "@headlessui/tailwindcss"

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        openSans: ['var(--font-open-sans)', ...fontFamily.sans]
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        'light-purple': '#f3e0f7',
        'dark-purple': "#8f94fb"
      },
    },
    backgroundImage: ({
      'gradient-jc': 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)'
    })
  },
  plugins: [
    headlessui

  ],
} satisfies Config;
