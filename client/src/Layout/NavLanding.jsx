import React from 'react'
import {Link} from 'react-router-dom'
const NavLanding = () => {
  return (
    <div className='flex flex-row justify-between p-10 bg-pink-50'>
        <div className="">NO LIMIT</div>
        <div className="flex flex-row gap-6">
            <Link to='/signin'>Login</Link>
            
            <p>Blog</p>
        </div>
    </div>
  )
}

export default NavLanding