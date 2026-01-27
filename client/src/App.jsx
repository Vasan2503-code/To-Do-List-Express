import { useState } from 'react'

import './App.css'
import Landing from './Layout/landing'
import Register from './auth/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TaskLayout from './TaskUI/TaskLayout'
import {Toaster} from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'

function App() {
return (
    <ThemeProvider>
      <Toaster/>
    <Router>
      <Routes>

      <Route path= "/" element = {<Landing/>}/>
      <Route path="/signin" element={<Register/>}/>
      <Route path ="/tasks" element={<TaskLayout/>}/>
      
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App
