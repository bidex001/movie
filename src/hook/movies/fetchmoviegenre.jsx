"use client"
import { useState,useEffect } from "react"
import axios from "axios"

export default function useFetchGenreMovies(id){
    const [data,setData] = useState([])
    const [loading,SetLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(()=>{
        if(!id) return

        let ignore = false

        async function fetchData(){
            try {
                const res = await axios.get("/api/movie/genre" ,{
                    params:{
                        id:id,
                    }
                })
                if(!ignore)setData(res.data.results)
            } catch (error) {
                if(!ignore) setError(error)
            }
        finally{
            if(!ignore)SetLoading(false)
        }
        }
        fetchData()
        return ()=>{
            ignore = true
        }
    },[id])

    return {data,loading,error}
}