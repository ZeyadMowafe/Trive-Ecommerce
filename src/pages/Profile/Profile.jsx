import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const { user, logout, loading } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="profile-loading">
                <div className="loader"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile-error">
                <h2>Please login to view your profile</h2>
                <Link to="/login" className="btn-primary">Login Now</Link>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="container-custom">
                <motion.div
                    className="profile-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="profile-header">
                        <div className="profile-avatar">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.fullName} />
                            ) : (
                                <div className="avatar-placeholder">
                                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className="profile-info">
                            <h1>{user.fullName || `${user.firstName} ${user.lastName}`}</h1>
                            <p className="profile-email">{user.email}</p>
                            <span className="user-badge">{user.isAdmin ? 'Administrator' : 'Customer'}</span>
                        </div>
                    </div>

                    <div className="profile-content">
                        <div className="profile-menu">
                            <h3>Account Settings</h3>
                            <div className="menu-items">
                                <Link to="/orders" className="menu-item">
                                    <span className="icon">📦</span> My Orders
                                </Link>
                                <Link to="/addresses" className="menu-item">
                                    <span className="icon">📍</span> Shipping Addresses
                                </Link>
                                <button onClick={handleLogout} className="menu-item logout-btn">
                                    <span className="icon">🚪</span> Logout
                                </button>
                            </div>
                        </div>

                        <div className="profile-details-card">
                            <h3>Personal Information</h3>
                            <div className="details-grid">
                                <div className="detail-item">
                                    <label>First Name</label>
                                    <p>{user.firstName}</p>
                                </div>
                                <div className="detail-item">
                                    <label>Email Address</label>
                                    <p>{user.email}</p>
                                </div>
                                <div className="detail-item">
                                    <label>Joined Since</label>
                                    <p>{new Date(user.dateJoined).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
