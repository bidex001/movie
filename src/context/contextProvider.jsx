"use client"
import AppContext from './context'
import { useState } from 'react'

const ContextProvider = ({children}) => {
  const [darkMode,setDarkMode] = useState(false)
  const [movieId,setMovieId] = useState(null)
  const [seriesId,setSeriesId] = useState(null)
  return (
    <AppContext.Provider value={{darkMode,setDarkMode,movieId,setMovieId,seriesId,setSeriesId}}>
        {children}
    </AppContext.Provider>
  )
}

export default ContextProvider