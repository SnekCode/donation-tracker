import './globals.css'
import { Inter } from 'next/font/google'
import ThemeProvider from './context/theme/ThemeProvider'
import ModalProvider from './context/modal/ModalProvider'

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

      <ThemeProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
          <div id="modal-root"></div>
      </ThemeProvider>
    </html>
  )
}
