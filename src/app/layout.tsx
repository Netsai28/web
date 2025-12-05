import './globals.css' // ✅ ต้อง import แบบนี้ (อยู่ในโฟลเดอร์เดียวกัน)
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>{children}</body>
    </html>
  )
}