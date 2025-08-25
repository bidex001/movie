"use client"
import React from 'react'
import Header from './component/header'
import Main from './component/mainSeries'
import Footer from './component/seriesFooter'
import { useContext } from 'react'
import AppContext from '@/context/context'

const Series = () => {
  const {darkMode} = useContext(AppContext)
  return (
    <div className={`flex  flex-col h-fit min-h-screen w-full bg-[snow] relative ${darkMode? "bg-gray-900 text-gray-100":""}`}>
        <Header/>
        <Main/>
        <Footer/>
    </div>
  )
}

export default Series