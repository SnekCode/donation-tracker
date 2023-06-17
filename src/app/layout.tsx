import './globals.css'
import { Inter } from 'next/font/google'
import ThemeProvider from './ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Donation Tracker'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider>{children}</ThemeProvider>
    </html>
  )
}
