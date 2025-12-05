/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#8E9F9F',      // สีพื้นหลังเขียวหม่น
          dark: '#1A2C2C',    // สีปุ่มและตัวหนังสือเข้ม
          yellow: '#FDE68A',  // สีป้าย Level
          card: '#FFFFFF',    // สีการ์ดขาว
          greenLight: '#ECFDF5', 
          greenText: '#047857',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
    },
  },
  plugins: [],
}