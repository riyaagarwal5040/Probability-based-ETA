# PathSure - Code Workflow Documentation

## Technical Implementation & Code Flow

---

## 🏗️ Application Architecture

### Project Structure
```
project/
├── src/
│   ├── main.jsx                 # Entry point
│   ├── App.jsx                  # Root component
│   ├── components/
│   │   ├── BottomNav.jsx        # Navigation bar
│   │   ├── LoadingSpinner.jsx   # Loading indicator
│   │   ├── RouteMap.jsx         # Map component
│   │   └── SearchBar.jsx        # Location search
│   ├── screens/
│   │   ├── HomeScreen.jsx       # Main search screen
│   │   ├── ResultScreen.jsx     # Route results
│   │   ├── CompareScreen.jsx    # Route comparison
│   │   ├── IncidentScreen.jsx   # Incident reporting
│   │   └── GuideScreen.jsx      # Help/guide
│   └── styles/
│       ├── variables.css        # CSS variables
│       ├── app.css              # Global styles
│       └── [Component].css      # Component styles
├── index.html                   # HTML template
└── vite.config.js              # Build config
```

---

## 🚀 Application Initialization

### 1. Entry Point: `main.jsx`

```javascript
// File: src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/variables.css';  // CSS variables loaded first
import './styles/app.css';        // Global styles

// Mount React app to DOM
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

**Flow:**
1. Import React and ReactDOM
2. Import root App component
3. Import CSS files (variables → app styles)
4. Create React root on `#root` element
5. Render `<App />` component

---

## 🎯 Root Component: `App.jsx`

### State Management

```javascript
// File: src/App.jsx

import { useState } from 'react'
import ResultScreen from './screens/ResultScreen'
import CompareScreen from './screens/CompareScreen'

export default function App() {
  // Navigation state
  const [currentScreen, setCurrentScreen] = useState('result')

  // Location state
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)

  // Route data state
  const [routes, setRoutes] = useState([])
  const [selectedRoute, setSelectedRoute] = useState(null)

  // UI state
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Screen rendering logic
  function renderScreen() {
    const props = {
      origin, setOrigin,
      destination, setDestination,
      routes, setRoutes,
      selectedRoute, setSelectedRoute,
      isLoading, setIsLoading,
      error, setError,
      setCurrentScreen,
    };

    if (currentScreen === 'result') return <ResultScreen {...props} />;
    if (currentScreen === 'compare') return <CompareScreen {...props} />;
  }

  return (
    <div className="app-shell">
      <div className="phone">
        <div className="screen-scroll">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}
```

**State Structure:**
```javascript
{
  currentScreen: 'result' | 'compare' | 'home' | 'incident' | 'guide',
  origin: {
    name: string,
    displayName: string,
    lat: number,
    lng: number
  } | null,
  destination: { /* same as origin */ } | null,
  routes: [
    {
      id: number,
      name: string,
      durationMinutes: number,
      distanceKm: string,
      reliabilityScore: number,
      geometry: { coordinates: [[lng, lat], ...] },
      legs: object
    }
  ],
  selectedRoute: object | null,
  isLoading: boolean,
  error: string | null
}
```

---

## 🏠 HomeScreen Workflow

### Component Structure

```javascript
// File: src/screens/HomeScreen.jsx

export default function HomeScreen({
  origin, setOrigin,
  destination, setDestination,
  setRoutes, setSelectedRoute,
  setCurrentScreen,
  isLoading, setIsLoading,
  error, setError,
}) {
  // Local state
  const [timeStr, setTimeStr] = useState('');
  const [hourlyData, setHourlyData] = useState([]);

  // Initialize on mount
  useEffect(() => {
    setHourlyData(makeHourlyData());
    
    // Start clock
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
    
    return () => clearInterval(timerId); // Cleanup
  }, []);

  // Route analysis handler
  async function handleAnalyze() {
    if (!origin || !destination || isLoading) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // 1. Build OSRM API URL
      const url = `https://router.project-osrm.org/route/v1/driving/`
        + `${origin.lng},${origin.lat};${destination.lng},${destination.lat}`
        + `?overview=full&alternatives=true&geometries=geojson`;

      // 2. Fetch routes
      const response = await fetch(url);
      const data = await response.json();

      if (!data.routes || data.routes.length === 0) {
        throw new Error('No routes found');
      }

      // 3. Process routes
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

      // 4. Update state and navigate
      setRoutes(results);
      setSelectedRoute(results[0]);
      setCurrentScreen('result');
    } catch (err) {
      setError('Could not fetch routes. Check your connection.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="screen-container">
      {/* UI components */}
    </div>
  );
}
```

### Reliability Score Calculation

```javascript
function calculateReliabilityScore(route, index, currentHour) {
  let score = 95;
  
  // 1. Duration penalty
  const durationMinutes = Math.round(route.duration / 60);
  if (durationMinutes > 60) score -= 15;
  else if (durationMinutes > 45) score -= 10;
  else if (durationMinutes > 30) score -= 5;
  
  // 2. Rush hour penalty
  if ((currentHour >= 8 && currentHour <= 10) || 
      (currentHour >= 17 && currentHour <= 19)) {
    score -= Math.floor(Math.random() * 15) + 10;
  } else {
    score -= Math.floor(Math.random() * 8);
  }
  
  // 3. Alternative route penalty
  score -= index * 8;
  
  // 4. Random traffic variability
  score -= Math.floor(Math.random() * 12);
  
  // 5. Clamp to range
  return Math.max(45, Math.min(95, score));
}
```

---

## 🔍 SearchBar Component Workflow

### Component Logic

```javascript
// File: src/components/SearchBar.jsx

export default function SearchBar({ 
  label, 
  placeholder, 
  value, 
  onSelect, 
  dotColor 
}) {
  const [query, setQuery] = useState(value?.name || '');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  // Sync with parent value
  useEffect(() => {
    setQuery(value?.name || '');
  }, [value]);

  // Handle input change
  async function handleChange(e) {
    const q = e.target.value;
    setQuery(q);

    if (!q) {
      onSelect(null);
      setSuggestions([]);
      return;
    }

    if (q.length < 3) return; // Wait for 3+ chars

    setLoading(true);
    try {
      const results = await searchLocation(q);
      setSuggestions(results);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  }

  // Handle selection
  function handleSelect(suggestion) {
    setQuery(suggestion.name);
    setSuggestions([]);
    setFocused(false);
    onSelect(suggestion); // Lift state up
  }

  return (
    <div className="search-wrapper">
      <input
        value={query}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        placeholder={placeholder}
      />
      {focused && suggestions.length > 0 && (
        <div className="search-results">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => handleSelect(s)}>
              {s.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

### API Integration

```javascript
async function searchLocation(query) {
  const url = `https://nominatim.openstreetmap.org/search?`
    + `format=json&q=${encodeURIComponent(query)}&limit=5`;
  
  const response = await fetch(url, {
    headers: { 'Accept-Language': 'en' }
  });
  
  const data = await response.json();

  return data.map((item) => ({
    name: item.display_name.split(',')[0],
    displayName: item.display_name,
    lat: parseFloat(item.lat),
    lng: parseFloat(item.lon),
  }));
}
```

---

## 📊 ResultScreen Workflow

### Component Structure

```javascript
// File: src/screens/ResultScreen.jsx

export default function ResultScreen({
  routes,
  selectedRoute,
  setSelectedRoute,
  origin,
  destination,
  setCurrentScreen,
}) {
  const [selectedConfidence, setSelectedConfidence] = useState(73);

  if (!selectedRoute) {
    return <EmptyState />;
  }

  const r = selectedRoute;
  
  // Calculate percentiles
  const medianTime = r.durationMinutes;
  const p50Time = medianTime;
  const p73Time = Math.round(medianTime * 1.08);
  const p90Time = Math.round(medianTime * 1.17);
  const p95Time = Math.round(medianTime * 1.22);
  
  const confidenceTimes = { 50: p50Time, 73: p73Time, 90: p90Time, 95: p95Time };
  const selectedTime = confidenceTimes[selectedConfidence];
  
  // Color coding
  const colorClass = scoreColor(r.reliabilityScore);
  const colorHex = scoreColorHex(r.reliabilityScore);

  return (
    <div className="screen-container">
      {/* Top bar */}
      <div className="top-bar">
        <button onClick={() => setCurrentScreen('home')}>←</button>
        <div className="top-bar-center">
          <div className="top-bar-title">Route Analysis</div>
          <div className="top-bar-subtitle">{r.name}</div>
        </div>
        <button onClick={() => setCurrentScreen('compare')}>⇌</button>
      </div>

      {/* Arrival probability card */}
      <div className="card card-accent">
        <div className="arrival-probability">
          <div className="probability-percentage">
            <span className="probability-number">{selectedConfidence}</span>
            <span className="probability-symbol">%</span>
          </div>
          <div className="circular-progress">
            <svg width="70" height="70">
              <circle 
                cx="35" cy="35" r="30" 
                stroke={colorHex}
                strokeDasharray={`${(r.reliabilityScore / 100) * 188.4} 188.4`}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Route comparison */}
      {routes.map((route) => (
        <button 
          key={route.id}
          onClick={() => setSelectedRoute(route)}
          className={`route-card ${route.id === r.id ? 'route-card-selected' : ''}`}
        >
          {/* Route details */}
        </button>
      ))}

      {/* Confidence selector */}
      <div className="confidence-grid">
        {[50, 73, 90, 95].map((conf) => (
          <ConfidenceCard
            key={conf}
            confidence={conf}
            time={confidenceTimes[conf]}
            isSelected={selectedConfidence === conf}
            onClick={() => setSelectedConfidence(conf)}
          />
        ))}
      </div>

      {/* Map */}
      <RouteMap route={r} origin={origin} destination={destination} />
    </div>
  );
}
```

### Helper Functions

```javascript
function scoreColor(score) {
  if (score >= 80) return 'color-green';
  if (score >= 60) return 'color-yellow';
  return 'color-red';
}

function scoreColorHex(score) {
  if (score >= 80) return '#22b573';
  if (score >= 60) return '#ffd84d';
  return '#ff5a5a';
}
```

---

## 🗺️ RouteMap Component Workflow

### Component Logic

```javascript
// File: src/components/RouteMap.jsx

export default function RouteMap({ route, origin, destination }) {
  // Fallback: No route geometry
  if (!route || !route.geometry || !route.geometry.coordinates) {
    const mapUrl = `https://www.google.com/maps/embed/v1/directions?`
      + `key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`
      + `&origin=${origin.lat},${origin.lng}`
      + `&destination=${destination.lat},${destination.lng}`
      + `&mode=driving`;
    
    return <iframe src={mapUrl} className="route-map" />;
  }

  // With route geometry
  const coordinates = route.geometry.coordinates;
  
  // Sample waypoints (max 10 for Google Maps API)
  const step = Math.max(1, Math.floor(coordinates.length / 8));
  const waypoints = coordinates
    .filter((_, i) => i % step === 0)
    .slice(1, -1)
    .slice(0, 10)
    .map(coord => `${coord[1]},${coord[0]}`)
    .join('|');

  const mapUrl = `https://www.google.com/maps/embed/v1/directions?`
    + `key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`
    + `&origin=${origin.lat},${origin.lng}`
    + `&destination=${destination.lat},${destination.lng}`
    + `&waypoints=${waypoints}`
    + `&mode=driving`;

  return <iframe src={mapUrl} className="route-map" />;
}
```

---

## 🔄 CompareScreen Workflow

### Component Logic

```javascript
// File: src/screens/CompareScreen.jsx

export default function CompareScreen({
  routes,
  selectedRoute,
  setSelectedRoute,
  setCurrentScreen,
  origin,
  destination
}) {
  const [filter, setFilter] = useState('reliability');

  if (!routes || routes.length === 0) {
    return <EmptyState />;
  }

  // Sort routes based on filter
  const sorted = [...routes].sort((a, b) => {
    if (filter === 'time') {
      return a.durationMinutes - b.durationMinutes;
    }
    if (filter === 'distance') {
      return parseFloat(a.distanceKm) - parseFloat(b.distanceKm);
    }
    return b.reliabilityScore - a.reliabilityScore; // Default
  });

  return (
    <div className="screen-container">
      {/* Filter chips */}
      <div className="filter-chips">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`filter-chip ${filter === f.key ? 'filter-chip-active' : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Route cards */}
      {sorted.map((route, idx) => (
        <div key={route.id} className="compare-route-card">
          {idx === 0 && <div className="best-badge">★ BEST CHOICE</div>}
          
          {/* Route details */}
          
          <button
            onClick={() => {
              setSelectedRoute(route);
              setCurrentScreen('result');
            }}
            className="use-route-btn"
          >
            Use this route ›
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## 🚨 IncidentScreen Workflow

### Component Logic

```javascript
// File: src/screens/IncidentScreen.jsx

export default function IncidentScreen({ origin }) {
  const [selectedType, setSelectedType] = useState('');
  const [severity, setSeverity] = useState('medium');
  const [duration, setDuration] = useState('30 min');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = selectedType !== '';

  function handleSubmit() {
    if (!canSubmit) return;

    console.log('Submitting:', { 
      selectedType, 
      severity, 
      duration, 
      description 
    });

    setSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setSelectedType('');
      setDescription('');
    }, 3000);
  }

  return (
    <div className="screen-container">
      {submitted && (
        <div className="success-banner">
          ✓ Incident reported! Thanks for helping other commuters.
        </div>
      )}

      {/* Incident type grid */}
      <div className="incident-type-grid">
        {INCIDENT_TYPES.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedType(item.id)}
            className={`incident-type-btn ${
              selectedType === item.id ? 'incident-type-btn-active' : ''
            }`}
          >
            <span className="incident-type-emoji">{item.emoji}</span>
            <span className="incident-type-label">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Severity, duration, description */}

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="submit-incident-btn"
      >
        Submit Report →
      </button>
    </div>
  );
}
```

---

## 🧭 BottomNav Component Workflow

### Component Logic

```javascript
// File: src/components/BottomNav.jsx

const NAV_ITEMS = [
  { id: 'home', icon: '⌂', label: 'Home' },
  { id: 'result', icon: '◈', label: 'Route' },
  { id: 'incident', icon: '⚠', label: 'Report' },
  { id: 'compare', icon: '⇌', label: 'Compare' },
  { id: 'guide', icon: '?', label: 'Guide' },
];

export default function BottomNav({ currentScreen, setCurrentScreen }) {
  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => {
        const isActive = currentScreen === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      main.jsx                           │
│                    (Entry Point)                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                      App.jsx                            │
│                   (Root State)                          │
│                                                         │
│  State:                                                 │
│  • currentScreen                                        │
│  • origin, destination                                  │
│  • routes[], selectedRoute                              │
│  • isLoading, error                                     │
└────┬────────────────┬────────────────┬─────────────────┘
     │                │                │
     ▼                ▼                ▼
┌──────────┐   ┌──────────┐   ┌──────────┐
│HomeScreen│   │ResultScr │   │CompareSc │
│          │   │          │   │          │
│ Contains:│   │ Contains:│   │ Contains:│
│ SearchBar│   │ RouteMap │   │ Filter   │
│ Stats    │   │ Metrics  │   │ RouteList│
└──────────┘   └──────────┘   └──────────┘
     │                │                │
     │                │                │
     └────────────────┴────────────────┘
                      │
                      ▼
              ┌──────────────┐
              │  BottomNav   │
              │ (Navigation) │
              └──────────────┘
```

---

## 🔌 API Integration Flow

### OSRM Route API

```javascript
// Request
GET https://router.project-osrm.org/route/v1/driving/
    {origin.lng},{origin.lat};{destination.lng},{destination.lat}
    ?overview=full&alternatives=true&geometries=geojson

// Response
{
  "code": "Ok",
  "routes": [
    {
      "distance": 15300,        // meters
      "duration": 1500,         // seconds
      "geometry": {
        "coordinates": [
          [-122.4194, 37.7749],
          [-122.4084, 37.7849],
          ...
        ],
        "type": "LineString"
      },
      "legs": [...]
    }
  ]
}
```

### Nominatim Search API

```javascript
// Request
GET https://nominatim.openstreetmap.org/search
    ?format=json
    &q={query}
    &limit=5

// Response
[
  {
    "display_name": "San Francisco, California, United States",
    "lat": "37.7749295",
    "lon": "-122.4194155",
    ...
  }
]
```

---

## 🎨 CSS Architecture

### Variable System

```css
/* File: src/styles/variables.css */

:root {
  /* Colors */
  --color-yellow: #ffd84d;
  --color-cyan: #57cdf4;
  --color-green: #22b573;
  --color-red: #ff5a5a;
  
  /* Spacing */
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  
  /* Border radius */
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}
```

### Component Styles

```css
/* File: src/styles/ResultScreen.css */

.arrival-probability {
  display: flex;
  gap: var(--spacing-lg);
}

.probability-number {
  font-size: 56px;
  color: var(--color-yellow);
  font-family: var(--font-mono);
}
```

---

## ⚡ Performance Optimizations

### 1. Component Memoization
```javascript
// Prevent unnecessary re-renders
const MemoizedRouteMap = React.memo(RouteMap);
```

### 2. Debounced Search
```javascript
// Wait for user to stop typing
const debouncedSearch = debounce(searchLocation, 300);
```

### 3. Lazy Loading
```javascript
// Load screens on demand
const CompareScreen = lazy(() => import('./screens/CompareScreen'));
```

---

## 🐛 Error Handling

### API Error Handling
```javascript
try {
  const response = await fetch(url);
  const data = await response.json();
  
  if (!data.routes || data.routes.length === 0) {
    throw new Error('No routes found');
  }
  
  // Process data
} catch (err) {
  setError('Could not fetch routes. Check your connection.');
  console.error('API Error:', err);
} finally {
  setIsLoading(false);
}
```

### Component Error Boundaries
```javascript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

---

## 🧪 Testing Strategy

### Unit Tests
```javascript
// Test reliability calculation
test('calculateReliabilityScore returns valid score', () => {
  const route = { duration: 1500, distance: 15000 };
  const score = calculateReliabilityScore(route, 0, 9);
  expect(score).toBeGreaterThanOrEqual(45);
  expect(score).toBeLessThanOrEqual(95);
});
```

### Integration Tests
```javascript
// Test route analysis flow
test('analyze route updates state correctly', async () => {
  const { getByText } = render(<App />);
  
  // Enter locations
  fireEvent.change(originInput, { target: { value: 'SF' } });
  fireEvent.change(destInput, { target: { value: 'Oakland' } });
  
  // Click analyze
  fireEvent.click(getByText('Analyze Route'));
  
  // Wait for results
  await waitFor(() => {
    expect(getByText('Route Analysis')).toBeInTheDocument();
  });
});
```

---

## 📦 Build & Deployment

### Build Process
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Build Output
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
```

---

*This document provides a complete technical overview of the PathSure codebase and workflow.*
