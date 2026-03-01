import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../services/api";
import { toast } from "react-toastify";
import "./Addresses.css";

const Addresses = () => {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "Egypt",
        is_default: false
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const data = await authAPI.getAddresses();
            setAddresses(data.results || data);
        } catch (error) {
            console.error("Error fetching addresses:", error);
            toast.error("Failed to load addresses");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAddress) {
                await authAPI.updateAddress(editingAddress.id, formData);
                toast.success("Address updated successfully");
            } else {
                await authAPI.createAddress(formData);
                toast.success("Address added successfully");
            }
            setIsFormOpen(false);
            setEditingAddress(null);
            resetForm();
            fetchAddresses();
        } catch (error) {
            toast.error(error.message || "Failed to save address");
        }
    };

    const handleEdit = (address) => {
        setEditingAddress(address);
        setFormData({
            full_name: address.full_name,
            phone: address.phone,
            address_line1: address.address_line1,
            address_line2: address.address_line2 || "",
            city: address.city,
            state: address.state,
            postal_code: address.postal_code,
            country: address.country,
            is_default: address.is_default
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this address?")) {
            try {
                await authAPI.deleteAddress(id);
                toast.success("Address deleted");
                fetchAddresses();
            } catch (error) {
                toast.error("Failed to delete address");
            }
        }
    };

    const handleSetDefault = async (id) => {
        try {
            await authAPI.setDefaultAddress(id);
            toast.success("Default address updated");
            fetchAddresses();
        } catch (error) {
            toast.error("Failed to set default address");
        }
    };

    const resetForm = () => {
        setFormData({
            full_name: "",
            phone: "",
            address_line1: "",
            address_line2: "",
            city: "",
            state: "",
            postal_code: "",
            country: "Egypt",
            is_default: false
        });
    };

    return (
        <div className="addresses-page">
            <div className="container-custom">
                <div className="addresses-header">
                    <h1>Shipping Addresses</h1>
                    <button
                        className="btn-primary"
                        onClick={() => {
                            setEditingAddress(null);
                            resetForm();
                            setIsFormOpen(true);
                        }}
                    >
                        Add New Address
                    </button>
                </div>

                {loading ? (
                    <div className="addresses-loading">
                        <div className="loader"></div>
                    </div>
                ) : addresses.length === 0 ? (
                    <div className="empty-addresses">
                        <div className="empty-icon">📍</div>
                        <h2>No addresses found</h2>
                        <p>Add a shipping address to speed up your checkout process.</p>
                    </div>
                ) : (
                    <div className="addresses-grid">
                        {addresses.map((address) => (
                            <motion.div
                                key={address.id}
                                className={`address-card ${address.is_default ? "default" : ""}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {address.is_default && <span className="default-badge">Default</span>}
                                <div className="address-details">
                                    <h3>{address.full_name}</h3>
                                    <p>{address.address_line1}</p>
                                    {address.address_line2 && <p>{address.address_line2}</p>}
                                    <p>{address.city}, {address.state} {address.postal_code}</p>
                                    <p>{address.country}</p>
                                    <p className="phone">📞 {address.phone}</p>
                                </div>
                                <div className="address-actions">
                                    <button onClick={() => handleEdit(address)} className="action-btn edit">Edit</button>
                                    {!address.is_default && (
                                        <button onClick={() => handleSetDefault(address.id)} className="action-btn set-default">Set as Default</button>
                                    )}
                                    <button onClick={() => handleDelete(address.id)} className="action-btn delete">Delete</button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Modal Form */}
                <AnimatePresence>
                    {isFormOpen && (
                        <div className="modal-overlay" onClick={() => setIsFormOpen(false)}>
                            <motion.div
                                className="modal-content"
                                onClick={e => e.stopPropagation()}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <div className="modal-header">
                                    <h2>{editingAddress ? "Edit Address" : "Add New Address"}</h2>
                                    <button className="close-btn" onClick={() => setIsFormOpen(false)}>&times;</button>
                                </div>
                                <form onSubmit={handleSubmit} className="address-form">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Address Line 1</label>
                                        <input
                                            type="text"
                                            name="address_line1"
                                            value={formData.address_line1}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Address Line 2 (Optional)</label>
                                        <input
                                            type="text"
                                            name="address_line2"
                                            value={formData.address_line2}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>State / Region</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Postal Code</label>
                                            <input
                                                type="text"
                                                name="postal_code"
                                                value={formData.postal_code}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Country</label>
                                            <input
                                                type="text"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group checkbox">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="is_default"
                                                checked={formData.is_default}
                                                onChange={handleInputChange}
                                            />
                                            Set as default address
                                        </label>
                                    </div>
                                    <div className="form-actions">
                                        <button type="button" className="btn-outline" onClick={() => setIsFormOpen(false)}>Cancel</button>
                                        <button type="submit" className="btn-primary">Save Address</button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Addresses;
