import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useLoginMutation, useSignupMutation } from '../../../store/slices/authApi';
import { setCredentials } from '../../../store/slices/authSlice';
import Button from '../../components/common/Button/Button';
import './AuthPage.css';

// Auth Page with Signup and Login //
export default function AuthPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    const [login] = useLoginMutation();
    const [signup] = useSignupMutation();
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isSignupLoading, setIsSignupLoading] = useState(false);

    const [signupData, setSignupData] = useState({ email: '', password: '' });
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/products');
        }
    }, [isAuthenticated, navigate]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSignupLoading(true);
        try {
            const result = await signup(signupData).unwrap();
            dispatch(setCredentials(result));
            toast.success('Account created successfully!');
            navigate('/products');
        } catch (err: any) {
            toast.error(err.data?.message || 'Signup failed');
        } finally {
            setIsSignupLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoginLoading(true);
        try {
            const result = await login(loginData).unwrap();
            dispatch(setCredentials(result));
            toast.success('Welcome back!');
            navigate('/products');
        } catch (err: any) {
            toast.error(err.data?.message || 'Login failed');
        } finally {
            setIsLoginLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <h1 className="auth-title">Shopping Cart</h1>

            <div className="auth-container">
                {/* Signup Box */}
                <div className="auth-box">
                    <h2>Create Account</h2>
                    <form onSubmit={handleSignup}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={signupData.email}
                            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password (min 6 chars)"
                            value={signupData.password}
                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                            required
                            minLength={6}
                        />
                        <Button type="submit" isLoading={isSignupLoading} fullWidth>
                            Sign Up
                        </Button>
                    </form>
                </div>

                {/* Login Box */}
                <div className="auth-box">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            required
                        />
                        <Button type="submit" isLoading={isLoginLoading} fullWidth>
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
