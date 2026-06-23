const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require('cloudinary').v2;
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

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

// Additional explicit CORS headers for all responses
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

// Serve uploaded images as static files
app.use('/upload/images', express.static(path.join(__dirname, 'upload/images')));

// MongoDB Database Connection - don't let this block the server
if (process.env.MONGO_URI && process.env.MONGO_URI !== 'YOUR_MONGODB_CONNECTION_STRING_HERE') {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🍃 MongoDB Connected Successfully!"))
    .catch((err) => {
        console.error("❌ Database Error:", err.message);
        // Server will continue running even if MongoDB fails
    });
} else {
    console.warn("⚠️ MONGO_URI not configured. Running without database.");
}


// =====

// 🕵️‍♂️ Apne backend me yeh block dhoondhiye:
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage });

// ============================================================================
// 📸 IMAGE UPLOAD API - CLOUDINARY
// ============================================================================
app.post('/upload', upload.single('product'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: 0, message: 'No image file uploaded' });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'kirti-crafts',
            resource_type: 'image'
        });

        // Delete local file after upload
        fs.unlinkSync(req.file.path);

        console.log('Image uploaded to Cloudinary:', result.secure_url);
        return res.json({ success: 1, image_url: result.secure_url });
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ success: 0, message: 'Image upload failed', error: error.message });
    }
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

// 3. GET ALL PRODUCTS API (GET)
app.get("/allproducts", async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All Products Fetched:", products.length);
        // JSON format mein explicit response bhejna better hota hai
        res.json(products); 
    } catch (error) {
        console.error("Fetch Products Error:", error);
        res.status(500).json({ success: false, message: "Error fetching data" });
    }
});


// Basic Home Route
app.get("/", (req, res) => {
    res.send("🌸 Kirti Crafts Backend Server is Live with APIs! 🌸");
});

// CORS test endpoint
app.get("/test-cors", (req, res) => {
    res.json({ 
        message: "CORS is working!", 
        timestamp: new Date().toISOString(),
        origin: req.headers.origin 
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});