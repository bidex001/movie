"use client"
import Header from './movie/component/headerMovie'
import Main from './movie/component/mainMovie'
import Footer from './movie/component/footer'
import { useContext } from 'react'
import AppContext from '@/context/context'

const Movie = () => {
  const{darkMode} = useContext(AppContext)
  
  return (
    <div className={`flex  flex-col h-fit min-h-screen w-full text-gray-100 relative bg-gray-900`}>
        <Header/>
        <Main/>
        <Footer/>
    </div>
  )
}

export default Movie