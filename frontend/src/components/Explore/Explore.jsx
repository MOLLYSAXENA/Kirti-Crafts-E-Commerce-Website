import { Link } from 'react-router-dom'; // 1. React Router ka Link import kiya
import './Explore.css'; 

// Images imports
import clothesImg from '../../assets/cloth.jpg';
import potteryImg from '../../assets/pottery.jpg';
import paintingsImg from '../../assets/paintings.avif';
import resinImg from '../../assets/resin.jpg';
import toysImg from '../../assets/toys.png';

const ExploreCrafts = () => {
  return (
    <div id="explore" className="explore-section">
      <h2 className="section-title">🌸 EXPLORE OUR CRAFTS 🌸</h2>
      
      <div className="categories-container">
        
        {/* 2. div ko Link se badla aur to="" property di */}
        <Link to="/Clothes" className="category-card">
          <img src={clothesImg} alt="Clothes" />
          <p>CLOTHES</p>
        </Link>

        <Link to="/Pottery" className="category-card">
          <img src={potteryImg} alt="Pottery" />
          <p>POTTERY</p>
        </Link>

        <Link to="/Paintings" className="category-card">
          <img src={paintingsImg} alt="Paintings" />
          <p>PAINTINGS</p>
        </Link>

        <Link to="/Resin" className="category-card">
          <img src={resinImg} alt="Resin Art" />
          <p>RESIN ART</p>
        </Link>

        <Link to="/Toys" className="category-card">
          <img src={toysImg} alt="Toys" />
          <p>TOYS</p>
        </Link>

      </div>
    </div>
  );
};

export default ExploreCrafts;