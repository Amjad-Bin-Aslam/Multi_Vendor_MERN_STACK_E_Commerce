import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { LoginPage, SignupPage, ActivationPage, HomePage, ProductPage, BestSellingPage, EventsPage, FAQPage, ProductDetailsPage } from "./Routes"
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import store from './redux/store';
import { loadUser } from './redux/actions/user';
import { useSelector } from 'react-redux';



function App() {

  const { loading } = useSelector((state) => state.user)

  useEffect(() => {
    store.dispatch(loadUser()); 
  },[]) 

  return ( 
    
    <>
    {
      loading ? (
        null
      ) : (
    <div>

    <ToastContainer />

    <Routes>
      <Route path='/' element = {<HomePage/>} />
      <Route path='/login' element = {<LoginPage/>} />
      <Route path='/sign-up' element = {<SignupPage/>} />
      <Route path='/activation/:activation_token' element = {<ActivationPage/>} />
      <Route path='/products' element ={ <ProductPage /> } />
      <Route path='/product/:name' element ={ <ProductDetailsPage /> } />
      <Route path='/best-selling' element ={ <BestSellingPage /> } />
      <Route path='/events' element = {<EventsPage />} />
      <Route path='/faq' element = {<FAQPage />} /> 
    </Routes> 

    </div>
      )
    }
    </>
    
  )
}

export default App
