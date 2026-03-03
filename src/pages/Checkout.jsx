import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ordersAPI, couponsAPI } from "../services/api";
import "./Checkout.css";
import { toast } from "react-toastify";

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
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

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
    billingForm: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      governorate: "",
      postalCode: "",
      phone: "",
    },
  });

  const [shippingCost, setShippingCost] = useState(0);
  const [loading, setLoading] = useState(false);

  const subtotal = getCartTotal();
  const total = subtotal + shippingCost - discountAmount;

  const handleShippingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      billingForm: {
        ...prev.billingForm,
        [name]: value,
      },
    }));
  };

  const handleShippingGovernorate = (e) => {
    const gov = GOVERNORATES.find((g) => g.name === e.target.value);
    if (!gov) return;

    setForm((prev) => ({ ...prev, governorate: gov.name }));
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
        couponCode: discountCode, // ✨ Pass discount code to API
      });

      clearCart();
      toast.success("تم تأكيد الطلب بنجاح");
      navigate("/");
    } catch {
      toast.error("حصل خطأ، حاول مرة تانية");
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems.length) {
    navigate("/cart");
    return null;
  }

  const applyDiscount = async () => {
    if (!discountCode.trim()) return;
    setCouponLoading(true);
    try {
      const data = await couponsAPI.validateCoupon(discountCode.trim(), subtotal);
      // Backend returns: { success, message, discount_amount, coupon: {...} }
      const amount = parseFloat(data.discount_amount || data.discount || 0);
      setDiscountAmount(amount);
      setAppliedCoupon(data);
      toast.success(`✅ تم تطبيق الخصم: ${amount.toFixed(2)} EGP`);
    } catch (err) {
      setDiscountAmount(0);
      setAppliedCoupon(null);
      const msg = err?.data?.message || err?.message || "الكود غير صحيح";
      toast.error(msg);
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setDiscountCode("");
    setDiscountAmount(0);
    setAppliedCoupon(null);
    toast.info("تم إزالة الكوبون");
  };

  return (
    <div className="checkout-page">
      <div className="container-custom">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-layout">
          {/* LEFT FORM */}
          <form onSubmit={handleSubmit} className="checkout-form">
            {/* CONTACT */}
            <div className="form-section contact-section">
              <div className="contact-header">
                <h2>Contact</h2>
                <a href="/login" type="button" className="btn-contact">
                  Sign In
                </a>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="smsOffers"
                  checked={form.smsOffers}
                  onChange={handleShippingChange}
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
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleShippingChange}
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
                  onChange={handleShippingChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="apartment"
                  placeholder="Apartment (optional)"
                  value={form.apartment}
                  onChange={handleShippingChange}
                />
              </div>

              <div className="form-row three-columns">
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleShippingChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <select
                    name="governorate"
                    value={form.governorate}
                    onChange={handleShippingGovernorate}
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
                    placeholder="Postal Code (optional)"
                    value={form.postalCode}
                    onChange={handleShippingChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleShippingChange}
                  required
                />
              </div>

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={form.saveInfo}
                  onChange={handleShippingChange}
                />
                Save this information for next time
              </label>
            </div>

            {/* SHIPPING METHOD */}
            <div className="form-section bordered-box">
              <h2>Shipping method</h2>
              <div className="shipping-box">
                Shipping to {form.governorate || "—"}: {shippingCost} EGP
              </div>
            </div>

            {/* PAYMENT */}
            <div className="form-section bordered-box">
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

              <div
                className={`billing-form ${form.billingSame ? "hidden" : "visible"}`}
              >
                <div className="form-row two-columns">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={form.billingForm.firstName}
                    onChange={handleBillingChange}
                    required={!form.billingSame}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.billingForm.lastName}
                    onChange={handleBillingChange}
                    required={!form.billingSame}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={form.billingForm.address}
                    onChange={handleBillingChange}
                    required={!form.billingSame}
                  />
                </div>

                <div className="form-row three-columns">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.billingForm.city}
                    onChange={handleBillingChange}
                    required={!form.billingSame}
                  />

                  <select
                    name="governorate"
                    value={form.billingForm.governorate}
                    onChange={handleBillingChange}
                    required={!form.billingSame}
                  >
                    <option value="">Governorate</option>
                    {GOVERNORATES.map((g) => (
                      <option key={g.name} value={g.name}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={form.billingForm.postalCode}
                    onChange={handleBillingChange}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={form.billingForm.phone}
                    onChange={handleBillingChange}
                    required={!form.billingSame}
                  />
                </div>
              </div>
            </div>

            {/* Order Summary Mobile */}
            <div className="order-summary-mobile">
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
              <div className="discount-section">
                {appliedCoupon ? (
                  <div className="coupon-applied-badge">
                    <div className="coupon-info">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tag-icon">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                      </svg>
                      <span className="coupon-code">{appliedCoupon.code}</span>
                      <span className="coupon-amount">−{discountAmount.toFixed(2)} EGP</span>
                    </div>
                    <button type="button" className="coupon-remove-btn" onClick={removeCoupon} aria-label="Remove coupon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && applyDiscount()}
                    />
                    <button
                      type="button"
                      disabled={!discountCode.trim() || couponLoading}
                      onClick={applyDiscount}
                    >
                      {couponLoading ? "..." : "Apply"}
                    </button>
                  </>
                )}
              </div>
              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{subtotal} EGP</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shippingCost} EGP</span>
                </div>
                {discountAmount > 0 && (
                  <div className="summary-row discount-row">
                    <span>Discount</span>
                    <span className="discount-value">−{discountAmount.toFixed(2)} EGP</span>
                  </div>
                )}

                <div className="summary-total">
                  <span>Total</span>
                  <span>{total.toFixed(2)} EGP</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary btn-complete-order"
            >
              {loading ? "Processing..." : "Complete order"}
            </button>
          </form>

          {/* RIGHT SUMMARY Desktop */}
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
            <div className="discount-section">
              {appliedCoupon ? (
                <div className="coupon-applied-badge">
                  <div className="coupon-info">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tag-icon">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                      <line x1="7" y1="7" x2="7.01" y2="7"></line>
                    </svg>
                    <span className="coupon-code">{appliedCoupon.code}</span>
                    <span className="coupon-amount">−{discountAmount.toFixed(2)} EGP</span>
                  </div>
                  <button type="button" className="coupon-remove-btn" onClick={removeCoupon} aria-label="Remove coupon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && applyDiscount()}
                  />
                  <button
                    type="button"
                    disabled={!discountCode.trim() || couponLoading}
                    onClick={applyDiscount}
                  >
                    {couponLoading ? "..." : "Apply"}
                  </button>
                </>
              )}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{subtotal} EGP</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shippingCost} EGP</span>
              </div>
              {discountAmount > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount</span>
                  <span className="discount-value">−{discountAmount.toFixed(2)} EGP</span>
                </div>
              )}

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
