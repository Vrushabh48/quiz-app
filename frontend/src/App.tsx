import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AboutUs } from './pages/AboutUs'
import { Landingpage } from './pages/Landingpage'
import { UserSignup } from './pages/UserSignup'
import { UserSignin } from './pages/UserSignin'
import { AdminSignup } from './pages/AdminSignup'
import { AdminSignin } from './pages/AdminSignin'
import { UserDashboard } from './pages/UserDashboard'
import { Livequizes } from './pages/Livequizes'
import { AttemptQuiz } from './pages/AttemptQuiz'
import { Result } from './pages/Result'
import { AdminDashboard } from './pages/AdminDashboard'
import { CreateQuiz } from './components/CreateQuiz'

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
      <Route path='/user/dashboard' element={<UserDashboard />}></Route>
      <Route path='/user/livequizes' element={<Livequizes />}></Route>
      <Route path='/user/attemptquiz/:quizid' element={<AttemptQuiz />}></Route>
      <Route path='/user/result' element={<Result />}></Route>
      <Route path='/admin/dashboard' element={<AdminDashboard />}></Route>
      <Route path='/admin/create' element={<CreateQuiz />}></Route>
    </Routes>
    </BrowserRouter>
    
    
    </>
  )
}

export default App
