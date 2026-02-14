# TRIVE - Premium Fashion E-Commerce Platform

A production-ready, full-featured fashion e-commerce frontend built with React, Bootstrap 5, and modern web technologies.

## 🎨 Design Features

- **Luxury Minimalist Aesthetic**: Premium feel with sophisticated typography (Cormorant Garamond + DM Sans)
- **Smooth Animations**: Framer Motion for elegant transitions and micro-interactions
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Brand Colors**: #010101 (primary dark) & #a0a0a0 (secondary gray)

## 🛠 Tech Stack

- **React 18** - Functional components with Hooks
- **React Router** - Client-side routing
- **Bootstrap 5** - Responsive grid system
- **Framer Motion** - Advanced animations
- **Swiper.js** - Touch-enabled sliders
- **Context API** - Global state management
- **Vite** - Fast build tool

## 📱 Features

### Core Features
- ✅ Hero slider with smooth transitions
- ✅ Dynamic product filtering and sorting
- ✅ Shopping cart with live updates
- ✅ Product quick-add functionality
- ✅ Image gallery with hover effects
- ✅ Responsive navigation with mobile menu
- ✅ Search functionality
- ✅ Category-based filtering
- ✅ Price range slider
- ✅ Quantity controls
- ✅ Size and color selection
- ✅ Similar products recommendations
- ✅ Newsletter subscription
- ✅ Contact form with validation
- ✅ Authentication UI (Login/Register)
- ✅ Checkout flow
- ✅ Scroll to top button
- ✅ Custom loading screen

### Pages
1. **Home** - Hero slider, new arrivals, categories, bestsellers
2. **Shop** - Products grid with filters and sorting
3. **Product Details** - Image gallery, size/color selection, similar products
4. **Cart** - Full cart management
5. **Checkout** - Delivery information form
6. **Contact** - Contact form with info
7. **Login/Register** - Authentication pages

### Components
- Header (Top promo bar + Bottom navigation)
- Footer (Newsletter, links, social, payment icons)
- Product Card (Hover effects, quick add)
- Cart Drawer (Slide-in from right)
- Filters (Stock, price range)
- Loader (Custom animated loading screen)
- Scroll To Top (Floating button)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Run development server**
```bash
npm run dev
```

3. **Build for production**
```bash
npm run build
```

4. **Preview production build**
```bash
npm run preview
```

## 🔌 API Integration

All API calls are centralized in `src/services/api.js`. The app currently uses mock data but is ready for backend integration.

### Replacing Mock APIs

Simply update the functions in `api.js`:

```javascript
// Example: Replace mock with real API
export const productsAPI = {
  getAll: async (params = {}) => {
    return apiFetch('/products', { method: 'GET' });
  },
  // ... other methods
};
```

### Available API Endpoints (Mock)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/categories` - Get all categories
- `POST /api/cart` - Add to cart
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/orders` - Create order
- `POST /api/contact` - Submit contact form

## 📁 Project Structure

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   ├── TopHeader.jsx
│   │   ├── BottomHeader.jsx
│   │   └── Header.css
│   ├── Footer/
│   ├── ProductCard/
│   ├── Filters/
│   ├── CartDrawer/
│   ├── Loader/
│   └── ScrollToTop/
├── pages/
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── ContactUs.jsx
│   └── Auth/
│       ├── Login.jsx
│       └── Register.jsx
├── context/
│   ├── CartContext.jsx
│   └── AuthContext.jsx
├── services/
│   └── api.js
├── styles/
│   └── main.css
├── App.jsx
└── main.jsx
```

## 🎯 Key Features Explained

### Cart System
- Persistent cart using localStorage
- Real-time cart count updates
- Quick add from product cards
- Full cart management (add, remove, update quantity)
- Cart drawer with smooth animations

### Filtering & Sorting
- Stock availability filter
- Price range slider
- Sort by: Newest, Price (Low to High), Price (High to Low), Name
- Real-time filtering with smooth transitions

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile
- Touch-optimized interactions
- Responsive product grids
- Mobile cart drawer

### Animations
- Page load staggered animations
- Hover effects on products
- Smooth transitions between routes
- Animated promo bar
- Custom loading screen

## 🎨 Customization

### Brand Colors
Update in `src/styles/main.css`:
```css
:root {
  --primary-dark: #010101;
  --secondary-gray: #a0a0a0;
  /* Add your colors */
}
```

### Typography
Fonts can be changed in `index.html` (Google Fonts) and `main.css`

## 🔒 Security Notes

- Authentication is UI-only (mock implementation)
- Replace with secure backend authentication
- Add HTTPS in production
- Implement proper JWT handling
- Add input sanitization

## 📦 Deployment

### Vercel / Netlify
```bash
npm run build
# Deploy the 'dist' folder
```

### Environment Variables
Create `.env` file:
```
VITE_API_URL=https://your-api-url.com
```

## 🐛 Known Limitations

- Mock API data (requires backend integration)
- Social login is UI-only
- No user authentication persistence beyond localStorage
- Image uploads not implemented
- No payment gateway integration

## 📝 Future Enhancements

- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Advanced search with autocomplete
- [ ] Order tracking
- [ ] User account dashboard
- [ ] Multiple payment methods
- [ ] Internationalization (i18n)
- [ ] Dark mode toggle
- [ ] SEO optimization with React Helmet

## 🤝 Contributing

This is a production-ready template. Feel free to customize and extend as needed.

## 📄 License

MIT License - free to use for commercial and personal projects.

## 🙏 Credits

- Design inspired by premium fashion brands
- Images from Unsplash (replace with your own)
- Icons from custom SVG implementations

---

**Built with ❤️ for modern e-commerce**