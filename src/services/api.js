/**
 * TRIVÉ API Integration Layer
 * Connects React frontend to Django REST Framework backend
 * Base URL: /api/v1/
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// ─── Token Management ────────────────────────────────────────────────────────

export const getAccessToken = () => localStorage.getItem('trive_access_token');
export const getRefreshToken = () => localStorage.getItem('trive_refresh_token');
export const setTokens = (access, refresh) => {
  localStorage.setItem('trive_access_token', access);
  if (refresh) localStorage.setItem('trive_refresh_token', refresh);
};
export const clearTokens = () => {
  localStorage.removeItem('trive_access_token');
  localStorage.removeItem('trive_refresh_token');
};

// ─── HTTP Client ──────────────────────────────────────────────────────────────

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

async function refreshAccessToken() {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error('No refresh token');

  const response = await fetch(`${BASE_URL}/auth/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    clearTokens();
    throw new Error('Token refresh failed');
  }

  const data = await response.json();
  setTokens(data.access, data.refresh || getRefreshToken());
  return data.access;
}

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const token = getAccessToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) headers['Authorization'] = `Bearer ${token}`;

  const config = { ...options, headers };

  // Remove Content-Type for FormData
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  let response = await fetch(url, config);

  // Handle 401 with token refresh
  if (response.status === 401 && getRefreshToken()) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        headers['Authorization'] = `Bearer ${newToken}`;
        return fetch(url, { ...config, headers });
      });
    }

    isRefreshing = true;
    try {
      const newToken = await refreshAccessToken();
      processQueue(null, newToken);
      headers['Authorization'] = `Bearer ${newToken}`;
      response = await fetch(url, { ...config, headers });
    } catch (err) {
      processQueue(err, null);
      throw err;
    } finally {
      isRefreshing = false;
    }
  }

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }
    const error = new Error(
      errorData.detail || errorData.message || errorData.error || 'Request failed'
    );
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  // 204 No Content
  if (response.status === 204) return null;

  return response.json();
}

// ─── Data Adapters ────────────────────────────────────────────────────────────
// Maps Django backend response shapes to what frontend components expect

export const adaptProduct = (product) => {
  if (!product) return null;

  // Extract unique sizes and colors from variants
  const variants = product.variants || [];
  const sizes = [...new Set(variants.filter((v) => v.size).map((v) => v.size))];
  const colors = [...new Set(variants.filter((v) => v.color).map((v) => v.color))];
  const colorMap = {};
  variants.forEach((v) => {
    if (v.color && v.color_hex) colorMap[v.color] = v.color_hex;
  });

  // Build inventory array
  const inventory = variants.length > 0
    ? variants.map((v) => ({
      variantId: v.id,
      size: v.size,
      color: v.color,
      colorHex: v.color_hex,
      count: v.stock_quantity || 0,
      stock: v.stock_quantity || 0,
      inStock: v.is_in_stock,
      price: v.effective_price || v.price,
      sku: v.sku,
    }))
    : [{ size: null, color: null, count: product.stock_quantity || 0, stock: product.stock_quantity || 0, inStock: product.is_in_stock }];

  // Build images array
  const images = product.images
    ? product.images.map((img) => img.image_url || img.image)
    : product.primary_image
      ? [product.primary_image]
      : [];

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description || product.short_description || '',
    shortDescription: product.short_description || '',
    price: parseFloat(product.price),
    compareAtPrice: product.compare_at_price ? parseFloat(product.compare_at_price) : null,
    originalPrice: product.compare_at_price ? parseFloat(product.compare_at_price) : parseFloat(product.price),
    discount: product.discount_percentage || 0,
    category:
      product.category_slug ||
      product.category?.slug ||
      product.category_name ||
      (product.category?.name) ||
      "",
    categoryName: product.category_name || product.category?.name || "",
    categorySlug: product.category_slug || product.category?.slug || "",
    categoryId: product.category?.id || product.category,
    image: images[0] || '/placeholder.jpg',
    images,
    sizes,
    colors,
    colorMap,
    inventory,
    inStock: product.is_in_stock,
    count: product.stock_quantity || 0,
    isNew: product.is_new_arrival,
    isBestSeller: product.is_featured,
    isOnSale: product.is_on_sale,
    rating: product.average_rating || 0,
    reviewCount: product.review_count || 0,
    material: product.material || '',
    weight: product.weight || '',
    careInstructions: product.care_instructions || '',
    tags: product.tags || [],
    sku: product.sku || '',
    createdAt: product.created_at,
  };
};

export const adaptUser = (user) => {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    fullName: user.full_name || `${user.first_name} ${user.last_name}`,
    phone: user.phone || '',
    avatar: user.avatar_url || user.avatar || null,
    isVerified: user.is_verified,
    authProvider: user.auth_provider,
    dateJoined: user.date_joined,
  };
};

export const adaptOrder = (order) => {
  if (!order) return null;
  return {
    id: order.id,
    orderNumber: order.order_number,
    status: order.status,
    paymentStatus: order.payment_status,
    total: parseFloat(order.total),
    subtotal: parseFloat(order.subtotal || 0),
    discount: parseFloat(order.discount_amount || 0),
    shippingCost: parseFloat(order.shipping_cost || 0),
    items: (order.items || []).map((item) => ({
      id: item.id,
      productId: item.product,
      productName: item.product_name,
      productImage: item.product_image,
      variantDetails: item.variant_details,
      quantity: item.quantity,
      unitPrice: parseFloat(item.unit_price),
      lineTotal: parseFloat(item.line_total),
    })),
    itemCount: order.item_count || order.items?.length || 0,
    address: order.shipping_address,
    createdAt: order.created_at,
    statusHistory: order.status_history || [],
  };
};

export const adaptCartItem = (item) => ({
  cartId: item.id, // Match CartDrawer
  cartItemId: item.id,
  id: item.product_detail?.id || item.product,
  slug: item.product_detail?.slug,
  name: item.product_detail?.name || '',
  image: item.product_detail?.primary_image || '',
  images: item.product_detail?.primary_image ? [item.product_detail?.primary_image] : [], // Match CartDrawer
  price: parseFloat(item.unit_price || item.product_detail?.price || 0),
  quantity: item.quantity,
  variantId: item.variant,
  variant: item.variant_detail || null,
  size: item.variant_detail?.size,
  color: item.variant_detail?.color,
  lineTotal: parseFloat(item.line_total || 0),
  stockAvailable: item.variant_detail?.stock_quantity ?? item.product_detail?.stock_quantity ?? 0,
});

// ─── Auth API ─────────────────────────────────────────────────────────────────

export const authAPI = {
  register: async ({ email, firstName, lastName, password, confirmPassword }) => {
    const data = await request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        confirm_password: confirmPassword,
      }),
    });
    if (data.tokens) setTokens(data.tokens.access, data.tokens.refresh);
    return { user: adaptUser(data.user), tokens: data.tokens };
  },

  login: async ({ email, password }) => {
    const data = await request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.tokens) setTokens(data.tokens.access, data.tokens.refresh);
    return { user: adaptUser(data.user), tokens: data.tokens };
  },

  logout: async () => {
    try {
      await request('/auth/logout/', {
        method: 'POST',
        body: JSON.stringify({ refresh: getRefreshToken() }),
      });
    } finally {
      clearTokens();
    }
  },

  getProfile: async () => {
    const data = await request('/auth/profile/');
    return adaptUser(data);
  },

  updateProfile: async (profileData) => {
    const formData = new FormData();
    Object.entries(profileData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        formData.append(snakeKey, value);
      }
    });
    const data = await request('/auth/profile/', {
      method: 'PATCH',
      body: formData,
    });
    return adaptUser(data);
  },

  changePassword: async ({ currentPassword, newPassword, confirmPassword }) => {
    return request('/auth/change-password/', {
      method: 'POST',
      body: JSON.stringify({
        old_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }),
    });
  },

  forgotPassword: async (email) => {
    return request('/auth/forgot-password/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async ({ token, password, confirmPassword }) => {
    return request('/auth/reset-password/', {
      method: 'POST',
      body: JSON.stringify({
        token,
        new_password: password,
        confirm_password: confirmPassword,
      }),
    });
  },

  verifyEmail: async (token) => {
    return request(`/auth/verify-email/${token}/`);
  },

  resendVerification: async (email) => {
    return request('/auth/resend-verification/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Addresses
  getAddresses: async () => {
    return request('/auth/addresses/');
  },

  createAddress: async (addressData) => {
    return request('/auth/addresses/', {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  },

  updateAddress: async (id, addressData) => {
    return request(`/auth/addresses/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(addressData),
    });
  },

  deleteAddress: async (id) => {
    return request(`/auth/addresses/${id}/`, { method: 'DELETE' });
  },

  setDefaultAddress: async (id) => {
    return request(`/auth/addresses/${id}/set-default/`, { method: 'POST' });
  },
};

// ─── Products API ─────────────────────────────────────────────────────────────

export const productsAPI = {
  getProducts: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.category) query.set('category', params.category);
    if (params.search) query.set('search', params.search);
    if (params.minPrice) query.set('min_price', params.minPrice);
    if (params.maxPrice) query.set('max_price', params.maxPrice);
    if (params.ordering) query.set('ordering', params.ordering);
    if (params.page) query.set('page', params.page);
    if (params.pageSize) query.set('page_size', params.pageSize);
    if (params.isOnSale) query.set('is_on_sale', 'true');
    if (params.isFeatured) query.set('is_featured', 'true');

    const data = await request(`/products/?${query}`);
    return {
      products: (data.results || data).map(adaptProduct),
      count: data.count || (data.results || data).length,
      next: data.next,
      previous: data.previous,
    };
  },

  getAll: async (params = {}) => productsAPI.getProducts(params), // Added alias for BottomHeader

  getProduct: async (slug) => {
    const data = await request(`/products/${slug}/`);
    return adaptProduct(data);
  },

  getById: async (id) => {
    const data = await request(`/products/${id}/`);
    return adaptProduct(data);
  },

  getByCategory: async (category) => {
    return productsAPI.getProducts({ category });
  },

  getFeatured: async () => {
    const data = await request('/products/featured/');
    return (data.results || data).map(adaptProduct);
  },

  getNewArrivals: async () => {
    const data = await request('/products/new-arrivals/');
    return (data.results || data).map(adaptProduct);
  },

  getSale: async () => {
    const data = await request('/products/sale/');
    return (data.results || data).map(adaptProduct);
  },

  getRelated: async (slug) => {
    const data = await request(`/products/${slug}/related/`);
    return (data.results || data).map(adaptProduct);
  },
};

// ─── Categories API ───────────────────────────────────────────────────────────

export const categoriesAPI = {
  getCategories: async () => {
    const data = await request('/categories/');
    return data.results || data;
  },

  getCategory: async (slug) => {
    return request(`/categories/${slug}/`);
  },
};

// ─── Cart API ─────────────────────────────────────────────────────────────────

export const cartAPI = {
  getCart: async () => {
    const data = await request('/cart/');
    return {
      id: data.id,
      items: (data.items || []).map(adaptCartItem),
      totalItems: data.total_items,
      subtotal: parseFloat(data.subtotal || 0),
    };
  },

  addToCart: async ({ productId, variantId, quantity = 1 }) => {
    const data = await request('/cart/add/', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        variant_id: variantId || null,
        quantity,
      }),
    });
    return {
      items: (data.items || []).map(adaptCartItem),
      totalItems: data.total_items,
      subtotal: parseFloat(data.subtotal || 0),
    };
  },

  updateCartItem: async (itemId, quantity) => {
    const data = await request(`/cart/items/${itemId}/`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    });
    return {
      items: (data.items || []).map(adaptCartItem),
      totalItems: data.total_items,
      subtotal: parseFloat(data.subtotal || 0),
    };
  },

  removeCartItem: async (itemId) => {
    return request(`/cart/items/${itemId}/remove/`, { method: 'DELETE' });
  },

  clearCart: async () => {
    return request('/cart/clear/', { method: 'DELETE' });
  },
};

// ─── Wishlist API ─────────────────────────────────────────────────────────────

export const wishlistAPI = {
  getWishlist: async () => {
    const data = await request('/wishlist/');
    return {
      items: (data.items || data.results || data).map((item) =>
        adaptProduct(item.product || item)
      ),
      count: data.count || (data.items || data).length,
    };
  },

  getWishlistIds: async () => {
    const data = await request('/wishlist/ids/');
    return data.product_ids || data;
  },

  toggleWishlist: async (productId) => {
    return request(`/wishlist/toggle/${productId}/`, { method: 'POST' });
  },
};

// ─── Orders API ───────────────────────────────────────────────────────────────

export const ordersAPI = {
  getOrders: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.set('page', params.page);
    if (params.status) query.set('status', params.status);
    const data = await request(`/orders/?${query}`);
    return {
      orders: (data.results || data).map(adaptOrder),
      count: data.count || (data.results || data).length,
    };
  },

  getOrder: async (id) => {
    const data = await request(`/orders/${id}/`);
    return adaptOrder(data);
  },

  createOrder: async (orderData) => {
    const data = await request('/orders/create/', {
      method: 'POST',
      body: JSON.stringify({
        address_id: orderData.addressId,
        coupon_code: orderData.couponCode,
        notes: orderData.notes,
      }),
    });
    return adaptOrder(data.order || data);
  },

  create: async (data) => ordersAPI.createOrder(data), // Added alias for Checkout

  cancelOrder: async (id) => {
    return request(`/orders/${id}/cancel/`, { method: 'POST' });
  },
};

// ─── Reviews API ──────────────────────────────────────────────────────────────

export const reviewsAPI = {
  getProductReviews: async (slug, params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.set('page', params.page);
    const data = await request(`/reviews/products/${slug}/?${query}`);
    return {
      reviews: data.results || data,
      count: data.count || (data.results || data).length,
    };
  },

  createReview: async ({ productId, rating, title, body }) => {
    return request('/reviews/create/', {
      method: 'POST',
      body: JSON.stringify({
        product: productId,
        rating,
        title,
        body,
      }),
    });
  },

  markHelpful: async (reviewId) => {
    return request(`/reviews/${reviewId}/helpful/`, { method: 'POST' });
  },
};

// ─── Coupons API ──────────────────────────────────────────────────────────────

export const couponsAPI = {
  validateCoupon: async (code, orderTotal) => {
    const data = await request('/coupons/validate/', {
      method: 'POST',
      body: JSON.stringify({ code, order_total: orderTotal }),
    });
    return {
      valid: data.valid,
      discount: data.discount_amount,
      discountType: data.discount_type,
      couponId: data.coupon_id,
      code: data.code,
    };
  },
};

// ─── Notifications API ────────────────────────────────────────────────────────

export const notificationsAPI = {
  getNotifications: async () => {
    const data = await request('/notifications/');
    return {
      notifications: data.results || data,
      unreadCount: data.unread_count || 0,
    };
  },

  markRead: async (id) => {
    return request(`/notifications/${id}/read/`, { method: 'POST' });
  },

  markAllRead: async () => {
    return request('/notifications/mark-all-read/', { method: 'POST' });
  },
};

// ─── Contact API ──────────────────────────────────────────────────────────────

export const contactAPI = {
  sendMessage: async ({ name, email, subject, message }) => {
    return request('/contact/', {
      method: 'POST',
      body: JSON.stringify({ name, email, subject, message }),
    });
  },
};

// ─── Payments API ─────────────────────────────────────────────────────────────

export const paymentsAPI = {
  createPaymentIntent: async (orderId) => {
    return request('/payments/create-intent/', {
      method: 'POST',
      body: JSON.stringify({ order_id: orderId }),
    });
  },

  confirmPayment: async (paymentIntentId) => {
    return request('/payments/confirm/', {
      method: 'POST',
      body: JSON.stringify({ payment_intent_id: paymentIntentId }),
    });
  },
};

// ─── Admin API ────────────────────────────────────────────────────────────────

export const adminAPI = {
  getDashboardStats: async () => {
    return request('/admin/dashboard/');
  },

  // Products
  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params);
    const data = await request(`/products/admin/products/?${query}`);
    return {
      products: (data.results || data).map(adaptProduct),
      count: data.count || (data.results || data).length,
    };
  },

  createProduct: async (productData) => {
    const data = await request('/products/admin/products/', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
    return adaptProduct(data);
  },

  updateProduct: async (id, productData) => {
    const data = await request(`/products/admin/products/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(productData),
    });
    return adaptProduct(data);
  },

  deleteProduct: async (id) => {
    return request(`/products/admin/products/${id}/`, { method: 'DELETE' });
  },

  // Orders
  getOrders: async (params = {}) => {
    const query = new URLSearchParams(params);
    const data = await request(`/orders/admin/all/?${query}`);
    return {
      orders: (data.results || data).map(adaptOrder),
      count: data.count || (data.results || data).length,
    };
  },

  getOrder: async (id) => {
    const data = await request(`/orders/admin/${id}/`);
    return adaptOrder(data);
  },

  updateOrderStatus: async (id, status, note = '') => {
    return request(`/orders/admin/${id}/status/`, {
      method: 'POST',
      body: JSON.stringify({ status, note }),
    });
  },

  // Users
  getUsers: async (params = {}) => {
    const query = new URLSearchParams(params);
    const data = await request(`/auth/admin/users/?${query}`);
    return {
      users: (data.results || data).map(adaptUser),
      count: data.count || (data.results || data).length,
    };
  },

  // Reviews
  getReviews: async (params = {}) => {
    const query = new URLSearchParams(params);
    const data = await request(`/reviews/admin/all/?${query}`);
    return {
      reviews: data.results || data,
      count: data.count || (data.results || data).length,
    };
  },

  approveReview: async (id) => {
    return request(`/reviews/admin/${id}/approve/`, { method: 'POST' });
  },

  // Coupons
  getCoupons: async (params = {}) => {
    const query = new URLSearchParams(params);
    const data = await request(`/coupons/admin/?${query}`);
    return {
      coupons: data.results || data,
      count: data.count || (data.results || data).length,
    };
  },

  createCoupon: async (couponData) => {
    return request('/coupons/admin/', {
      method: 'POST',
      body: JSON.stringify(couponData),
    });
  },

  updateCoupon: async (id, couponData) => {
    return request(`/coupons/admin/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(couponData),
    });
  },

  deleteCoupon: async (id) => {
    return request(`/coupons/admin/${id}/`, { method: 'DELETE' });
  },

  // Notifications (admin view)
  getContacts: async (params = {}) => {
    const query = new URLSearchParams(params);
    const data = await request(`/contact/admin/?${query}`);
    return {
      contacts: data.results || data,
      count: data.count || (data.results || data).length,
    };
  },
};

export default {
  auth: authAPI,
  products: productsAPI,
  categories: categoriesAPI,
  cart: cartAPI,
  wishlist: wishlistAPI,
  orders: ordersAPI,
  reviews: reviewsAPI,
  coupons: couponsAPI,
  notifications: notificationsAPI,
  contact: contactAPI,
  payments: paymentsAPI,
  admin: adminAPI,
};