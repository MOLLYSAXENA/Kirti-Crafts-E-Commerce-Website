# 🛍️ Kirti Crafts - Full-Stack Artisan E-Commerce Platform

Kirti Crafts is a dynamic, full-stack e-commerce web application built using the 
**MERN stack (MongoDB, Express.js, React, Node.js)**
 The platform is specifically designed for local artisans and creators to list and sell authentic handmade products like toys, crafts, and apparel.

This project transitions from a static prototype to a **fully dynamic, production-ready architecture**, focusing on clean data isolation, robust image streaming from a backend server, and scalable database management.

---

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