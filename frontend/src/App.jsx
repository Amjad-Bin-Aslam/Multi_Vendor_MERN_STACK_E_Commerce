import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { LoginPage, SignupPage, ActivationPage, HomePage } from "./Routes"
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import store from './redux/store';
import { loadUser } from './redux/actions/user';

function App() {

  useEffect(() => {
    store.dispatch(loadUser()); 
  },[]) 

  return ( 
    
    <div>

    <ToastContainer />

    <Routes>
      <Route path='/' element = {<HomePage/>} />
      <Route path='/login' element = {<LoginPage/>} />
      <Route path='/sign-up' element = {<SignupPage/>} />
      <Route path='/activation/:activation_token' element = {<ActivationPage/>} />
    </Routes>

    </div>
    
  )
}

export default App
