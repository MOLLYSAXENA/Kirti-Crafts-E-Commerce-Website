require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const Product = require('./Models/Product');
    
    const products = await Product.find({});
    console.log('Found products:', products.length);
    
    for (const product of products) {
        if (product.image.startsWith('http://localhost:4000')) {
            product.image = product.image.replace('http://localhost:4000', '');
            await product.save();
            console.log('Fixed:', product.name, '→', product.image);
        }
    }
    
    console.log('Done!');
    mongoose.disconnect();
}).catch(e => {
    console.error('Error:', e.message);
    process.exit(1);
});
