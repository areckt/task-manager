import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from './Components/Sidebar/Sidebar'
import GlobalStyleProvider from './providers/GlobalStyleProvider'
import ContextProvider from './providers/ContextProvider'
import { ClerkProvider, auth } from '@clerk/nextjs'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ['latin'] })
const { userId } = auth()

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Tutorial by TheCodeDealer on freeCodeCamp',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className={inter.className}>
          <NextTopLoader
            height={4}
            color="#27AE60"
            easing="cubic-bezier(0.53, 0.21, 0, 1)"
          />
          <ContextProvider>
            <GlobalStyleProvider>
              {userId && <Sidebar />}
              <div className="w-full">{children}</div>
            </GlobalStyleProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
