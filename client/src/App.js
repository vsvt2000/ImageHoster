import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home.js'
import Login from './components/Login.js'
import Dashboard from './components/Dashboard.js'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>


  )
}