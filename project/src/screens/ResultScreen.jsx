import React, { useState } from 'react';
import RouteMap from '../components/RouteMap';
import '../styles/ResultScreen.css';


function scoreColor(score) {
  if (score >= 80) {
    return 'color-green'
  }
  if (score >= 60) {
    return 'color-yellow'
  }
  return 'color-red';
}


function scoreColorHex(score) {
  if (score >= 80) {
    return '#22b573'
  }
  if (score >= 60) {
    return '#ffd84d'
  }
  return '#ff5a5a';
}



function ConfidenceCard({ label, time, confidence, isSelected, onClick }) {
  return (
    <button className={`confidence-card ${isSelected ? 'confidence-card-selected' : ''}`} onClick={onClick}>

      <div className="confidence-card-label">{label}</div>

      <div className={`confidence-card-time ${isSelected ? 'confidence-card-time-selected' : ''}`}>
        {time}m
      </div>

      <div className="confidence-card-percentage">{confidence}%</div>

    </button>
  )
}



export default function ResultScreen({routes,selectedRoute, setSelectedRoute,origin, destination,setCurrentScreen,}) {

  const [selectedConfidence, setSelectedConfidence] = useState(73);
  
  
  if (!selectedRoute) {
    return (
      <div className="empty-state">

        <div className="empty-icon">◈</div>

        <div className="empty-text">No route selected. Go back and search.</div>

        <button onClick={() => setCurrentScreen('home')} className="btn btn-primary btn-back">
          ← Back
        </button>

      </div>
    )
  }

  const r = selectedRoute
  const colorClass = scoreColor(r.reliabilityScore)
  const colorHex = scoreColorHex(r.reliabilityScore)


  const medianTime = r.durationMinutes;
  const p50Time = medianTime;
  const p73Time = Math.round(medianTime * 1.08);
  const p90Time = Math.round(medianTime * 1.17);
  const p95Time = Math.round(medianTime * 1.22);
  const worstTime = Math.round(medianTime * 1.32);
  

  const confidenceTimes = { 50: p50Time, 73: p73Time, 90: p90Time, 95: p95Time}

  const selectedTime = confidenceTimes[selectedConfidence]
  

  const arrivalProbability = selectedConfidence

  const uncertaintyBand = Math.round((p95Time - p50Time) / 2)
  const uncertaintySkew = r.reliabilityScore < 70 ? 'SKEWED' : 'NORMAL'

  const buildMapsUrl = () => {
    if (!r.geometry || !r.geometry.coordinates) {
      return `https://www.google.com/maps/dir/?api=1&origin=${origin?.lat},${origin?.lng}&destination=${destination?.lat},${destination?.lng}&travelmode=driving`;
    }

    const coords = r.geometry.coordinates;

    const waypoints = coords
      .filter((_, i) => i % Math.max(1, Math.floor(coords.length / 8)) === 0)
      .slice(1, -1)
      .map(([lng, lat]) => `${lat},${lng}`)
      .join("|");

    return `https://www.google.com/maps/dir/?api=1&origin=${origin?.lat},${origin?.lng}&destination=${destination?.lat},${destination?.lng}&travelmode=driving&waypoints=${waypoints}`;
  };

  return (
    <div className="screen-container">

      <div className="top-bar">

        <button onClick={() => setCurrentScreen('home')} className="top-bar-btn">←</button>

        <div className="top-bar-center">
          <div className="top-bar-title">Route Analysis</div>
          <div className="top-bar-subtitle">{r.name}</div>
        </div>

        <button onClick={() => setCurrentScreen('compare')} className="top-bar-btn">⇌</button>

      </div>


      <div className="card card-accent">

        <div className="card-title">Arrival Probability</div>
        
        <div className="arrival-probability">

          <div className="probability-left">

            <div className="probability-percentage">
              <span className="probability-number">{arrivalProbability}</span>
              <span className="probability-symbol">%</span>
            </div>

            <div className="probability-text">
              chance of arriving within <span className="probability-highlight">{selectedTime} min</span>
            </div>

            <div className="probability-meta">
              median {p50Time}m · P95 {p95Time}m · worst {worstTime}m
            </div>

          </div>


          <div className="circular-progress">

            <svg width="70" height="70" className="svg-rotated">
              <circle cx="35" cy="35" r="30" className="circle-bg" />
              <circle cx="35" cy="35" r="30" className="circle-progress" stroke={colorHex} strokeDasharray={`${(r.reliabilityScore / 100) * 188.4} 188.4`}/>
            </svg>

            <div className="circular-progress-content">
              <div className={`circular-progress-value ${colorClass}`}>{r.reliabilityScore}</div>
              <div className="circular-progress-label">REL</div>
            </div>

          </div>
        </div>


        <div className="distribution-bar">

          <div className="distribution-track">
            <div className={`distribution-marker distribution-marker-${selectedConfidence}`} />
          </div>

          <div className="distribution-labels">
            <span>+ 0%</span>
            <span className="distribution-label-active">+ {selectedConfidence}%</span>
            <span>100%</span>
          </div>

        </div>
      </div>


      <div>

        <div className="section-header">

          <div className="section-title">Compare Routes</div>

          <div className="section-count">{routes.length} OPTIONS</div>
          
        </div>


        {routes.map((route, idx) => {
          const routeColorClass = scoreColor(route.reliabilityScore)
          const routeColorHex = scoreColorHex(route.reliabilityScore)
          const isSelected = route.id === r.id
          const routeLabel = idx === 0 ? 'A' : 'B'
          const routeType = idx === 0 ? 'Direct' : 'Alternative'
          const isBest = idx === 0
          const incidents = idx === 0 ? 0 : 1

          return (
            <button key={route.id} onClick={() => setSelectedRoute(route)} className={`route-card ${isSelected ? 'route-card-selected' : ''}`}>

              <div className="route-card-info">

                <div className="route-card-header">
                  <span className="route-card-name">Route {routeLabel}</span>
                  <span className="route-card-type">· {routeType}</span>
                  {isBest && (
                    <span className="route-card-badge">★ BEST</span>
                  )}
                </div>

                <div className="route-card-meta">
                  <span>⏱ {route.durationMinutes} min</span>
                  <span>🛣 {route.distanceKm} km</span>
                  {incidents > 0 && (
                    <span className="route-card-warning">⚠ {incidents}</span>
                  )}
                </div>

              </div>

 
              <div className="route-card-score">

                <div className={`route-card-score-value ${routeColorClass}`}>
                  {route.reliabilityScore}
                </div>

                <div className={`route-card-score-label ${routeColorClass}`}>
                  {route.reliabilityScore >= 80 ? 'HIGH' : route.reliabilityScore >= 60 ? 'MODERATE' : 'LOW'}
                </div>

              </div>
            </button>
          )
        })}
      </div>


      <div>

        <div className="section-title">Adjust Confidence Target</div>

        <div className="confidence-grid">

          <ConfidenceCard label="P50" time={p50Time} confidence={50} isSelected={selectedConfidence === 50} onClick={() => setSelectedConfidence(50)}/>

          <ConfidenceCard label="P73"  time={p73Time}  confidence={73}  isSelected={selectedConfidence === 73} onClick={() => setSelectedConfidence(73)}/>

          <ConfidenceCard label="P90" time={p90Time} confidence={90} isSelected={selectedConfidence === 90} onClick={() => setSelectedConfidence(90)}/>

          <ConfidenceCard label="P95" time={p95Time} confidence={95} isSelected={selectedConfidence === 95} onClick={() => setSelectedConfidence(95)}/>

        </div>

      </div>


      <div className="metrics-grid">


        <div className="metric-card">

          <div className="metric-label">Reliability Score</div>

          <div className="metric-value">
            <span className={`metric-number ${colorClass}`}>{r.reliabilityScore}</span>
            <span className="metric-unit">/100</span>
          </div>

          <div className="metric-meta">σ = 0.12</div>

          <div className={`metric-badge ${r.reliabilityScore >= 80 ? 'metric-badge-green' : 'metric-badge-yellow'}`}>
            {r.reliabilityScore >= 80 ? 'HIGH' : r.reliabilityScore >= 60 ? 'MODERATE' : 'LOW'}
          </div>

        </div>


        <div className="metric-card">

          <div className="metric-label">Uncertainty Band</div>

          <div className="metric-value">
            <span className="metric-number color-red">±{uncertaintyBand}</span>
            <span className="metric-unit">min</span>
          </div>

          <div className="metric-meta">log-normal model</div>

          <div className="metric-badge metric-badge-red">{uncertaintySkew}</div>

        </div>


        <div className="metric-card">
          <div className="metric-label">Median ETA</div>

          <div className="metric-value">
            <span className="metric-number color-cyan">{medianTime}</span>
            <span className="metric-unit">min</span>
          </div>

          <div className="metric-meta">P50 baseline</div>

        </div>


        <div className="metric-card">

          <div className="metric-label">Distance</div>

          <div className="metric-value">
            <span className="metric-number color-cyan">{r.distanceKm}</span>
            <span className="metric-unit">km</span>
          </div>

          <div className="metric-meta">total route</div>
          
        </div>
      </div>


      <div className="section-title">Map Preview</div>

      <div className="map-container">

        <div className="map-wrapper">
          <RouteMap route={r} origin={origin} destination={destination} />
        </div>

      </div>


      <a href={buildMapsUrl()} target="_blank" rel="noreferrer" className="btn btn-primary btn-link">
        🗺 Start Navigation
      </a>
    </div>
  )
}
