"use client"
import Header from './component/header'
import Main from './component/mainSeries'
import Footer from './component/seriesFooter'

const Series = () => {
  return (
    <div className={`flex flex-col h-fit min-h-screen w-full relative bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.12),transparent_22%),linear-gradient(180deg,#02030a_0%,#050814_52%,#03040a_100%)] text-gray-100`}>
        <Header/>
        <Main/>
        <Footer/>
    </div>
  )
}

export default Series
