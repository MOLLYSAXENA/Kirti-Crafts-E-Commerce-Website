
import './Aboutus.css';
import aboutImg from '../../assets/About.png'; // Apni image ka sahi path lagayein

const AboutUs = () => {
  return (
    <div className="about-section">
      <div className="about-container">
        
        {/* LEFT SIDE: Image */}
        <div className="about-left">
          <img src={aboutImg} alt="About Kirti Crafts" />
        </div>

        {/* RIGHT SIDE: Text Content */}
        <div className="about-right">
          <h2 className="about-title">🌸 About Us 🌸</h2>
          <p className="about-text">
            Welcome to Kirti Crafts, where every creation tells a story of heritage, 
            passion, and unparalleled skill. We bring together talented artisans from 
            the heart of India to showcase unique, hand-crafted masterpieces made 
            with love just for you.
          </p>
          <p className="about-text">
            Our mission is to preserve traditional art forms while empowering local 
            communities. From intricate pottery to breathtaking paintings, each piece 
            is one of a kind—just like you.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;