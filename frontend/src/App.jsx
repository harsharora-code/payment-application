import { useState } from 'react'
import Signin from './pages/Signin'
import {Signup} from './pages/Signup'
import SendMoney from './pages/SendMoney'
import DashBoard from './pages/DashBoard'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Signin' element={<Signin/>}/> 
        <Route path='/' element={<DashBoard/>}/>
        <Route path='/SendMoney' element={<SendMoney/>}/>
      </Routes>
      </BrowserRouter>

      
    </div>
  )
}

export default App
