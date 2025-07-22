import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const nav = useNavigate();
  return (
    <>
        <h1 className='text-4xl font-bold flex justify-center py-8'>HOME</h1>
        <div className='flex justify-around py-[10px]'>
          <button className='font-bold text-3xl border-2 w-[10rem]' onClick={() => nav('/register')}>Register</button>
          <button className='font-bold text-3xl border-2 w-[10rem]' onClick={() => nav('/login')}>Login</button>
        </div>
    </>
  )
}

export default Home