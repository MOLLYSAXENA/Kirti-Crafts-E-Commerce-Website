import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Column 1: Short Brand Info */}
        <div className="footer-col brand-info">
          <h3 className="footer-logo">Kirti Crafts</h3>
          <p className="footer-desc">
            Handcrafted Indian heritage, curated with love for you.
          </p>
        </div>

        {/* Column 2: Links */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="footer-col">
          <h4>Connect</h4>
          <p className="contact-text">support@kirticrafts.com</p>
          <div className="social-links">
            <a href="#instagram">Insta</a>
            <a href="#facebook">FB</a>
            <a href="#pinterest">Pin</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <hr className="footer-divider" />
        <p>&copy; {new Date().getFullYear()} Kirti Crafts. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;