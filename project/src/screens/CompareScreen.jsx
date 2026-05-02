import React, { useState } from 'react';
import '../styles/CompareScreen.css';

const FILTERS=[{key:'reliability',label:'By reliability' },{key:'time',label:'By time'},{key:'distance',label: 'By distanc'}]

function scoreColor(score) {
  if (score >= 80) {
    return '#22b573'
  }
  if (score >= 60) {
    return '#ffd84d'
  }
  return '#ff5a5a';
}

export default function CompareScreen({ routes, selectedRoute, setSelectedRoute,setCurrentScreen,origin, destination}) {

  const [filter, setFilter] = useState('reliability');


  if (!routes || routes.length === 0) {
    return (
      <div className="empty-state">

        <div className="empty-icon">⇌</div>

        <div className="empty-text">No routes to compare. Search first.</div>

        <button onClick={() => setCurrentScreen('home')} className="btn btn-primary btn-back">
          ← Back
        </button>

      </div>
    );
  }


  const sorted = [...routes].sort((a, b) => {
    if (filter === 'time') {
      return a.durationMinutes - b.durationMinutes
    }
    if (filter === 'distance') {
      return parseFloat(a.distanceKm) - parseFloat(b.distanceKm)
    }
    return b.reliabilityScore - a.reliabilityScore
  })


  return (
    <div className="screen-container">

      <div className="compare-header">

        <button onClick={() => setCurrentScreen('result')} className="top-bar-btn">←</button>

        <div>
          <div className="compare-title">Compare routes</div>

          <div className="compare-subtitle">
            {sorted.length} options · {origin?.name?.split(',')[0]} → {destination?.name?.split(',')[0]}
          </div>

        </div>
      </div>


      <div className="filter-chips">

        {FILTERS.map((f) => {

          const active = filter === f.key;

          return (
            <button key={f.key} onClick={() => setFilter(f.key)} className={`filter-chip ${active ? 'filter-chip-active' : ''}`}>
              {f.label}
            </button>
          )
        })}

      </div>

      {sorted.map((route, idx) => {

        const isSelected = route.id === selectedRoute?.id

        const color = scoreColor(route.reliabilityScore)

        const isBest = idx === 0

        return (
          <div key={route.id} className={`compare-route-card ${isSelected ? 'compare-route-card-selected' : ''}`}>


            {isBest && (
              <div className="best-badge">
                ★ BEST CHOICE
              </div>
            )}


            <div className="compare-route-header">

              <div>

                <div className="compare-route-name">{route.name}</div>

                <div className="compare-route-details">
                  {route.distanceKm} km · {route.durationMinutes} min
                </div>

              </div>


              <div className="score-circle" style={{ border: `3px solid ${color}` }}>

                <div className="score-circle-value" style={{ color }}>{route.reliabilityScore}</div>

                <div className="score-circle-label">SCORE</div>

              </div>

            </div>


            <div className="compare-stats-row">

              {[{label:'DURATION',value:`${route.durationMinutes}m`},{label:'DISTANCE',value:`${route.distanceKm}km`},{label: 'SCORE',value: route.reliabilityScore,color}].map((s) => (

                <div key={s.label} className="compare-stat-box">

                  <div className="compare-stat-label">{s.label}</div>

                  <div className="compare-stat-value" style={{ color: s.color || 'var(--text-secondary)' }}>{s.value}</div>

                </div>
              ))}

            </div>

   
            <button onClick={() => { setSelectedRoute(route); setCurrentScreen('result'); }} className={`use-route-btn ${isSelected ? 'use-route-btn-selected' : ''}`}>
              {isSelected ? 'Currently selected ✓' : 'Use this route ›'}
            </button>

          </div>
        )
      })}
    </div>
  )
}
