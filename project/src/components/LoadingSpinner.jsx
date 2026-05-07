import React from 'react';
import '../styles/LoadingSpinner.css';

export default function LoadingSpinner({ message = 'Loading…' }) {
  return (
    <div className="loading-spinner">
      <div className="spinner" />
      <div className="loading-text">{message}</div>
      <div className="loading-meta-text">
        Fetching live traffic data…
      </div>
    </div>
  );
}
