import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';

const About = () => {
  const [activeCard, setActiveCard] = useState(null);
  const navigate = useNavigate();

  const toggleCard = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const handleJoinClick = () => {
    navigate("/home");
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="header-content-centered">
          <div className="title-with-image">
            <img src={image1} alt="Profile" className="profile-img" />
            <div>
              <h1 className="main-title">LifeBox NextGen</h1>
              <p className="subtitle">Where Memories Live Forever</p>
            </div>
          </div>
          <button className="join-button" onClick={handleJoinClick}>
            Join Us – Start Your Journey
          </button>
        </div>
        <div className="header-ticker">
          <marquee scrollamount="6">
            📢 LifeBox NextGen Launch Offer: Get Premium Plan at just $5.99/month! | ✅ Get Premium — Available Now
            💾 Store Your Memories 🎁 Gift Someone Special |
          </marquee>
        </div>
      </header>

      {/* Intro Section */}
      <section className="intro-section fade-in">
        <h2>Start Your Journey with LifeBox NextGen</h2>
        <p className="tagline">Where Technology Preserves Emotions.</p>
        <p>LifeBox NextGen isn't just a product — it's your family's digital heartbeat.</p>
        <p>Preserve generations of love, laughter, and legacy in a smart, secure time capsule.</p>
        <p>Store precious family videos, emotional messages, celebrations, and last words of loved ones — all in one private, encrypted vault.</p>
        <p>Every memory is stored safely using advanced encryption and cloud redundancy — your emotions are untouchable, yet always accessible.</p>
        <p>From childhood birthdays to grandparents’ wisdom, LifeBox makes memories eternal.</p>
        <p>Let your great-grandchildren witness the love you shared today, tomorrow.</p>
        <p>Share moments. Relive emotions. Celebrate life — across time and space.</p>
        <p className="slogan">LifeBox NextGen: Where digital innovation meets human connection.</p>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid-horizontal">
          {[
            {
              img: image2,
              title: "Private & Secure",
              text: "End-to-end encryption ensures your most personal moments stay protected and private, only accessible by you and your loved ones."
            },
            {
              img: image3,
              title: "Unlimited Storage",
              text: "Store a lifetime of content including emotional video messages, photos, journals, voice notes, and digital memories without worrying about space."
            },
            {
              img: image4,
              title: "Time Capsule",
              text: "Create messages that unlock on birthdays, anniversaries, or special dates in the future—giving comfort and joy across time."
            },
            {
              img: image5,
              title: "Family Connection",
              text: "Bridge generations with love. LifeBox lets families create, store, and relive emotional moments together — no matter where they are."
            },
            {
              img: image1,
              title: "Accessible Anywhere",
              text: "Whether on your phone, tablet, or desktop — LifeBox ensures your memories are with you anytime, anywhere, with real-time sync."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${activeCard === index ? 'active' : ''}`}
              onClick={() => toggleCard(index)}
            >
              <img src={feature.img} alt={feature.title} />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="usecases-section">
        <h2>How People Use LifeBox</h2>
        <ul>
          <li>🧓 Grandparents recording bedtime stories and family traditions for grandchildren to treasure forever.</li>
          <li>💑 Couples saving annual anniversary video messages, celebrating their journey together through time.</li>
          <li>👶 Parents documenting their child’s first words, steps, and milestones with love notes for future birthdays.</li>
          <li>📦 Families preserving legacy messages, goodbyes, and wisdom to be passed down through generations.</li>
          <li>🎓 Graduates sharing life advice and dreams with their future selves via scheduled video drops.</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} LifeBox NextGen. All rights reserved.</p>
          <p>📧 Email: <a href="mailto:lifeboxnextgen@gmail.com">lifeboxnextgen@gmail.com</a></p>
          <p>📞 Contact: +91 98765 43210</p>
          <div className="social-links">
            <a href="#">🌐 Website</a> | 
            <a href="#">📘 Facebook</a> | 
            <a href="#">📷 Instagram</a> | 
            <a href="#">💼 LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
