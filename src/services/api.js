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
      isNew: true,
      isBestSeller: true,
      inventory: [
        { size: 'XS', color: 'Camel', count: 5 },
        { size: 'XS', color: 'Black', count: 3 },
        { size: 'XS', color: 'Navy', count: 0 },
        { size: 'S', color: 'Camel', count: 8 },
        { size: 'S', color: 'Black', count: 6 },
        { size: 'S', color: 'Navy', count: 2 },
        { size: 'M', color: 'Camel', count: 10 },
        { size: 'M', color: 'Black', count: 7 },
        { size: 'M', color: 'Navy', count: 4 },
        { size: 'L', color: 'Camel', count: 6 },
        { size: 'L', color: 'Black', count: 5 },
        { size: 'L', color: 'Navy', count: 3 },
        { size: 'XL', color: 'Camel', count: 4 },
        { size: 'XL', color: 'Black', count: 2 },
        { size: 'XL', color: 'Navy', count: 1 }
      ]
    },
    {
      id: 2,
      name: 'Silk Slip Dress',
      category: 'women',
      subcategory: 'dresses',
      price: 349,
      images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800', 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800'],
      description: 'Elegant silk slip dress with delicate straps. Timeless piece for any wardrobe.',
      isNew: true,
      isBestSeller: false,
      inventory: [
        { size: 'XS', color: 'Champagne', count: 0 },
        { size: 'XS', color: 'Black', count: 0 },
        { size: 'XS', color: 'Emerald', count: 0 },
        { size: 'S', color: 'Champagne', count: 0 },
        { size: 'S', color: 'Black', count: 0 },
        { size: 'S', color: 'Emerald', count: 0 },
        { size: 'M', color: 'Champagne', count: 0 },
        { size: 'M', color: 'Black', count: 0 },
        { size: 'M', color: 'Emerald', count: 0 },
        { size: 'L', color: 'Champagne', count: 0 },
        { size: 'L', color: 'Black', count: 0 },
        { size: 'L', color: 'Emerald', count: 0 }
      ]
    },
    {
      id: 3,
      name: 'Tailored Blazer',
      category: 'women',
      subcategory: 'outerwear',
      price: 589,
      images: ['https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'],
      description: 'Impeccably tailored blazer with structured shoulders and a nipped waist.',
      isNew: false,
      isBestSeller: true,
      inventory: [
        { size: 'XS', color: 'Black', count: 2 },
        { size: 'XS', color: 'Cream', count: 1 },
        { size: 'XS', color: 'Charcoal', count: 3 },
        { size: 'S', color: 'Black', count: 5 },
        { size: 'S', color: 'Cream', count: 4 },
        { size: 'S', color: 'Charcoal', count: 6 },
        { size: 'M', color: 'Black', count: 8 },
        { size: 'M', color: 'Cream', count: 7 },
        { size: 'M', color: 'Charcoal', count: 9 },
        { size: 'L', color: 'Black', count: 4 },
        { size: 'L', color: 'Cream', count: 3 },
        { size: 'L', color: 'Charcoal', count: 5 },
        { size: 'XL', color: 'Black', count: 2 },
        { size: 'XL', color: 'Cream', count: 1 },
        { size: 'XL', color: 'Charcoal', count: 3 }
      ]
    },
    {
      id: 4,
      name: 'Leather Ankle Boots',
      category: 'accessories',
      subcategory: 'shoes',
      price: 429,
      images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800', 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800'],
      description: 'Premium leather ankle boots with a modern square toe and comfortable heel.',
      isNew: false,
      isBestSeller: true,
      inventory: [
        { size: '36', color: 'Black', count: 3 },
        { size: '36', color: 'Tan', count: 2 },
        { size: '37', color: 'Black', count: 5 },
        { size: '37', color: 'Tan', count: 4 },
        { size: '38', color: 'Black', count: 6 },
        { size: '38', color: 'Tan', count: 5 },
        { size: '39', color: 'Black', count: 7 },
        { size: '39', color: 'Tan', count: 6 },
        { size: '40', color: 'Black', count: 4 },
        { size: '40', color: 'Tan', count: 3 },
        { size: '41', color: 'Black', count: 2 },
        { size: '41', color: 'Tan', count: 1 }
      ]
    },
    {
      id: 5,
      name: 'Merino Wool Sweater',
      category: 'women',
      subcategory: 'knitwear',
      price: 279,
      images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800', 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800'],
      description: 'Soft merino wool sweater with a relaxed fit. Perfect for layering.',
      isNew: true,
      isBestSeller: false,
      inventory: [
        { size: 'XS', color: 'Ivory', count: 4 },
        { size: 'XS', color: 'Charcoal', count: 3 },
        { size: 'XS', color: 'Dusty Rose', count: 2 },
        { size: 'S', color: 'Ivory', count: 8 },
        { size: 'S', color: 'Charcoal', count: 7 },
        { size: 'S', color: 'Dusty Rose', count: 6 },
        { size: 'M', color: 'Ivory', count: 10 },
        { size: 'M', color: 'Charcoal', count: 9 },
        { size: 'M', color: 'Dusty Rose', count: 8 },
        { size: 'L', color: 'Ivory', count: 6 },
        { size: 'L', color: 'Charcoal', count: 5 },
        { size: 'L', color: 'Dusty Rose', count: 4 },
        { size: 'XL', color: 'Ivory', count: 3 },
        { size: 'XL', color: 'Charcoal', count: 2 },
        { size: 'XL', color: 'Dusty Rose', count: 1 }
      ]
    },
    {
      id: 6,
      name: 'High-Waist Trousers',
      category: 'women',
      subcategory: 'bottoms',
      price: 329,
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800', 'https://images.unsplash.com/photo-1624206112918-b140b5acc3ca?w=800'],
      description: 'Elegant high-waist trousers with a wide leg and tailored fit.',
      isNew: false,
      isBestSeller: true,
      inventory: [
        { size: 'XS', color: 'Black', count: 5 },
        { size: 'XS', color: 'Navy', count: 4 },
        { size: 'XS', color: 'Beige', count: 3 },
        { size: 'S', color: 'Black', count: 10 },
        { size: 'S', color: 'Navy', count: 8 },
        { size: 'S', color: 'Beige', count: 7 },
        { size: 'M', color: 'Black', count: 12 },
        { size: 'M', color: 'Navy', count: 11 },
        { size: 'M', color: 'Beige', count: 10 },
        { size: 'L', color: 'Black', count: 8 },
        { size: 'L', color: 'Navy', count: 7 },
        { size: 'L', color: 'Beige', count: 6 },
        { size: 'XL', color: 'Black', count: 5 },
        { size: 'XL', color: 'Navy', count: 4 },
        { size: 'XL', color: 'Beige', count: 3 }
      ]
    },
    {
      id: 7,
      name: 'Structured Handbag',
      category: 'accessories',
      subcategory: 'bags',
      price: 699,
      images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800'],
      description: 'Timeless structured handbag in premium leather with gold hardware.',
      isNew: true,
      isBestSeller: true,
      inventory: [
        { size: 'One Size', color: 'Black', count: 8 },
        { size: 'One Size', color: 'Burgundy', count: 5 },
        { size: 'One Size', color: 'Cognac', count: 6 }
      ]
    },
    {
      id: 8,
      name: 'Linen Shirt Dress',
      category: 'women',
      subcategory: 'dresses',
      price: 269,
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800'],
      description: 'Breezy linen shirt dress with button-front and relaxed fit.',
      isNew: true,
      isBestSeller: false,
      inventory: [
        { size: 'XS', color: 'White', count: 6 },
        { size: 'XS', color: 'Sand', count: 5 },
        { size: 'XS', color: 'Sky Blue', count: 4 },
        { size: 'S', color: 'White', count: 10 },
        { size: 'S', color: 'Sand', count: 9 },
        { size: 'S', color: 'Sky Blue', count: 8 },
        { size: 'M', color: 'White', count: 12 },
        { size: 'M', color: 'Sand', count: 11 },
        { size: 'M', color: 'Sky Blue', count: 10 },
        { size: 'L', color: 'White', count: 8 },
        { size: 'L', color: 'Sand', count: 7 },
        { size: 'L', color: 'Sky Blue', count: 6 },
        { size: 'XL', color: 'White', count: 5 },
        { size: 'XL', color: 'Sand', count: 4 },
        { size: 'XL', color: 'Sky Blue', count: 3 }
      ]
    },
    {
      id: 9,
      name: 'Classic Oxford Shirt',
      category: 'men',
      subcategory: 'shirts',
      price: 189,
      images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800'],
      description: 'Crisp cotton oxford shirt with button-down collar. A wardrobe essential.',
      isNew: false,
      isBestSeller: true,
      inventory: [
        { size: 'S', color: 'White', count: 8 },
        { size: 'S', color: 'Sky Blue', count: 7 },
        { size: 'S', color: 'Navy', count: 6 },
        { size: 'M', color: 'White', count: 12 },
        { size: 'M', color: 'Sky Blue', count: 11 },
        { size: 'M', color: 'Navy', count: 10 },
        { size: 'L', color: 'White', count: 10 },
        { size: 'L', color: 'Sky Blue', count: 9 },
        { size: 'L', color: 'Navy', count: 8 },
        { size: 'XL', color: 'White', count: 6 },
        { size: 'XL', color: 'Sky Blue', count: 5 },
        { size: 'XL', color: 'Navy', count: 4 }
      ]
    },
    {
      id: 10,
      name: 'Wool Overcoat',
      category: 'men',
      subcategory: 'outerwear',
      price: 799,
      images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800', 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800'],
      description: 'Classic wool overcoat with timeless silhouette. Perfect for cold weather.',
      isNew: true,
      isBestSeller: true,
      inventory: [
        { size: 'S', color: 'Charcoal', count: 4 },
        { size: 'S', color: 'Navy', count: 3 },
        { size: 'S', color: 'Camel', count: 2 },
        { size: 'M', color: 'Charcoal', count: 8 },
        { size: 'M', color: 'Navy', count: 7 },
        { size: 'M', color: 'Camel', count: 6 },
        { size: 'L', color: 'Charcoal', count: 6 },
        { size: 'L', color: 'Navy', count: 5 },
        { size: 'L', color: 'Camel', count: 4 },
        { size: 'XL', color: 'Charcoal', count: 3 },
        { size: 'XL', color: 'Navy', count: 2 },
        { size: 'XL', color: 'Camel', count: 1 }
      ]
    },
    {
      id: 11,
      name: 'Leather Belt',
      category: 'accessories',
      subcategory: 'accessories',
      price: 149,
      images: ['https://images.unsplash.com/photo-1624222247344-70e0f7d7b2b1?w=800', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'],
      description: 'Italian leather belt with polished buckle. Refined and durable.',
      isNew: false,
      isBestSeller: true,
      inventory: [
        { size: '85', color: 'Black', count: 10 },
        { size: '85', color: 'Cognac', count: 8 },
        { size: '90', color: 'Black', count: 12 },
        { size: '90', color: 'Cognac', count: 10 },
        { size: '95', color: 'Black', count: 15 },
        { size: '95', color: 'Cognac', count: 12 },
        { size: '100', color: 'Black', count: 10 },
        { size: '100', color: 'Cognac', count: 8 },
        { size: '105', color: 'Black', count: 6 },
        { size: '105', color: 'Cognac', count: 5 }
      ]
    },
    {
      id: 12,
      name: 'Chino Pants',
      category: 'men',
      subcategory: 'bottoms',
      price: 219,
      images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800'],
      description: 'Versatile chino pants with modern fit. Perfect for casual or smart-casual.',
      isNew: false,
      isBestSeller: false,
      inventory: [
        { size: '30', color: 'Khaki', count: 5 },
        { size: '30', color: 'Navy', count: 4 },
        { size: '30', color: 'Black', count: 3 },
        { size: '32', color: 'Khaki', count: 10 },
        { size: '32', color: 'Navy', count: 9 },
        { size: '32', color: 'Black', count: 8 },
        { size: '34', color: 'Khaki', count: 12 },
        { size: '34', color: 'Navy', count: 11 },
        { size: '34', color: 'Black', count: 10 },
        { size: '36', color: 'Khaki', count: 8 },
        { size: '36', color: 'Navy', count: 7 },
        { size: '36', color: 'Black', count: 6 },
        { size: '38', color: 'Khaki', count: 5 },
        { size: '38', color: 'Navy', count: 4 },
        { size: '38', color: 'Black', count: 3 }
      ]
    }
  ];
  
  // Add helper properties to each product
  const productsWithHelpers = allProducts.map(product => {
    const sizes = [...new Set(product.inventory.map(i => i.size))];
    const colors = [...new Set(product.inventory.map(i => i.color))];
    const totalCount = product.inventory.reduce((sum, item) => sum + item.count, 0);
    const inStock = totalCount > 0;
    
    return {
      ...product,
      sizes,
      colors,
      count: totalCount,
      inStock
    };
  });
  
  let filtered = [...productsWithHelpers];
  
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