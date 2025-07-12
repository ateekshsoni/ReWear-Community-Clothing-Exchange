# 🔄 reWear - Community Clothing Exchange Backend

A complete Node.js + Express.js backend for a fashion rental and exchange platform built with MongoDB, featuring authentication, product management, and rental functionality.

## 🚀 Features

### 🔐 Authentication System
- **User Registration** - Create account with email verification
- **User Login** - JWT-based authentication
- **Profile Management** - Update user information
- **Password Management** - Secure password change functionality
- **Account Security** - Login attempt limiting and account locking

### 📦 Product Management
- **Product Listing** - Create detailed product listings with images
- **Product Search** - Filter by category, location, price, size, condition
- **Product Categories** - Dresses, tops, bottoms, outerwear, footwear, accessories, etc.
- **Rental System** - Rent products for 1-30 days
- **Owner Management** - Users can manage their own products

### 🛡️ Security & Best Practices
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Input Validation** - Joi schema validation
- **Rate Limiting** - Prevent API abuse
- **CORS Protection** - Cross-origin resource sharing
- **Security Headers** - Helmet.js integration
- **Error Handling** - Centralized error management

## 📁 Project Structure

```
Backend/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── auth.controller.js
│   │   └── productController.js
│   ├── models/              # Database schemas
│   │   ├── User.js
│   │   └── Product.js
│   ├── routes/              # API routes
│   │   ├── auth.routes.js
│   │   └── productRoutes.js
│   ├── middleware/          # Custom middleware
│   │   ├── auth.middleware.js
│   │   ├── errorMiddleware.js
│   │   └── validation.middleware.js
│   ├── services/            # Business logic
│   │   └── userService.js
│   ├── utils/               # Utility functions
│   │   ├── generateToken.js
│   │   └── logger.js
│   ├── config/              # Configuration
│   │   ├── database.js
│   │   └── index.js
│   └── database/            # Database connection
│       └── connection.js
├── app.js                   # Express app setup
├── server.js               # Server startup
├── package.json            # Dependencies
├── .env                    # Environment variables
└── README.md              # Documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone & Install Dependencies

```bash
git clone <your-repo-url>
cd ReWear-Community-Clothing-Exchange/Backend
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/rewear
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_2024
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000,http://localhost:5173
```

### 3. Database Setup

Make sure MongoDB is running:

```bash
# For local MongoDB
brew services start mongodb/brew/mongodb-community

# Or for MongoDB Atlas, update MONGO_URI in .env
```

### 4. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### 🔐 Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

#### Get User Profile (Protected)
```http
GET /api/auth/profile
Authorization: Bearer <your-jwt-token>
```

#### Update Profile (Protected)
```http
PUT /api/auth/profile
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "John Updated",
  "bio": "Fashion enthusiast and sustainable clothing advocate"
}
```

#### Change Password (Protected)
```http
POST /api/auth/change-password
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "currentPassword": "SecurePassword123",
  "newPassword": "NewSecurePassword456"
}
```

### 📦 Product Endpoints

#### Get All Products
```http
GET /api/products?page=1&limit=10&category=dresses&city=New%20York
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Create Product (Protected)
```http
POST /api/products
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Elegant Evening Dress",
  "description": "Beautiful black evening dress perfect for special occasions",
  "category": "dresses",
  "brand": "Designer Brand",
  "size": "M",
  "color": "Black",
  "pricePerDay": 25,
  "condition": "excellent",
  "location": {
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "images": ["https://example.com/image1.jpg"],
  "tags": ["formal", "evening", "elegant"]
}
```

#### Update Product (Protected - Owner Only)
```http
PUT /api/products/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "pricePerDay": 30,
  "description": "Updated description"
}
```

#### Delete Product (Protected - Owner Only)
```http
DELETE /api/products/:id
Authorization: Bearer <your-jwt-token>
```

#### Get My Products (Protected)
```http
GET /api/products/user/my-products?status=active
Authorization: Bearer <your-jwt-token>
```

#### Rent Product (Protected)
```http
POST /api/products/:id/rent
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "days": 3
}
```

#### Return Product (Protected)
```http
POST /api/products/:id/return
Authorization: Bearer <your-jwt-token>
```

#### Get Categories
```http
GET /api/products/categories
```

## 📊 Response Format

All API responses follow this consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🗄️ Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (default: "user"),
  isActive: Boolean (default: true),
  isEmailVerified: Boolean (default: false),
  avatar: String,
  bio: String,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  title: String,
  description: String,
  category: String (enum),
  brand: String,
  size: String (enum),
  color: String,
  pricePerDay: Number,
  condition: String (enum),
  isAvailable: Boolean (default: true),
  isActive: Boolean (default: true),
  images: [String],
  owner: ObjectId (ref: User),
  location: {
    city: String,
    state: String,
    zipCode: String
  },
  currentRenter: ObjectId (ref: User),
  rentedUntil: Date,
  totalRentals: Number (default: 0),
  rating: Number (default: 0),
  reviewCount: Number (default: 0),
  tags: [String],
  specifications: {
    material: String,
    careInstructions: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🛡️ Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Tokens**: Secure authentication with configurable expiration
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Joi schemas for all inputs
- **CORS Protection**: Configurable allowed origins
- **Security Headers**: Helmet.js for security headers
- **Account Locking**: After failed login attempts
- **Environment Variables**: Sensitive data protection

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rewear
JWT_SECRET=super_secure_random_string_for_production
CLIENT_URL=https://your-frontend-domain.com
```

### Production Checklist
- [ ] Update JWT_SECRET to a secure random string
- [ ] Configure MongoDB Atlas or production database
- [ ] Set up proper CORS origins
- [ ] Configure environment variables
- [ ] Set up logging and monitoring
- [ ] Configure reverse proxy (nginx)
- [ ] Set up SSL/TLS certificates

## 🧪 Testing

Run the health check to verify everything is working:

```bash
curl http://localhost:5000/health
```

## 🔧 Development Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Health check
npm run health
```

## 🎯 Future Enhancements

- [ ] **Reviews & Ratings** - Product review system
- [ ] **Favorites** - User wishlist functionality
- [ ] **Chat System** - Messaging between users
- [ ] **Payment Integration** - Stripe/PayPal integration
- [ ] **Image Upload** - Cloudinary integration
- [ ] **Email Notifications** - Rental confirmations, reminders
- [ ] **Search Optimization** - Elasticsearch integration
- [ ] **Analytics** - User behavior tracking
- [ ] **Mobile API** - Push notifications
- [ ] **Admin Panel** - Management dashboard

## 💡 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation above
- Review the error messages in the console

---

**Built with ❤️ for sustainable fashion and community sharing**
