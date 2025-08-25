"use client"
import React from 'react'
import Tmdb from '@/api/tmdb'

const fetchPopular = async() => {
 try {
    const res = await Tmdb.get("/movie/popular")
    return res.data.results
 } catch (error) {
    console.log(error)
 }
}

export default fetchPopular