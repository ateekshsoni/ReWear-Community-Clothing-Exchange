#!/bin/bash

# 🧪 reWear Backend API Test Script
# Tests all the main endpoints to verify functionality

echo "🔄 reWear Backend API Testing"
echo "=============================="

# Server URL
BASE_URL="http://localhost:3001"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print test results
print_test() {
    echo -e "${BLUE}🧪 Testing: $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ SUCCESS: $1${NC}"
    echo ""
}

print_error() {
    echo -e "${RED}❌ ERROR: $1${NC}"
    echo ""
}

# Test 1: Health Check
print_test "Health Check"
HEALTH=$(curl -s "$BASE_URL/health")
if echo "$HEALTH" | grep -q '"status":"ok"'; then
    print_success "Server is healthy"
else
    print_error "Health check failed"
    exit 1
fi

# Test 2: Root Endpoint
print_test "Root Endpoint"
ROOT=$(curl -s "$BASE_URL/")
if echo "$ROOT" | grep -q '"success":true'; then
    print_success "Root endpoint working"
else
    print_error "Root endpoint failed"
fi

# Test 3: Get Categories
print_test "Product Categories"
CATEGORIES=$(curl -s "$BASE_URL/api/products/categories")
if echo "$CATEGORIES" | grep -q '"categories"'; then
    print_success "Categories endpoint working"
else
    print_error "Categories endpoint failed"
fi

# Test 4: User Registration
print_test "User Registration"
REGISTER=$(curl -s -X POST "$BASE_URL/api/auth/register" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Test User",
        "email": "test@example.com",
        "password": "TestPassword123"
    }')

if echo "$REGISTER" | grep -q '"success":true'; then
    TOKEN=$(echo "$REGISTER" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    print_success "User registration successful"
    echo "🔑 JWT Token: ${TOKEN:0:50}..."
else
    print_error "User registration failed"
fi

# Test 5: User Login
print_test "User Login"
LOGIN=$(curl -s -X POST "$BASE_URL/api/auth/login" \
    -H "Content-Type: application/json" \
    -d '{
        "email": "test@example.com",
        "password": "TestPassword123"
    }')

if echo "$LOGIN" | grep -q '"success":true'; then
    TOKEN=$(echo "$LOGIN" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    print_success "User login successful"
else
    print_error "User login failed"
fi

# Test 6: Get Profile (Protected Route)
if [ ! -z "$TOKEN" ]; then
    print_test "Get User Profile (Protected)"
    PROFILE=$(curl -s "$BASE_URL/api/auth/profile" \
        -H "Authorization: Bearer $TOKEN")
    
    if echo "$PROFILE" | grep -q '"success":true'; then
        print_success "Profile retrieval successful"
    else
        print_error "Profile retrieval failed"
    fi
fi

# Test 7: Create Product (Protected Route)
if [ ! -z "$TOKEN" ]; then
    print_test "Create Product (Protected)"
    PRODUCT=$(curl -s -X POST "$BASE_URL/api/products" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $TOKEN" \
        -d '{
            "title": "Test Fashion Item",
            "description": "A beautiful test item for the reWear platform",
            "category": "dresses",
            "brand": "Test Brand",
            "size": "M",
            "color": "Blue",
            "pricePerDay": 15,
            "condition": "excellent",
            "location": {
                "city": "San Francisco",
                "state": "CA",
                "zipCode": "94105"
            },
            "tags": ["test", "demo"]
        }')
    
    if echo "$PRODUCT" | grep -q '"success":true'; then
        PRODUCT_ID=$(echo "$PRODUCT" | grep -o '"_id":"[^"]*' | cut -d'"' -f4)
        print_success "Product creation successful"
        echo "📦 Product ID: $PRODUCT_ID"
    else
        print_error "Product creation failed"
    fi
fi

# Test 8: Get All Products
print_test "Get All Products"
PRODUCTS=$(curl -s "$BASE_URL/api/products")
if echo "$PRODUCTS" | grep -q '"products"'; then
    PRODUCT_COUNT=$(echo "$PRODUCTS" | grep -o '"total":[0-9]*' | cut -d':' -f2)
    print_success "Products retrieval successful - Found $PRODUCT_COUNT products"
else
    print_error "Products retrieval failed"
fi

# Test 9: Get Single Product
if [ ! -z "$PRODUCT_ID" ]; then
    print_test "Get Single Product"
    SINGLE_PRODUCT=$(curl -s "$BASE_URL/api/products/$PRODUCT_ID")
    
    if echo "$SINGLE_PRODUCT" | grep -q '"success":true'; then
        print_success "Single product retrieval successful"
    else
        print_error "Single product retrieval failed"
    fi
fi

# Test 10: Get My Products (Protected Route)
if [ ! -z "$TOKEN" ]; then
    print_test "Get My Products (Protected)"
    MY_PRODUCTS=$(curl -s "$BASE_URL/api/products/user/my-products" \
        -H "Authorization: Bearer $TOKEN")
    
    if echo "$MY_PRODUCTS" | grep -q '"success":true'; then
        print_success "My products retrieval successful"
    else
        print_error "My products retrieval failed"
    fi
fi

echo "🎉 Testing Complete!"
echo ""
echo "📋 Available Endpoints:"
echo "• GET  $BASE_URL/health - Health check"
echo "• GET  $BASE_URL/ - Welcome message"
echo "• POST $BASE_URL/api/auth/register - User registration"
echo "• POST $BASE_URL/api/auth/login - User login"
echo "• GET  $BASE_URL/api/auth/profile - User profile (protected)"
echo "• PUT  $BASE_URL/api/auth/profile - Update profile (protected)"
echo "• POST $BASE_URL/api/auth/change-password - Change password (protected)"
echo "• GET  $BASE_URL/api/products - Get all products"
echo "• POST $BASE_URL/api/products - Create product (protected)"
echo "• GET  $BASE_URL/api/products/:id - Get single product"
echo "• PUT  $BASE_URL/api/products/:id - Update product (protected)"
echo "• DELETE $BASE_URL/api/products/:id - Delete product (protected)"
echo "• GET  $BASE_URL/api/products/categories - Get categories"
echo "• GET  $BASE_URL/api/products/user/my-products - Get user's products (protected)"
echo "• POST $BASE_URL/api/products/:id/rent - Rent product (protected)"
echo "• POST $BASE_URL/api/products/:id/return - Return product (protected)"
echo ""
echo "🔧 Server running at: $BASE_URL"
echo "📚 Check README.md for detailed API documentation"
