import { useContext } from 'react';
import { ShopContext } from './ShopContext'; // Kyunki ShopContext bhi isi pages folder me hai
import Footer from '../components/Footer/Footer'; // Footer ka sahi relative path
import PageOptions from '../components/PageOptions/PageOptions';
import './cart.css';

const Cart = () => {
  const { all_products, cartItems, addToCart, removeFromCart } = useContext(ShopContext);

  // Bill calculation logic based on selected products
  const getCartTotalAmount = () => {
    let totalAmount = 0;
    all_products.forEach((product) => {
      if (cartItems[product.id] > 0) {
        totalAmount += product.new_price * cartItems[product.id];
      }
    });
    return totalAmount;
  };

  const totalAmount = getCartTotalAmount();

  return (
    <div className="cart-page-container">
      <PageOptions />
      {/* Page Header Title */}
      <div className="cart-header">
        <h1>YOUR SHOPPING CART</h1>
      </div>

      <div className="cart-wrapper">
        {totalAmount === 0 ? (
          /* Empty State Display Panel */
          <div className="empty-cart">
            <h2>Your Cart is Empty 🌸</h2>
            <p>Add some beautiful handmade crafts to bring heritage to your home.</p>
          </div>
        ) : (
          /* Active Shopping Products Invoice */
          <div className="cart-content">
            
            {/* LEFT ROW CONTAINER: Cart Items Grid Table */}
            <div className="cart-items-section">
              <div className="cart-items-labels">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
              </div>
              <hr />

              {all_products.map((product) => {
                if (cartItems[product.id] > 0) {
                  return (
                    <div key={product.id}>
                      <div className="cart-item-row">
                        <img src={product.image} alt={product.name} className="cart-item-img" />
                        <p className="cart-item-name">{product.name}</p>
                        <p>₹{product.new_price}</p>
                        
                        {/* Dynamic Item Modifier inside Cart Page layout */}
                        <div className="cart-page-counter">
                          <button onClick={() => removeFromCart(product.id)}>-</button>
                          <span>{cartItems[product.id]}</span>
                          <button onClick={() => addToCart(product.id)}>+</button>
                        </div>
                        
                        <p className="cart-item-total">₹{product.new_price * cartItems[product.id]}</p>
                      </div>
                      <hr />
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* RIGHT ROW CONTAINER: Total Pricing Box Breakdown */}
            <div className="cart-totals-section">
              <h3>Order Summary</h3>
              <div className="totals-row">
                <p>Subtotal</p>
                <p>₹{totalAmount}</p>
              </div>
              <div className="totals-row">
                <p>Shipping Fee</p>
                <p className="free-shipping">FREE</p>
              </div>
              <hr />
              <div className="totals-row final-total">
                <p>Total</p>
                <p>₹{totalAmount}</p>
              </div>
              <button className="checkout-btn">PROCEED TO CHECKOUT</button>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;