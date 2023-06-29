import { Metadata } from 'next'
import './globals.css'
import ToasterContext from '@/context/ToasterContext'

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Messenger Clone',
  description: 'Chat with your friends and family in real time'
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en'>
      <body>
        <ToasterContext />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
