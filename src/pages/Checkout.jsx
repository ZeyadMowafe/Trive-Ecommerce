import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ordersAPI } from "../services/api";
import "./Checkout.css";

const GOVERNORATES = [
  { name: "Cairo", shipping: 50 },
  { name: "Giza", shipping: 60 },
  { name: "Alexandria", shipping: 70 },
  { name: "Minya", shipping: 100 },
  { name: "Assiut", shipping: 120 },
  { name: "Sohag", shipping: 130 },
  { name: "Aswan", shipping: 150 },
];

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    governorate: "",
    postalCode: "",
    phone: "",
    saveInfo: false,
    smsOffers: false,
    billingSame: true,
  });

  const [shippingCost, setShippingCost] = useState(0);
  const [loading, setLoading] = useState(false);

  const subtotal = getCartTotal();
  const total = subtotal + shippingCost;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleGovernorate = (e) => {
    const gov = GOVERNORATES.find((g) => g.name === e.target.value);
    setForm({ ...form, governorate: gov.name });
    setShippingCost(gov.shipping);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await ordersAPI.create({
        customer: form,
        items: cartItems,
        subtotal,
        shipping: shippingCost,
        total,
        paymentMethod: "Cash on Delivery",
      });

      clearCart();
      alert("Order placed successfully");
      navigate("/");
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems.length) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="container-custom">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-layout">
          {/* LEFT FORM */}
          <form onSubmit={handleSubmit} className="checkout-form">
            {/* CONTACT */}
            <div className="form-section">
              <h2>Contact</h2>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="smsOffers"
                  checked={form.smsOffers}
                  onChange={handleChange}
                />
                Email me with news and offers
              </label>
            </div>

            {/* DELIVERY */}
            <div className="form-section">
              <h2>Delivery</h2>

              <div className="form-group">
                <select disabled>
                  <option>Egypt</option>
                </select>
              </div>

              <div className="form-row two-columns">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="apartment"
                  placeholder="Apartment (optional)"
                  value={form.apartment}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <select
                    name="governorate"
                    value={form.governorate}
                    onChange={handleGovernorate}
                    required
                  >
                    <option value="">Governorate</option>
                    {GOVERNORATES.map((g) => (
                      <option key={g.name} value={g.name}>
                        {g.name} (+{g.shipping} EGP)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={form.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (required for delivery)"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={form.saveInfo}
                  onChange={handleChange}
                />
                Save this information for next time
              </label>

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="smsOffers"
                  checked={form.smsOffers}
                  onChange={handleChange}
                />
                Text me with news and offers
              </label>
            </div>

            {/* SHIPPING METHOD */}
            <div className="form-section">
              <h2>Shipping method</h2>
              <div className="shipping-box">
                Shipping to {form.governorate || "—"}: {shippingCost} EGP
              </div>
            </div>

            {/* PAYMENT */}
            <div className="form-section">
              <h2>Payment</h2>
              <p>All transactions are secure and encrypted.</p>
              <div className="payment-box">
                Cash on Delivery <br />
                <small>الدفع عند الاستلام</small>
              </div>
            </div>

            {/* BILLING */}
            <div className="form-section">
              <h2>Billing address</h2>
              <label className="checkbox">
                <input
                  type="radio"
                  checked={form.billingSame}
                  onChange={() => setForm({ ...form, billingSame: true })}
                />
                Same as shipping address
              </label>
              <label className="checkbox">
                <input
                  type="radio"
                  checked={!form.billingSame}
                  onChange={() => setForm({ ...form, billingSame: false })}
                />
                Use a different billing address
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Processing..." : "Complete order"}
            </button>
          </form>

          {/* RIGHT SUMMARY */}
          <div className="order-summary">
            <h2>Order Summary</h2>

            {cartItems.map((item) => (
              <div key={item.cartId} className="summary-item">
                <div className="summary-item-image">
                  <img src={item.images[0]} alt={item.name} />
                </div>
                <div className="summary-item-details">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="summary-item-price">
                  {(item.price * item.quantity).toFixed(2)} EGP
                </div>
              </div>
            ))}

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{subtotal} EGP</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shippingCost} EGP</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>{total} EGP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
