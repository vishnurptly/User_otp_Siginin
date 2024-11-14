
import './App.css'
import {Route,BrowserRouter, Routes} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
function App() {

 
  
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
        </Routes>
    
    </BrowserRouter>
      
    </>
  )
}

export default App
