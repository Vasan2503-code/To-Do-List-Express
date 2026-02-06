import React from 'react'
import NavLanding from './NavLanding'
import {Link} from 'react-router-dom'
const Landing = () => {
  return (
    <div className='min-h-screen bg-slate-900'>
        <NavLanding/>
      <div className="content mx-auto flex flex-col md:flex flex-row p-15 text-xl bg-slate-900 min-h-screen">

        <div className="md:w-1/2  w-full text-pink-400 ">
          <h1 className='text-pink-50 text-3xl font-bold p-12  font'>BREAK AND PUSH <br /><span className='p-6 text-7xl text-zinc-400'>THE LIMIT⚡</span></h1><br />
                <p className='text-2xl ml-12'> Break your limits and push yourself to the next level  <br/>
            Use NO LIMITS to track your tasks and achieve your goals</p>

          <button className='ml-12 mt-6 px-8 py-3 bg-slate-800 text-pink-400 font-bold rounded-full shadow-lg border border-slate-700 hover:bg-pink-600 hover:text-white hover:border-pink-600 hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-1'>
            <Link to="/signin">Get Started</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Landing