import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import MakePrivateRoute from './components/Routes/PrivateRoute';
import ForgotPassword from './pages/Auth/ForgotPassword';
import MakeAdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddCategory from './pages/admin/AddCategory';
import AddProducts from './pages/admin/AddProducts';
import Users from './pages/admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import SearchBox from './pages/SearchBox';
import ProductDetails from './pages/ProductDetails';

import ProductByCategory from './pages/ProductByCategory';
import Cart from './pages/Cart';
import ProcessOrders from './pages/admin/ProcessOrders';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/search' element={<SearchBox/>}/>
      <Route path='/cart' element={<Cart/>}/>
      
      <Route path='/category/:slug' element={<ProductByCategory/>}/>
      <Route path='/product/:slug' element={<ProductDetails/>}/>
      <Route path='/dashboard' element={<MakePrivateRoute/>}>
        <Route path='user' element={<Dashboard/>}/>
        <Route path='user/profile' element={<Profile/>}/> 
        <Route path='user/orders' element={<Orders/>}/> 
      </Route>
      <Route path='/dashboard' element={<MakeAdminRoute/>}>
        <Route path='admin' element={<AdminDashboard/>}/> 
        <Route path='admin/add-category' element={<AddCategory/>}/> 
        <Route path='admin/add-products' element={<AddProducts/>}/> 
        <Route path='admin/product/:slug' element={<UpdateProduct/>}/> 
        <Route path='admin/products' element={<Products/>}/>
        <Route path='admin/users' element={<Users/>}/> 
        <Route path='admin/orders' element={<ProcessOrders/>}/> 
       
      </Route>
      
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/forgot-pwd' element={<ForgotPassword />}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/Policy' element={<Policy/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
      
    </>
  );
}

export default App;
