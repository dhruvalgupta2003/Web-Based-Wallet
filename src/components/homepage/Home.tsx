// src/components/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="homepage">
       <div className="hero-section">
    <div className="hero-content">
      <h1>Built, invest, <br/>adjust, enjoy.</h1>
      <p>Swapify is a comprehensive platform that enables users to effortlessly buy, trade, create, and secure their crypto assets.</p>
      <Link to="/create-wallet">
        <button className="install-button">Create Wallet</button>
      </Link>
    </div>
  </div>
    </div>
  );
};

export default Home;
