import React from 'react'
import ShinyButton from '../Button/Button'
import { AiFillFire } from "react-icons/ai";
import {  useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate("/")
  }
  
  return (
    <div className='w-full z-50 h-[10vh] border-b-2 select-none' >
      <div className="nav-container h-full  flex justify-between items-center w-[90%] m-auto">
        <h1 onClick={handleClick} className='cursor-pointer text-3xl text-inFile font-bold flex  '>< AiFillFire/ >InFile</h1>
        <ShinyButton text={"Login"} />
      </div>

      

      
    </div>
  )
}

export default Navbar
