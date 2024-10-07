import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AboutUs } from './pages/Aboutus'
import { Landingpage } from './pages/Landingpage'
import { UserSignup } from './pages/UserSignup'
import { UserSignin } from './pages/UserSignin'
import { AdminSignup } from './pages/AdminSignup'
import { AdminSignin } from './pages/AdminSignin'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landingpage />}></Route>
      <Route path='/aboutus' element={<AboutUs />}></Route>
      <Route path='/user/signup' element={<UserSignup />}></Route>
      <Route path='/user/signin' element={<UserSignin />}></Route>
      <Route path='/admin/signup' element={<AdminSignup />}></Route>
      <Route path='/admin/signin' element={<AdminSignin />}></Route>
    </Routes>
    </BrowserRouter>
    
    
    </>
  )
}

export default App
