import { useState } from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route path='/homepage' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
