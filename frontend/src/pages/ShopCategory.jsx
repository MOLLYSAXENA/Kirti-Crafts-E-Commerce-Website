import { useContext, useMemo, useState } from 'react';
import Footer from '../components/Footer/Footer';
import PageOptions from '../components/PageOptions/PageOptions';
import { ShopContext } from './ShopContext';
import './category.css';

const ShopCategory = (props) => {
  const { all_products, cartItems, addToCart, removeFromCart } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState('default');

  // Filter products based on category
  const filteredProducts = (all_products || []).filter(item => 
    item && item.category && props.category && 
    item.category.trim().toLowerCase() === props.category.trim().toLowerCase()
  );

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    if (sortOption === 'priceLow') {
      return products.sort((a, b) => a.new_price - b.new_price);
    }
    if (sortOption === 'priceHigh') {
      return products.sort((a, b) => b.new_price - a.new_price);
    }
    if (sortOption === 'name') {
      return products.sort((a, b) => a.name.localeCompare(b.name));
    }
    return products;
  }, [filteredProducts, sortOption]);

  return (
    <div className="category-page-container">
      <PageOptions />
      
      {/* Top Banner Header */}
      <div className="category-header">
        <h1>{props.category.toUpperCase()} COLLECTION</h1>
        <p>Home &rarr; {props.category}</p>
      </div>

      {/* Main Products Section Wrapper */}
      <div className="products-layout-wrapper">
        <div className="products-toolbar">
          <div className="products-count-bar">
            <p>Showing <span>{filteredProducts.length}</span> authentic creations</p>
          </div>
          <div className="products-arrange-bar">
            <span>Arrange it:</span>
            <button
              type="button"
              className={sortOption === 'default' ? 'arrange-btn active' : 'arrange-btn'}
              onClick={() => setSortOption('default')}
            >
              Default
            </button>
            <button
              type="button"
              className={sortOption === 'priceLow' ? 'arrange-btn active' : 'arrange-btn'}
              onClick={() => setSortOption('priceLow')}
            >
              Price Low → High
            </button>
            <button
              type="button"
              className={sortOption === 'priceHigh' ? 'arrange-btn active' : 'arrange-btn'}
              onClick={() => setSortOption('priceHigh')}
            >
              Price High → Low
            </button>
          </div>
        </div>

        {/* Dynamic Products Grid */}
        <div className="products-grid">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => {
              const quantity = cartItems[product.id] || 0;

              return (
                <div key={product.id} className="product-item-card">
                  <div className="img-wrapper">
                    <img src={product.image} alt={product.name} />
                  </div>
                  
                  <div className="product-details">
                    <h3>{product.name}</h3>
                    
                    <div className="price-container">
                      <span className="new-price">₹{product.new_price}</span>
                      <span className="old-price">₹{product.old_price}</span>
                    </div>

                    {/* CART LOGIC */}
                    {quantity === 0 ? (
                      <button className="view-product-btn" onClick={() => addToCart(product.id)}>
                        Add To Cart
                      </button>
                    ) : (
                      <div className="cart-counter-control">
                        <button className="counter-btn minus" onClick={() => removeFromCart(product.id)}>-</button>
                        <span className="counter-qty">{quantity}</span>
                        <button className="counter-btn plus" onClick={() => addToCart(product.id)}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-products-message" style={{ 
              gridColumn: '1/-1', 
              textAlign: 'center', 
              padding: '60px 20px', 
              border: '2px dashed #b87333', 
              borderRadius: '12px', 
              backgroundColor: '#fff9f5', 
              margin: '20px' 
            }}>
              <span style={{ fontSize: '50px' }}>🛍️</span>
              <h3 style={{ color: '#b87333', margin: '15px 0 5px 0', fontSize: '22px' }}>
                No Products Found
              </h3>
              <p style={{ color: '#666', fontSize: '15px', maxWidth: '400px', margin: '0 auto' }}>
                This category has no products yet. Please add products through the vendor panel!
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Footer Component */}
      <Footer />
    </div>
  );
};

export default ShopCategory;
