import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { logout } from './store/slices/authSlice';
import AuthPage from './pages/AuthPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Protected Route Component //
function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/auth" />;
}

// Main App Component //
function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <div className="app">
        {isAuthenticated && (
          <nav className="nav">
            <NavLink to="/products" className="nav-link">Products</NavLink>
            <NavLink to="/cart" className="nav-link">Cart</NavLink>
            <button onClick={() => dispatch(logout())} className="nav-link logout-btn">
              Logout
            </button>
          </nav>
        )}

        <Routes>
          <Route path="/auth" element={isAuthenticated ? <Navigate to="/products" /> : <AuthPage />} />
          <Route path="/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/products" : "/auth"} />} />
        </Routes>
        <ToastContainer position="bottom-right" theme="colored" />
      </div>
    </BrowserRouter>
  );
}

export default App;
