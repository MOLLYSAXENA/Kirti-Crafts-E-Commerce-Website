const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "upload/images");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("📁 Created upload/images directory");
}

// Import Product Model
const Product = require("./Models/Product");

// Middleware - CORS must be before routes
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());

// Serve uploaded images as static files
app.use('/upload/images', express.static(path.join(__dirname, 'upload/images')));

// MongoDB Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("🍃 MongoDB Connected Successfully!"))
.catch((err) => console.error("❌ Database Error:", err));


// =====

// 🕵️‍♂️ Apne backend me yeh block dhoondhiye:
const storage = multer.diskStorage({
    destination: './upload/images', // 👈 Check kijiye ki kya exact yahi folder ka naam hai?
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage });
// ============================================================================
// 📸 IMAGE UPLOAD API
// ============================================================================
app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No image file uploaded' });
    }

    // Return relative URL so it works through Vite proxy
    const imageUrl = `/upload/images/${req.file.filename}`;
    console.log('Image uploaded:', imageUrl);
    return res.json({ success: 1, image_url: imageUrl });
});

// ============================================================================
// 🛍️ PRODUCT API ROUTES
// ============================================================================

// 1. ADD PRODUCT API (POST)
app.post("/addproduct", async (req, res) => {
    try {
        console.log("AddProduct request body:", req.body);

        const { name, description, image, category, new_price, old_price } = req.body;
        if (!name || !description || !image || !category || !new_price || !old_price) {
            return res.status(400).json({ success: false, message: "Missing required product fields" });
        }

        // Use max existing id + 1 to avoid duplicates after deletions
        const lastProduct = await Product.findOne().sort({ id: -1 });
        const nextId = lastProduct ? lastProduct.id + 1 : 1;
        const product = new Product({
            id: nextId,
            name,
            description,
            image,
            category,
            new_price: Number(new_price),
            old_price: Number(old_price),
        });

        console.log("Saving Product:", product);
        await product.save();

        res.json({
            success: true,
            name,
            product,
        });
    } catch (error) {
        console.error("Add Product Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add product",
            error: error && (error.message || error.toString()),
        });
    }
});

// 2. REMOVE PRODUCT API (POST)
app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed Product ID:", req.body.id);
    res.json({
        success: true,
        name: req.body.name
    });
});

// 3. GET ALL PRODUCTS API (GET) - Yeh frontend me grid dikhane ke kaam aayega
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
});


// Basic Home Route
app.get("/", (req, res) => {
    res.send("🌸 Kirti Crafts Backend Server is Live with APIs! 🌸");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});