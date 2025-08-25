"use client"
import React from 'react'
import { MdMovie } from "react-icons/md";
import { FaSearch,FaMoon,FaSun } from "react-icons/fa";
import { useContext } from 'react';
import AppContext from '@/context/context';

const Header = () => {
  const {darkMode,setDarkMode} = useContext(AppContext)
  return (
    <div className='flex w-full justify-between py-3 px-4 shadow-xl bg-transparent  fixed z-[1000]'>
      <h1 className='flex font-inconsolata items-center text-white font-bold text-3xl gap-1'>bbMovie <MdMovie  className=' text-[#b49a07]'/></h1>
      <form className='rounded-2xl overflow-hidden w-[600px] gap-2 bg-[#808080af] flex justify-center items-center'>
        <input type="text" placeholder='search for a movie' className='flex-1 p-[10px] capitalize outline-none focus:outline-none' />
        <button className='  cursor-pointer active:scale-90 text-white font-bold text-3xl py-[10px] px-[20px]'><FaSearch /></button>
      </form>

      <button className=' text-4xl cursor-pointer text-white active:scale-105'
      onClick={()=>{
        setDarkMode(!darkMode)
      }}
      >{darkMode?<FaSun/> : <FaMoon/>}</button>
    </div>
  )
}

export default Header