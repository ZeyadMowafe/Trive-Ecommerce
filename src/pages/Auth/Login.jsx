import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email: formData.email, password: formData.password });
      navigate('/');
    } catch (err) {
      console.error("Login Error Details:", err.data || err);
      // AuthContext handles setting global error, but we want local feedback too
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container-custom">
        <motion.div className="auth-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            </div>

            <button type="submit" className="btn-primary w-100" disabled={loading} style={{ marginTop: '1.5rem' }}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>


          <p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;






