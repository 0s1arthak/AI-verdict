import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Generating the AI verdict...</p>
    </div>
  );
};

export default Loader;
