import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const nav = useNavigate();
  return (
    <>
        <h1>HOME</h1>
        <button onClick={() => nav('/register')}>Register</button>
        <button onClick={() => nav('/login')}>Login</button>
    </>
  )
}

export default Home