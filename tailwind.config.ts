import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import headlessui from "@headlessui/tailwindcss"

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    headlessui

  ],
} satisfies Config;
