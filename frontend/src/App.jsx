import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from './pages/shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/product';
import Cart from './pages/cart';
import Login from './pages/login';
import Vendor from './pages/vendor';
import { ShopContext } from './pages/ShopContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/home" element={<Shop />} />
          <Route path="/Clothes" element={<ShopCategory category="Clothes"/>} />
          <Route path="/Pottery" element={<ShopCategory category="Pottery"/>} />
          <Route path="/Paintings" element={<ShopCategory category="Paintings"/>} />
          <Route path="/Resin" element={<ShopCategory category="Resin"/>} />
          <Route path="/Toys" element={<ShopCategory category="Toys"/>} />
          <Route path="/product" element={<Product/>}/>
          <Route path=":productId" element={<Product/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/vendor" element={<Vendor/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
