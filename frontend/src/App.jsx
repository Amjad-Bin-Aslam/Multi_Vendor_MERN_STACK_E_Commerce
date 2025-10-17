import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { LoginPage, SignupPage, ActivationPage } from "./Routes"
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    
    <div>

    <ToastContainer />

    <Routes>
      <Route path='/login' element = {<LoginPage/>} />
      <Route path='/sign-up' element = {<SignupPage/>} />
      <Route path='/activation/:activation_token' element = {<ActivationPage/>} />
    </Routes>

    </div>
    
  )
}

export default App
