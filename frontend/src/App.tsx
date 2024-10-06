import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AboutUs } from './pages/Aboutus'
import { Landingpage } from './pages/Landingpage'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landingpage />}></Route>
      <Route path='/aboutus' element={<AboutUs />}></Route>
    </Routes>
    </BrowserRouter>
    
    
    </>
  )
}

export default App
