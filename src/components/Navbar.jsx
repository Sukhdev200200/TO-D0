import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex  justify-between bg-slate-600 text-white h-10 '>
      <div className="logo p-0 ">
        <span className='font-bold text-lg flex '>Daily Agenda</span>
      </div>
      <ul className='flex gap-4 mr-28 mx-2'>
        <li className='cursor-pointer hover:font-bold '>Home</li>
        <li className='cursor-pointer hover:font-bold'>About</li>
      </ul>
      
    </nav>
  )
}

export default Navbar
