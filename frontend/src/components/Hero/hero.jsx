import "./hero.css"
import arrow_icon from "../../assets/arrow.jpeg"
import handmade from "../../assets/handmade.jpg"

const Hero = () => {
    const handleLatestClick = () => {
        const el = document.getElementById('explore');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className='hero'>
                <div className="hero-left">
                        <p className="head">Handmade with love,</p>
                        <p className='col1'>Crafted for you </p>
                        <p className='col2'>Unique handmade creations by talented artisans across India. 
                                One for a kind, just like you</p>

                        <button className="hero-btn" onClick={handleLatestClick} aria-label="Latest Collections">
                                <span>Latest Collections</span>
                                <img src={arrow_icon} alt="arrow" height="20" />
                        </button>
                </div>
                <div className="hero-right">
                        <img src={handmade} alt="" height="400rem" />

                </div>
        </div>

    )
}

export default Hero