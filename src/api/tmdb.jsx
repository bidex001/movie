"use client"
import axios from "axios";

const Tmdb = axios.create({
   baseURL:"https://api.themoviedb.org/3",
   params:{
    api_key:process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "en-us",
    page: 1
   }
})

Tmdb.interceptors.response.use((response)=>{
try {
   if(response.config.url.includes("/movie/popular")) {
     response.data.results = response.data.results.slice(0,10)
   }
   return response;
   
} catch (error) {
    console.log(error)
}
})

Tmdb.interceptors.response.use((response)=>{
try {
   if(response.config.url.includes("/tv/popular")) {
     response.data.results = response.data.results.slice(0,10)
   }
   return response;
   
} catch (error) {
    console.log(error)
}
})
export default Tmdb