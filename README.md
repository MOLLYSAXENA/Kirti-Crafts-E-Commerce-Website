# 🛍️ Kirti Crafts - Full-Stack Artisan E-Commerce Platform

Kirti Crafts is a dynamic, full-stack e-commerce web application built using the 
**MERN stack (MongoDB, Express.js, React, Node.js)**
 The platform is specifically designed for local artisans and creators to list and sell authentic handmade products like toys, crafts, and apparel.

This project transitions from a static prototype to a **fully dynamic, production-ready architecture**, focusing on clean data isolation, robust image streaming from a backend server, and scalable database management.

---
## 🎯 The Core Problem & Solution

### The Problem:
Traditional e-commerce templates rely heavily on rigid user session walls (mandatory logins) and heavy database structures to upload and stream dynamic images. For small-scale local artisans or early-stage platform testing, setting up complex authentication layers and storing heavy image binaries directly in cloud databases causes high latency, slows down the development cycle, and creates an unnecessary barrier to product listing.

### The Solution:
This project solves this by decoupling the asset management layer from the database state:
1. **Bypassing Heavy Session Gates:** Allowed instant product listing via a direct form dashboard without forcing heavy authentication blockers at the initial scale.
2. **Optimized Image Streaming Pipeline:** Implemented an independent file storage framework. Instead of bloating MongoDB Atlas with heavy image strings, raw file binaries are handled via an express-multer engine on a storage server, keeping the cloud database lightweight with simple reference pointers.
3. **Frontend Fallback Engine:** Built custom UI logic within React to instantly resolve image path discrepancies (supporting standard formats like `.jpg`, `.png`), guaranteeing zero broken asset templates on the frontend interface even when backend mock-ups shift dynamically.

   ------

## 🚀 Key Features

* **Dynamic Admin Dashboard:** Enables real-time product management (Add/Remove products) that syncs instantly with the cloud database.
* **Robust Image Streaming Pipeline:** Implements a professional backend file storage system where images are handled securely via local/cloud storage, separating raw file binaries from lightweight database references.
* **Smart Image Fallback Handler:** A custom frontend error-resilient logic that automatically resolves image path inconsistencies (supporting universal `.jpg`/`.png` formats) to guarantee zero broken images on UI.
* **Category-Based Isolation:** Dynamic routing and rendering for product catalogs (e.g., Toys, Apparel) using React Context API.
* **Clean Cloud Infrastructure:** Powered by MongoDB Atlas for secure, cloud-hosted document management.
* **Lightweight Client Architecture:** Operates with a seamless client-side state using local mock components, completely independent of heavy session blockers.

---

## 🛠️ Tech Stack

**Frontend:** React.js, Vite, React Context API, CSS3
**Backend:** Node.js, Express.js, Multer (File Handling)
**Database:** MongoDB Atlas (Cloud)
**Tools & Version Control:** Git, GitHub, Postman / MongoDB Compass

---

## 📁 Project Architecture

```text
ecommerce/
├── backend/
│   ├── upload/images/    # Backend secure storage for product assets
│   ├── index.js          # Express server configurations & REST APIs
│   └── package.json
└── frontend/
    ├── public/           # Static asset directory
    ├── src/
    │   ├── Context/      # Global state management (ShopContext.jsx)
    │   ├── pages/        # Dynamic category views (ShopCategory.jsx)
    │   └── App.jsx       # Root routing component
