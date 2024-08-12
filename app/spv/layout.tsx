import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Navbar from './components/navbar/Navbar'
import { NotificationProvider } from '../context/NotificationContext'
import NotificationProviderComponent from '../components/NotificationProvider'
import BottomNavigation from './components/navbar/BottomNavigation'


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
        <Navbar />
        <NotificationProvider>
          <NotificationProviderComponent />
          {children}
          <div className="mb-12 mt-12"></div>
        </NotificationProvider>
        <BottomNavigation />
      </body>
    </html>
  )
}
