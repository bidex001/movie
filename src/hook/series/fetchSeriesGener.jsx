import React from 'react'
import Tmdb from '@/api/tmdb'

const FetchSeriesGenre = async(id) => {
 try {
    const res = await Tmdb.get("/discover/tv",{
        params : {
             with_genres: id,
        }
    })
    return res.data.results

 } catch (error) {
console.log(error)
 }
}

export default FetchSeriesGenre