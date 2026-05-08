import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/HomeScreen.css';

function HomeScreen({
  origin, setOrigin,
  destination, setDestination,
  setRoutes, setSelectedRoute,
  setCurrentScreen,
  isLoading, setIsLoading,
  error, setError,
}) {

  function getReliability(hour) {
    if (hour >= 8 && hour <= 10) return 62;  
    if (hour >= 17 && hour <= 19) return 58;  
    return 88;
  }

  function makeHourlyData() {
    return Array.from({ length: 12 }, (_, i) => getReliability(8 + i));
  }
  
  const [timeStr,setTimeStr] = useState('');
  const [hourlyData,setHourlyData] = useState([]);

  
  useEffect(() => {
    setHourlyData(makeHourlyData());

    
    function tick() {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h > 12 ? h - 12 : h || 12;
      setTimeStr(`${h12}:${m < 10 ? '0' : ''}${m} ${ampm}`);
    }
    tick();
    const timerId = setInterval(tick, 1000);

    
    return () => clearInterval(timerId);
  }, []); 

  const canAnalyze = origin && destination && !isLoading;

  
  function calculateReliabilityScore(route, index, currentHour) {
    
    let score = 95;
    
    
    const durationMinutes = Math.round(route.duration / 60);
    if (durationMinutes > 60) score -= 15;
    else if (durationMinutes > 45) score -= 10;
    else if (durationMinutes > 30) score -= 5;
    
    
    if ((currentHour >= 8 && currentHour <= 10) || (currentHour >= 17 && currentHour <= 19)) {
      score -= Math.floor(Math.random() * 15) + 10; 
    } else {
      score -= Math.floor(Math.random() * 8); 
    }
    
    score -= index * 8;
    
    score -= Math.floor(Math.random() * 12);
    
    return Math.max(45, Math.min(95, score));
  }

  async function handleAnalyze() {
    if (!canAnalyze) return;
    setIsLoading(true);
    setError(null);

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/`
        + `${origin.lng},${origin.lat};${destination.lng},${destination.lat}`
        + `?overview=full&alternatives=true&geometries=geojson`;

      const response = await fetch(url);
      const data = await response.json();

      if (!data.routes || data.routes.length === 0) {
        throw new Error('No routes found');
      }

      const currentHour = new Date().getHours();

      
      const results = data.routes.map((r, i) => ({
        id: i,
        name: i === 0 ? 'Fastest Route' : `Alternative ${i}`,
        durationMinutes: Math.round(r.duration / 60),
        distanceKm: (r.distance / 1000).toFixed(1),
        reliabilityScore: calculateReliabilityScore(r, i, currentHour),
        geometry: r.geometry, 
        legs: r.legs,
      }));

      setRoutes(results);
      setSelectedRoute(results[0]);
      setCurrentScreen('result');
    } catch (err) {
      setError('Could not fetch routes. Check your connection.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleSwap() {
    const tmp = origin;
    setOrigin(destination);
    setDestination(tmp);
  }

  const score = getReliability(new Date().getHours());

  return (
    <div className="screen-container">
      <div className="header">
        <div className="header-left">
          <div className="logo">P</div>
          <div>
            <div className="app-name">PathSure</div>
            <div className="header-subtitle">Where are you going?</div>
          </div>
        </div>
        <div className="live-badge">
          <div className="live-dot" />
          <span className="live-text">LIVE</span>
        </div>
      </div>

      <br />

      <div className="card">
        <div className="search-container">
          <SearchBar
            label="Origin"
            placeholder="Enter starting point..."
            value={origin}
            onSelect={setOrigin}
            dotColor="#57cdf4"
          />

          <br />

          <SearchBar
            label="Destination"
            placeholder="Enter destination..."
            value={destination}
            onSelect={setDestination}
            dotColor="#ffd84d"
          />
        </div>
      </div>

      <br />

      <div className="time-chip">
        <span className="time-icon">🕐</span>
        <div>
          <div className="time-label">LEAVE NOW</div>
          <div className="time-value">{timeStr}</div>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          ⚠ {error}
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={!canAnalyze}
        className="btn btn-primary"
      >
        {isLoading ? '⟳ Analyzing...' : '⟳ Analyze Route'}
      </button>

      <br />

      
      {isLoading && (
        <div className="loading-overlay">
          <LoadingSpinner message="Analyzing Routes…" />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;