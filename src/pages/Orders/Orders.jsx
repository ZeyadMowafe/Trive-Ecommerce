import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ordersAPI } from '../../services/api';
import { Link } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const data = await ordersAPI.getOrders();
                setOrders(data.orders);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
                setError("Failed to load your orders. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        const colors = {
            'pending': '#f39c12',
            'processing': '#3498db',
            'shipped': '#9b59b6',
            'delivered': '#2ecc71',
            'cancelled': '#e74c3c',
            'returned': '#95a5a6'
        };
        return colors[status.toLowerCase()] || '#333';
    };

    if (loading) {
        return (
            <div className="orders-loading">
                <div className="loader"></div>
                <p>Loading your orders...</p>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <div className="container-custom">
                <div className="orders-header">
                    <h1>My Orders</h1>
                    <p>Track and manage your recent purchases</p>
                </div>

                {error ? (
                    <div className="orders-error-state">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()} className="btn-primary">Retry</button>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="empty-orders-state">
                        <div className="empty-icon">📦</div>
                        <h2>You haven't placed any orders yet</h2>
                        <p>When you buy items, they will appear here.</p>
                        <Link to="/shop" className="btn-primary">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order) => (
                            <motion.div
                                key={order.id}
                                className="order-card"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="order-main-info">
                                    <div className="order-id-group">
                                        <span className="label">Order ID</span>
                                        <span className="value">#{order.id.toString().padStart(6, '0')}</span>
                                    </div>
                                    <div className="order-date-group">
                                        <span className="label">Date</span>
                                        <span className="value">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="order-status-group">
                                        <span className="label">Status</span>
                                        <span
                                            className="status-badge"
                                            style={{ backgroundColor: getStatusColor(order.status) }}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="order-total-group">
                                        <span className="label">Total</span>
                                        <span className="value">{parseFloat(order.total || 0).toFixed(2)} EGP</span>
                                    </div>
                                </div>
                                <div className="order-items-preview">
                                    <div className="items-images">
                                        {order.items?.slice(0, 4).map((item, idx) => (
                                            <div key={idx} className="preview-image">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                        ))}
                                        {order.items?.length > 4 && (
                                            <div className="more-items">+{order.items.length - 4}</div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
