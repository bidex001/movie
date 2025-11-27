"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function useCastDetail(personId){
    const [cast,setCast] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        console.log(personId)
        let ignore = false
        async function fetchDetails(){
            try {
                const res = await axios.get(`/api/castDetail?id=${personId}`)
                setCast(res.data)
            } catch (error) {
              if(!ignore) setError(error) 
            }
        finally{
            if(!ignore) setLoading(false)
        }
        }
        fetchDetails()
        return ()=>{
            ignore = true
        }
    },[personId])

    return {cast,loading,error}
}