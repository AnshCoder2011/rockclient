# 🛍️ RockClient Store

🚀 **RockClient Store** is a **Minecraft Client store** where users can purchase in-game cosmetics like **Hats, Capes, Wings, Bandanas, RCoins, and Skins**. The platform integrates **Microsoft OAuth authentication**, a shopping cart system, and a **Tebex Payment Gateway** for seamless transactions. The **Admin Panel** allows product, order, and user management.

---

## 🌟 Features

### 🎮 **User Features**
- 🛒 **Cart System** – Add/remove items, view total price dynamically.
- 🔑 **Microsoft OAuth Login** – Secure authentication using Mojang accounts.
- 💳 **Payment Gateway Integration** – Seamless payments using Tebex.
- 🎭 **Cosmetics Purchase & Auto-Delivery** – Items are delivered instantly after payment.
- 📂 **User Dashboard** – View order history and purchased items.

### 🛠 **Admin Features**
- 🏗 **Product Management** – Add, edit, and delete items.
- 📦 **Order Management** – View orders, update statuses.
- 👥 **User Management** – View users, ban/unban if necessary.
- 📊 **Analytics Dashboard** – Sales tracking and insights.

---

## 🏗 Tech Stack

| **Technology**  | **Usage** |
|-----------------|-----------|
| **React.js**    | Frontend UI development |
| **Tailwind CSS** | Styling & responsiveness |
| **Node.js**     | Backend server |
| **Express.js**  | API development |
| **MongoDB**     | Database to store users, products, and orders |
| **Firebase (initial auth, transitioning to MEN)** | Temporary authentication |
| **Tebex**       | Payment processing & order handling |

---

## 📂 Folder Structure

```
📦 rockclient-store
 ┣ 📂 frontend       # Frontend (React.js)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📂 utils
 ┃ ┃ ┣ 📜 App.js
 ┃ ┃ ┗ 📜 index.js
 ┣ 📂 backend       # Backend (Node.js, Express, MongoDB)
 ┃ ┣ 📂 models     # Database Models
 ┃ ┣ 📂 routes     # API Routes
 ┃ ┣ 📂 controllers
 ┃ ┣ 📜 server.js
 ┃ ┗ 📜 config.js
 ┣ 📜 .gitignore
 ┣ 📜 README.md
 ┗ 📜 package.json
```

---

## 🚀 Getting Started

### 🔧 Prerequisites
- **Node.js & npm** installed
- **MongoDB** database set up
- **Tebex API Key** for payment processing

### 🏗 Installation

#### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/AnshCoder2011/rockclient.git
cd rockclient-store
```

#### **2️⃣ Install Dependencies**
```bash
npm install
cd frontend && npm install  # Install frontend dependencies
```

#### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and add:
```
MONGO_URI=your_mongodb_connection_string
TEBEX_API_KEY=your_tebex_api_key
JWT_SECRET=your_jwt_secret
```

#### **4️⃣ Run the Project**
```bash
# Start Backend
npx nodemon

# Start Frontend
cd frontend && npm run dev
```

---

## 📸 Screenshots

### 🏠 **Landing Page**
![Landing Page](/coverImages/image.png)

### 🛍 **Store Page**
![Store Page](/coverImages/image%20copy.png)

### 🛒 **Cart Page**
![Cart Page](/coverImages/image%20copy%202.png)

### 📊 **Admin Dashboard**
![Admin Dashboard](/coverImages/image%20copy%203.png)

---

## 📜 API Endpoints

### **Authentication**
- `POST /auth/login` – Login using Microsoft OAuth
- `POST /auth/logout` – Logout user

### **User Management**
- `GET /users/me` – Fetch logged-in user details
- `GET /users/cart` – Fetch user’s cart items
- `POST /users/cart` – Add item to cart
- `DELETE /users/cart/:id` – Remove item from cart

### **Product Management (Admin)**
- `POST /api/products` – Add a new product
- `PUT /api/products/:id` – Edit product details
- `DELETE /api/products/:id` – Remove a product
- `GET /api/products` – Fetch all products

### **Orders**
- `GET /api/admin/dashboard` – Fetch all orders (Admin)

---

## 🛠 Future Improvements
- ✅ Automated **item delivery to Minecraft accounts**
- ✅ Complete **Admin Panel** for better management
- ✅ More **payment options** and **discount coupons**
- ✅ Improved **search and filtering** in store
- ✅ Wishlist functionality

---

## 💖 Credits
Developed by **AnshCoder** 🚀 with **React, Node.js & MongoDB**.

**© 2025 RockClient. All Rights Reserved.**

