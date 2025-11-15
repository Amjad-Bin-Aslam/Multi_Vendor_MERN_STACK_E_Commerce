import './index.css'
import { BrowserRouter,Routes,Route, useNavigate } from 'react-router-dom'
import { 
  LoginPage, 
  SignupPage, 
  ActivationPage, 
  HomePage, 
  ProductPage, 
  BestSellingPage, 
  EventsPage, 
  FAQPage, 
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
} from "./Routes"
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import store from './redux/store';
import { loadShop, loadUser } from './redux/actions/user';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
// import ShopHomePage from './pages/ShopHomePage.jsx';


function App() {

  const navigate = useNavigate();

  const { loading, isAuthenticated } = useSelector((state) => state.user)
  const { isSeller, shop, isLoading } = useSelector((state) => state.seller)

  useEffect(() => {
    store.dispatch(loadUser()); 
    store.dispatch(loadShop());


  },[]) 

  console.log(isSeller, shop) 
 
  return ( 
    
    <>
    {
      loading || isLoading ? (
        null
      ) : (
    <div>

    <ToastContainer />

    <Routes>
      <Route path='/' element = {<HomePage/>} />
      <Route path='/login' element = {<LoginPage/>} />
      <Route path='/sign-up' element = {<SignupPage/>} />
      <Route path='/seller/activation/:activation_token' element = {<SellerActivationPage/>} />
      <Route path='/products' element ={ <ProductPage /> } />
      <Route path='/product/:name' element ={ <ProductDetailsPage /> } />
      <Route path='/best-selling' element ={ <BestSellingPage /> } />
      <Route path='/events' element = {<EventsPage />} />
      <Route path='/faq' element = {<FAQPage />} /> 
      <Route path='/profile' element = { 
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <ProfilePage />
        </ProtectedRoute>
       } />
       <Route path='/activation/:activation_token' element = {<ActivationPage/>} />
       {/* shop Routes */}
      <Route path='/shop-create' element = {<ShopCreatePage />} /> 
      <Route path='/shop-login' element = {<ShopLoginPage />} /> 
      <Route path='/shop/:id' element = {<ShopHomePage />} /> 

    </Routes> 

    </div>
      )
    }
    </> 
    
  )
}

export default App
