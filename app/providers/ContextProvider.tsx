'use client'

import React from 'react'
import { GlobalProvider } from '../context/globalProvider'
import { Toaster } from 'react-hot-toast'

interface Props {
  children: React.ReactNode
}

const ContextProvider = ({ children }: Props) => {
  const [isReady, setIsReady] = React.useState(false)
  React.useEffect(() => {
    // setTimeout(() => {
    // }, 0)
    setIsReady(true)
  }, [])
  return isReady ? (
    <GlobalProvider>
      <Toaster />
      {children}
    </GlobalProvider>
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <span className="loader"></span>
    </div>
  )
}
export default ContextProvider
