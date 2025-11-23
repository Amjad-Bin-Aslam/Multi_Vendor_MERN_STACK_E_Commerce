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
} from "./Routes/AppRoutes"

import { 
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProductPage,
  ShopAllProductsPage,
  ShopCreateEventPage,
  ShopAllEventsPage,
  ShopAllCouponsCodePage,
  ShopPreviewPage
 } from './Routes/ShopRoutes';

import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import store from './redux/store';
import { loadShop, loadUser } from './redux/actions/user';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import SellerProtectedRoute from './ProtectedRoutes/SellerProtectedRoute';
import { getAllProducts } from './redux/actions/product';
import { getAllEvents } from './redux/actions/event';


function App() {

  const navigate = useNavigate();

  const { loading, isAuthenticated } = useSelector((state) => state.user)
  const { isSeller, shop } = useSelector((state) => state.seller)

  useEffect(() => {
    store.dispatch(loadUser()); 
    store.dispatch(loadShop());
    store.dispatch(getAllProducts());
    store.dispatch(getAllEvents())
  },[]) 

  console.log(isSeller, shop) 
 
  return ( 
    
    <>
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
        <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} >
          <ProfilePage />
        </ProtectedRoute>
       } />
       <Route path='/activation/:activation_token' element = {<ActivationPage/>} />
       
       {/* shop Routes */}
      <Route path='/shop-create' element = {<ShopCreatePage />} /> 
      <Route path='/shop-login' element = {<ShopLoginPage />} /> 
      <Route path='/shop/preview/:id' element = {<ShopPreviewPage/>} />
      <Route path='/shop/:id' element = {
        <SellerProtectedRoute>
          <ShopHomePage /> 
        </SellerProtectedRoute>
      } /> 
      <Route path='/dashboard' element = {
        <SellerProtectedRoute>
          <ShopDashboardPage />
        </SellerProtectedRoute>
      } /> 
      <Route path='/dashboard-create-product' element = {
        <SellerProtectedRoute>
          <ShopCreateProductPage />
        </SellerProtectedRoute>
      } /> 
      <Route path='/dashboard-products' element = {
        <SellerProtectedRoute>
          <ShopAllProductsPage />
        </SellerProtectedRoute>
      } /> 
      <Route path='/dashboard-create-event' element = {
        <SellerProtectedRoute>
          <ShopCreateEventPage />
        </SellerProtectedRoute>
      } />
       <Route path='/dashboard-events' element = {
        <SellerProtectedRoute>
          <ShopAllEventsPage />
        </SellerProtectedRoute>
      } /> 
      {/* Coupon code routes */}
      <Route path='/dashboard/coupons' element = {
        <SellerProtectedRoute>
          <ShopAllCouponsCodePage />
        </SellerProtectedRoute>
      } /> 

    </Routes> 

    </div>
    </> 
    
  )
}

export default App
