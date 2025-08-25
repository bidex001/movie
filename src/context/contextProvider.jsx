"use client"
import AppContext from './context'
import { useState } from 'react'

const ContextProvider = ({children}) => {
  const [darkMode,setDarkMode] = useState(false)
  return (
    <AppContext.Provider value={{darkMode,setDarkMode}}>
        {children}
    </AppContext.Provider>
  )
}

export default ContextProvider