import React from 'react';
import './Home.css'; // Import CSS file for styling

function Home() {
  return (
    <div className='home-container'>
      <div className='content-container'>
        <h1 className='app-title'>VNR BLOG APP</h1>
        <p className='app-description'>
          Welcome to our blog app! Explore the latest articles and share your thoughts.
        </p>
      </div>
      <div className='background-shapes'>
        <div className='circle'></div>
        <div className='triangle'></div>
        <div className='square'></div>
      </div>
    </div>
  );
}

export default Home;
