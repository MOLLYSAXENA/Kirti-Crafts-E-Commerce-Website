import { Link } from 'react-router-dom';
import './PageOptions.css';

const PageOptions = () => {
  return (
    <div className="page-options-bar">
      <div className="page-options-label">Quick Links</div>
      <div className="page-options-links">
        <Link to="/home">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
        <Link to="/vendor">Vendor</Link>
      </div>
    </div>
  );
};

export default PageOptions;
