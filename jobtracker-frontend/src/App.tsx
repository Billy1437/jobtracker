import { useState } from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/homepage' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
