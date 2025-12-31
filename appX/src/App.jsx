import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './admin/components/AdminProtectedRoutes';
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast';


// Regular user pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';


// Admin pages
import AdminLogin from './admin/pages/AdminLogin';
import Dashboard from './admin/pages/Dashboard';
import AdminUsers from './admin/pages/AdminUsers';
import AdminOrders from './admin/pages/AdminOrders';
import AdminAddProduct from './admin/pages/AdminAddProduct';
import Stats from './admin/pages/Stats';
import AdminEditProduct from './admin/pages/AdminEditProduct';
import AdminProducts from './admin/pages/AdminProducts';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <AuthProvider>
        <AdminAuthProvider>

             <Toaster 
          position="top-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 2000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
            error: {
              duration: 2000,
            },
          }}
        />
          <Routes>
            {/* ========== PUBLIC ROUTES ========== */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            
            {/* ========== PROTECTED USER ROUTES ========== */}
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/wishlist" element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            } />

 
            
            {/* ========== ADMIN ROUTES ========== */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/admin/dashboard" element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            } />
            
            <Route path="/admin/users" element={
              <AdminProtectedRoute>
                <AdminUsers />
              </AdminProtectedRoute>
            } />
            
            <Route path="/admin/orders" element={
              <AdminProtectedRoute>
                <AdminOrders />
              </AdminProtectedRoute>
            } />

            <Route path="/admin/products" element={
              <AdminProtectedRoute>
                 <AdminProducts />
              </AdminProtectedRoute>
            } />

            
            <Route path="/admin/products/add" element={
              <AdminProtectedRoute>
                <AdminAddProduct />
              </AdminProtectedRoute>
            } />
            
            <Route path="/admin/stats" element={
              <AdminProtectedRoute>
                <Stats /> 
              </AdminProtectedRoute>
            } />

           <Route path="/admin/products/edit/:id" element={
               <AdminProtectedRoute>
                 <AdminEditProduct />
               </AdminProtectedRoute>
            } />


          </Routes>
        </AdminAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

