import React from 'react'
import Tmdb from '@/api/tmdb'

const FetchMovieGenre = async(id) => {
 try {
    const res = await Tmdb.get("/discover/movie",{
        params : {
             with_genres: id,
        }
    })
    return res.data.results

 } catch (error) {
console.log(error)
 }
}

export default FetchMovieGenre