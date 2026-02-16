import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { logout } from './store/slices/authSlice';
import AuthPage from './pages/Auth/AuthPage';
import ProductsPage from './pages/Products/ProductsPage';
import CartPage from './pages/Cart/CartPage';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './components/common/Button/Button';
import './App.css';

// Protected Route Component //
function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/auth" />;
}

// Main App Component //
function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Successfully logged out!');
    navigate('/auth');
  };

  return (
    <div className="app">
      {isAuthenticated && (
        <nav className="nav">
          <NavLink to="/products" className="nav-link">Products</NavLink>
          <NavLink to="/cart" className="nav-link">Cart</NavLink>
          <Button onClick={handleLogout} variant="secondary" className="logout-btn">
            Logout
          </Button>
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
  );
}

export default App;
