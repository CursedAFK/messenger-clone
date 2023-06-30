import AuthContext from '@/context/AuthContext'
import ToasterContext from '@/context/ToasterContext'
import { Metadata } from 'next'
import './globals.css'

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
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}

export default RootLayout
