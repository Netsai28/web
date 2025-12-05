import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'

// โหลดฟอนต์จาก Google Fonts
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Worddee.ai',
  description: 'Practice English Sentences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#8E9F9F]`}>{children}</body>
    </html>
  )
}