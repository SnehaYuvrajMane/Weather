import React from 'react'
import './Styles.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="left">
        <span> Weather</span>
      </div>
      <div className="right">
        <button> Refresh</button>
      </div>
    </div>
  )
}

export default Navbar
