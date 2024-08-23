import React from 'react';
import '../styles/LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loader">
        <div className="globe">
          <div className="globe-inner"></div>
        </div>
      </div>
      <h2>Discovering the World...</h2>
    </div>
  );
};

export default LoadingScreen;