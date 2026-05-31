import { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../pages/ShopContext';
import "./Navbar.css";
import logo from "../../assets/logo.png";
import cart from "../../assets/cart.jpg";
const Navbar = () =>{
    const [menu, setMenu] = useState("home");
    const { getTotalCartItems } = useContext(ShopContext);
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" height='70px' className='image' />
                <p> Kirti Crafts</p>
                <ul className='nav-menu'>
                    <li onClick={() => { setMenu("home"); }}><Link style={{ textDecoration: 'none' }} to="/home">Home</Link> {menu === "home" ? <hr />:<></>}</li>
                    <li onClick={()=>{setMenu("Clothes")}}><Link style={{ textDecoration: 'none' }} to="/Clothes">Clothes</Link> {menu === "Clothes" ? <hr />:<></>}</li>
                    <li onClick={()=>{setMenu("Pottery")}}><Link style={{ textDecoration: 'none' }} to="/Pottery">Pottery </Link>{menu === "Pottery" ? <hr />:<></>}</li>
                    <li onClick={()=>{setMenu("Paintings")}}><Link style={{ textDecoration: 'none' }} to="/Paintings">Paintings </Link>{menu === "Paintings" ? <hr />:<></>}</li>
                    <li onClick={()=>{setMenu("Resin")}}><Link style={{ textDecoration: 'none' }} to="/Resin">Resin Art </Link>{menu === "Resin" ? <hr />:<></>}</li>
                    <li onClick={()=>{setMenu("Toys")}}><Link style={{ textDecoration: 'none' }} to="/Toys">Toys </Link>{menu === "Toys" ? <hr />:<></>}</li>
                </ul>
                <div className="nav-login-cart">
                    <Link style={{ textDecoration: 'none', color:"#ffffff" }} to="/login"><button>Login</button></Link>
                    <Link style={{ textDecoration: 'none', color:"#ffffff"}} to="/vendor"><button className="vendor">Sell</button></Link>
                    <Link style={{ textDecoration: 'none' }} to="/cart"><img src={cart} alt="cart" height='40px' /></Link>
                    <div className="nav-cart-count">{getTotalCartItems()}</div>

                </div>
            </div>
        </div>
    );
};


export default Navbar