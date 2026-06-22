# 🛍️ Kirti Crafts - Full-Stack E-Commerce Website

Kirti Crafts is a full-stack e-commerce website where local artisans can show and sell their handmade products (like crafts and toys).
It is built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.

---

## 🎯 The Main Problem & Our MVP Solution

### The Problem:
Most e-commerce websites are very heavy and complicated. They force users to login right away and save big image files directly in the cloud database. For small artisans or new projects, this makes the website slow, expensive, and difficult to test quickly.

### Our MVP (Minimum Viable Product) Solution:
To solve this, we created a lightweight **MVP** (a simple, working prototype) that focuses only on the most important features first:
1. **Easy Product Management:** Artisans can directly add or remove products using a simple form dashboard without any complicated login walls.
2. **Smart Image Handling:** Instead of saving heavy images inside the database, our backend server saves the raw images in a separate folder and only keeps small link pointers in the MongoDB Atlas cloud database. This keeps our website super fast!
3. **No Broken Images:** We added special code in React so that images always load smoothly without showing any broken links on the website.

---

## 🚀 Future Roadmap (Upcoming Features)

Since this is an MVP, we are planning to add many more awesome features very soon:
* **Proper User Authentication:** Adding a secure Login and Sign-Up system (using JWT) for both customers and admins.
* **Detailed Product Descriptions:** Giving options to add size, materials used, and detailed descriptions for every craft item.
* **Working Cart & Checkout:** A smooth shopping cart system that remembers user choices.
* **Payment Gateway:** Integrating secure payment options (like UPI or Cards) for real purchases.

---

## 🛠️ Tech Stack (Tools Used)

* **Frontend:** React.js, Vite, React Context API, CSS3
* **Backend:** Node.js, Express.js, Multer (For file uploads)
* **Database:** MongoDB Atlas (Cloud Database)
* **Version Control:** Git & GitHub

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
