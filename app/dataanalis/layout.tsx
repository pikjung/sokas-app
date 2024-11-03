import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { FormProvider } from '../admin/hooks/FormContext'
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
          <FormProvider>
            {children}
          </FormProvider>
        </NotificationProvider>
      </body>
    </html>
  )
}
