import React, { useState, useEffect } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ label, placeholder, value, onSelect, dotColor = '#ffd84d' }) {

  const [query,setQuery] = useState(value?.name || '');
  const [suggestions,setSuggestions] = useState([]);
  const [loading,setLoading] = useState(false);
  const [focused,setFocused] = useState(false);

  async function searchLocation(query) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`;
    const response = await fetch(url);
    const data = await response.json();

    return data.map((item) => ({
      name:        item.display_name.split(',')[0],
      displayName: item.display_name,
      lat:         parseFloat(item.lat),
      lng:         parseFloat(item.lon),
    }));
  }

  
  useEffect(() => {
    setQuery(value?.name || '');
  }, [value]);

  
  async function handleChange(e) {
    const q = e.target.value;
    setQuery(q);                    

    if (!q) {
      onSelect(null);               
      setSuggestions([]);
      return;
    }

    
    if (q.length < 3) return;

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

  function handleSelect(suggestion) {
    setQuery(suggestion.name);
    setSuggestions([]);
    setFocused(false);
    onSelect(suggestion);           
  }

  function handleClear() {
    setQuery('');
    setSuggestions([]);
    onSelect(null);
  }

  const showDropdown = focused && (suggestions.length > 0 || loading);
  
  const dotColorClass = dotColor === '#57cdf4' ? 'bg-cyan' : 'bg-yellow';

  return (
    <div className="search-wrapper">
      
      <div className="search-label">
        <span className={`search-dot ${dotColorClass}`} />
        {label}
      </div>

      
      <div className="search-input-wrapper">
        <input
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          autoComplete="off"
          className="search-input"
        />

        
        {loading && (
          <span className="search-loading">···</span>
        )}
        {!loading && query && (
          <button onClick={handleClear} className="search-clear-btn">✕</button>
        )}
      </div>

      
      {showDropdown && (
        <div className="search-results">
          {loading && suggestions.length === 0 && (
            <div className="search-result-item">Searching…</div>
          )}
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSelect(s)}
              className="search-result-item"
            >
              <div className="search-result-flex">
                <span className="search-result-icon">📍</span>
                <div className="search-result-content">
                  <div className="search-result-name">{s.name}</div>
                  <div className="search-result-address">
                    {s.displayName.split(',').slice(1, 3).join(',')}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;