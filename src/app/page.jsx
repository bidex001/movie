"use client"
import Header from './movie/component/headerMovie'
import Main from './movie/component/mainMovie'
import Footer from './movie/component/footer'

const Movie = () => {
  return (
    <div className={`flex flex-col h-fit min-h-screen w-full text-gray-100 relative bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_24%),linear-gradient(180deg,#02030a_0%,#050814_52%,#03040a_100%)]`}>
        <Header/>
        <Main/>
        <Footer/>
    </div>
  )
}

export default Movie
