"use client"
import { useState,useEffect } from "react"
import axios from "axios"

export default function useFetchSeriesById(id){
    const[data,setData] = useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(()=>{
        let ignore = false
       async function fetchData(){
         try {
            const res = await axios.get("/api/tv/getSeriesById",{
                params:{
                    id:id
                }
            })
            setData(res.data)
            console.log(res.data)

        } 
        catch (error) {
            if(!ignore)setError(error)
        }
    finally{
        if(!ignore)setLoading(false)
    }
       }
       fetchData()

       return()=>{
        ignore = true
       }
    },[id])
    return {data,loading,error}
}