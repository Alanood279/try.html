import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google'
import './globals.css'

const tajawal = Tajawal({ 
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-tajawal'
})

export const metadata: Metadata = {
  title: 'BildFlow - منصة التصميم الذكية',
  description: 'صمم تصاميم احترافية بسهولة مع BildFlow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-sans antialiased bg-gray-900 text-white">
        {children}
      </body>
    </html>
  )
}
