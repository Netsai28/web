import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'], // ฟอนต์หัวข้อสวยๆ
        sans: ['var(--font-sans)', 'sans-serif'], // ฟอนต์เนื้อหา
      },
      colors: {
        brand: {
          bg: '#8E9F9F',     // สีพื้นหลังเขียวหม่น (Sage Green) ตาม Figma
          dark: '#1A2C2C',   // สีปุ่มเขียวเข้ม
          yellow: '#FDE68A', // สีป้าย Level
          card: '#FFFFFF',   // สีการ์ดขาว
        }
      }
    },
  },
  plugins: [],
}
export default config