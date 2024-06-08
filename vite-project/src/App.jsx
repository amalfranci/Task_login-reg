import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'


import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<Home/>} ></Route>


      </Routes>
      
      
      
      </BrowserRouter>
     
   
    </>
  )
}

export default App
