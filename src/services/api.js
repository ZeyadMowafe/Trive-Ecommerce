// API Service - Centralized data fetching
// All endpoints are mocked and ready to be replaced with real backend URLs

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Generic fetch wrapper with error handling
const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Products API
export const productsAPI = {
  getAll: async (params = {}) => {
    // Mock implementation - replace with: return apiFetch('/products', { method: 'GET' });
    return mockProducts(params);
  },
  
  getById: async (id) => {
    // Mock implementation - replace with: return apiFetch(`/products/${id}`);
    return mockProductById(id);
  },
  
  getByCategory: async (category) => {
    // Mock implementation - replace with: return apiFetch(`/products/category/${category}`);
    return mockProductsByCategory(category);
  },
  
  search: async (query) => {
    // Mock implementation - replace with: return apiFetch(`/products/search?q=${query}`);
    return mockProductSearch(query);
  }
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    // Mock implementation - replace with: return apiFetch('/categories');
    return mockCategories();
  }
};

// Cart API
export const cartAPI = {
  add: async (productId, quantity, size, color) => {
    // Mock implementation - replace with: return apiFetch('/cart', { method: 'POST', body: JSON.stringify({ productId, quantity, size, color }) });
    return { success: true, message: 'Product added to cart' };
  },
  
  update: async (itemId, quantity) => {
    // Mock implementation - replace with: return apiFetch(`/cart/${itemId}`, { method: 'PUT', body: JSON.stringify({ quantity }) });
    return { success: true };
  },
  
  remove: async (itemId) => {
    // Mock implementation - replace with: return apiFetch(`/cart/${itemId}`, { method: 'DELETE' });
    return { success: true };
  }
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    // Mock implementation - replace with: return apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    return { success: true, token: 'mock-token', user: { email, name: 'User' } };
  },
  
  register: async (userData) => {
    // Mock implementation - replace with: return apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(userData) });
    return { success: true, token: 'mock-token', user: userData };
  },
  
  logout: async () => {
    // Mock implementation - replace with: return apiFetch('/auth/logout', { method: 'POST' });
    return { success: true };
  }
};

// Orders API
export const ordersAPI = {
  create: async (orderData) => {
    // Mock implementation - replace with: return apiFetch('/orders', { method: 'POST', body: JSON.stringify(orderData) });
    return { success: true, orderId: 'ORD-' + Date.now() };
  }
};

// Contact API
export const contactAPI = {
  submit: async (formData) => {
    // Mock implementation - replace with: return apiFetch('/contact', { method: 'POST', body: JSON.stringify(formData) });
    return { success: true, message: 'Message sent successfully' };
  }
};

// ============================================
// MOCK DATA - Remove when connecting to backend
// ============================================

const mockProducts = (params = {}) => {
  const allProducts = [
    {
      id: 1,
      name: 'Cashmere Oversized Coat',
      category: 'women',
      subcategory: 'outerwear',
      price: 899,
      images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'],
      description: 'Luxurious oversized cashmere coat with a modern silhouette. Perfect for elevating any winter outfit.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Camel', 'Black', 'Navy'],
      inStock: true,
      isNew: true,
      isBestSeller: true
    },
    {
      id: 2,
      name: 'Silk Slip Dress',
      category: 'women',
      subcategory: 'dresses',
      price: 349,
      images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800', 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800'],
      description: 'Elegant silk slip dress with delicate straps. Timeless piece for any wardrobe.',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Champagne', 'Black', 'Emerald'],
      inStock: true,
      isNew: true,
      isBestSeller: false
    },
    {
      id: 3,
      name: 'Tailored Blazer',
      category: 'women',
      subcategory: 'outerwear',
      price: 589,
      images: ['https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'],
      description: 'Impeccably tailored blazer with structured shoulders and a nipped waist.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Cream', 'Charcoal'],
      inStock: true,
      isNew: false,
      isBestSeller: true
    },
    {
      id: 4,
      name: 'Leather Ankle Boots',
      category: 'accessories',
      subcategory: 'shoes',
      price: 429,
      images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800', 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800'],
      description: 'Premium leather ankle boots with a modern square toe and comfortable heel.',
      sizes: ['36', '37', '38', '39', '40', '41'],
      colors: ['Black', 'Tan'],
      inStock: true,
      isNew: false,
      isBestSeller: true
    },
    {
      id: 5,
      name: 'Merino Wool Sweater',
      category: 'women',
      subcategory: 'knitwear',
      price: 279,
      images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800', 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800'],
      description: 'Soft merino wool sweater with a relaxed fit. Perfect for layering.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Ivory', 'Charcoal', 'Dusty Rose'],
      inStock: true,
      isNew: true,
      isBestSeller: false
    },
    {
      id: 6,
      name: 'High-Waist Trousers',
      category: 'women',
      subcategory: 'bottoms',
      price: 329,
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800', 'https://images.unsplash.com/photo-1624206112918-b140b5acc3ca?w=800'],
      description: 'Elegant high-waist trousers with a wide leg and tailored fit.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Beige'],
      inStock: true,
      isNew: false,
      isBestSeller: true
    },
    {
      id: 7,
      name: 'Structured Handbag',
      category: 'accessories',
      subcategory: 'bags',
      price: 699,
      images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800'],
      description: 'Timeless structured handbag in premium leather with gold hardware.',
      sizes: ['One Size'],
      colors: ['Black', 'Burgundy', 'Cognac'],
      inStock: true,
      isNew: true,
      isBestSeller: true
    },
    {
      id: 8,
      name: 'Linen Shirt Dress',
      category: 'women',
      subcategory: 'dresses',
      price: 269,
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800'],
      description: 'Breezy linen shirt dress with button-front and relaxed fit.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Sand', 'Sky Blue'],
      inStock: true,
      isNew: true,
      isBestSeller: false
    }
  ];
  
  let filtered = [...allProducts];
  
  if (params.category) {
    filtered = filtered.filter(p => p.category === params.category);
  }
  
  if (params.inStock !== undefined) {
    filtered = filtered.filter(p => p.inStock === params.inStock);
  }
  
  if (params.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= params.minPrice);
  }
  
  if (params.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= params.maxPrice);
  }
  
  if (params.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (params.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (params.sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  return { products: filtered, total: filtered.length };
};

const mockProductById = (id) => {
  const products = mockProducts().products;
  return products.find(p => p.id === parseInt(id));
};

const mockProductsByCategory = (category) => {
  return mockProducts({ category });
};

const mockProductSearch = (query) => {
  const products = mockProducts().products;
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );
  return { products: filtered, total: filtered.length };
};

const mockCategories = () => {
  return [
    {
      id: 1,
      name: 'Women',
      slug: 'women',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
      subcategories: ['Dresses', 'Outerwear', 'Knitwear', 'Bottoms']
    },
    {
      id: 2,
      name: 'Men',
      slug: 'men',
      image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800',
      subcategories: ['Shirts', 'Outerwear', 'Bottoms', 'Knitwear']
    },
    {
      id: 3,
      name: 'Accessories',
      slug: 'accessories',
      image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800',
      subcategories: ['Bags', 'Shoes', 'Jewelry', 'Scarves']
    },
    {
      id: 4,
      name: 'New Arrivals',
      slug: 'new',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800'
    }
  ];
};

export default {
  productsAPI,
  categoriesAPI,
  cartAPI,
  authAPI,
  ordersAPI,
  contactAPI
};