import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { NotificationProvider } from '../context/NotificationContext'
import NotificationProviderComponent from '../components/NotificationProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sokas App',
  description: 'Electrical solution',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>
          <NotificationProviderComponent />
          {children}
          <div className="mb-12 mt-12"></div>
        </NotificationProvider>
      </body>
    </html>
  )
}
