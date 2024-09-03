import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div>
        <nav className='flex justify-between bg-slate-900 text-white py-2'>
            <div className="logo  w-[20%] ">
                <span className='text-white font-bold p-3 text-xl'>i <span className='text-black font-bold text-2xl'>Tasks</span></span>
            </div>
            <ul className="flex gap-8 w-[70%] cursor-pointer ">
               <NavLink className={(e)=>{return e.isActive?"active":""} }  to="/"><li>Home</li>
                </NavLink>    
                
                <NavLink className={(e)=>{return e.isActive?"active":""} } to="/tasks"><li>Your Tasks</li></NavLink>
                {/* <li>Your Tasks</li> */}
            </ul>
        </nav>
    </div>
  )
}

export default Navbar