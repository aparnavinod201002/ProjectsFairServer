import { useContext } from 'react'

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Footer from './Components/Footer'
import Auth from './Pages/Auth'
import { TokenAuthContext } from '../ContextAPI/TokenAuth'

function App() {
  const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)

  return (
    <>
   
    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={isAuthorized?<Dashboard/>:<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/projects' element={isAuthorized?<Projects/>:<Home/>}/>
      <Route path='/*' element={<Navigate to={'/'}/>}/>
      
    </Routes>
    <Footer/>
    </>
  )
}

export default App
