"use client"
import Header from './movie/component/headerMovie'
import Main from './movie/component/mainMovie'
import Footer from './movie/component/footer'
import { useContext } from 'react'
import AppContext from '@/context/context'

const Movie = () => {
  const{darkMode} = useContext(AppContext)
  
  return (
    <div className={`flex  flex-col h-fit min-h-screen w-full bg-[snow] relative ${darkMode? "bg-gray-900 text-gray-100":""}`}>
        <Header/>
        <Main/>
        <Footer/>
    </div>
  )
}

export default Movie