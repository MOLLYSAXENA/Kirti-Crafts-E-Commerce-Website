import { useContext, useState } from 'react';
import Footer from '../components/Footer/Footer'; 
import PageOptions from '../components/PageOptions/PageOptions';
import { ShopContext } from './ShopContext';
import './vendor.css';

const Vendor = () => {
  const { refreshProducts } = useContext(ShopContext);

  const emptyForm = {
    name: "",
    category: "Clothes", 
    new_price: "",
    old_price: "",
    description: ""
  };

  const [productDetails, setProductDetails] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null); // { type: 'success'|'error', text: '' }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setProductDetails(emptyForm);
    setImage(null);
    setImagePreview(null);
  };

  const addProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      // Step 1: Upload image
      const formData = new FormData();
      formData.append('product', image);

      const uploadRes = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();

      if (!uploadData || uploadData.success !== 1) {
        setStatusMsg({ type: 'error', text: '❌ Image upload failed. Make sure the backend server is running.' });
        setLoading(false);
        return;
      }

      // Step 2: Add product with image URL
      const product = {
        ...productDetails,
        new_price: Number(productDetails.new_price),
        old_price: Number(productDetails.old_price),
        image: uploadData.image_url,
      };

      const addRes = await fetch('/addproduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const addData = await addRes.json();

      if (addData.success) {
        setStatusMsg({ type: 'success', text: `✅ "${product.name}" is now live in the ${product.category} collection!` });
        resetForm();
        if (refreshProducts) refreshProducts();
      } else {
        setStatusMsg({ type: 'error', text: `❌ Failed to add product: ${addData.message || 'Unknown error'}` });
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: '❌ Could not connect to backend. Is the server running on port 4000?' });
    }

    setLoading(false);
  };

  return (
    <div className="vendor-page-container">
      <PageOptions />
      <div className="vendor-header">
        <h1>ARTISAN DASHBOARD</h1>
        <p>List your handcrafted masterpieces on Kirti Crafts</p>
      </div>

      <div className="vendor-wrapper">

        {/* Status message banner */}
        {statusMsg && (
          <div className={`vendor-status-msg ${statusMsg.type}`}>
            {statusMsg.text}
          </div>
        )}

        <form onSubmit={addProductSubmit} className="vendor-form-box">
          
          <div className="vendor-input-group">
            <label>Product Title</label>
            <input 
              type="text" 
              name="name" 
              value={productDetails.name} 
              onChange={changeHandler} 
              placeholder="e.g., Hand-painted Terracotta Vase" 
              required 
            />
          </div>

          <div className="vendor-input-group">
            <label>Craft Story / Description</label>
            <textarea 
              name="description" 
              value={productDetails.description} 
              onChange={changeHandler} 
              placeholder="Tell customers about the history, material, and efforts put into this craft..." 
              rows="3"
              required
            ></textarea>
          </div>

          <div className="vendor-form-row">
            <div className="vendor-input-group flex-1">
              <label>Category</label>
              <select name="category" value={productDetails.category} onChange={changeHandler} className="vendor-select">
                <option value="Clothes">Clothes</option>
                <option value="Pottery">Pottery</option>
                <option value="Paintings">Paintings</option>
                <option value="Resin">Resin Art</option>
                <option value="Toys">Toys</option>
              </select>
            </div>

            <div className="vendor-input-group flex-1">
              <label>Original Price (₹)</label>
              <input 
                type="number" 
                name="old_price" 
                value={productDetails.old_price} 
                onChange={changeHandler} 
                placeholder="Old Price" 
                min="1"
                required 
              />
            </div>

            <div className="vendor-input-group flex-1">
              <label>Offer Price (₹)</label>
              <input 
                type="number" 
                name="new_price" 
                value={productDetails.new_price} 
                onChange={changeHandler} 
                placeholder="Selling Price" 
                min="1"
                required 
              />
            </div>
          </div>

          <div className="vendor-input-group upload-section">
            <label>Product Image</label>
            <div className="image-upload-wrapper">
              <label htmlFor="file-input" className="upload-box-label">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="uploaded-preview-img" />
                ) : (
                  <div className="upload-placeholder-text">
                    <span className="plus-icon">+</span>
                    <p>Click to Upload Image</p>
                  </div>
                )}
              </label>
              <input 
                type="file" 
                id="file-input" 
                onChange={imageHandler} 
                hidden 
                accept="image/*"
                required={!image} 
              />
            </div>
          </div>

          <button type="submit" className="vendor-submit-btn" disabled={loading}>
            {loading ? 'UPLOADING...' : 'LIST PRODUCT NOW'}
          </button>

        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Vendor;