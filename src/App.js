import React from 'react'
import Weather from './Components/Weather'
import Navbar from './Components/Navbar'
import './App.css'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Weather/>
    </div>
  )
}

export default App
