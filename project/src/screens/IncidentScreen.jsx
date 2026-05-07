import React, {useState} from 'react'
import SearchBar from '../components/SearchBar';
import '../styles/IncidentScreen.css';

function IncidentScreen() {

  const incidents = [
    { id: 'accident', emoji: '🚗', label: 'Accident' },
    { id: 'jam', emoji: '🚦', label: 'Traffic Jam' },
    { id: 'roadblock', emoji: '🚧', label: 'Roadblock' },
    { id: 'construction', emoji: '👷', label: 'Construction' },
    { id: 'weather', emoji: '🌧', label: 'Weather' },
    { id: 'emergency', emoji: '🚨', label: 'Emergency' },
  ]

  const severities = [
    { id: 'low', color: '#22b573', label: 'Low' },
    { id: 'medium', color: '#ffd84d', label: 'Medium' },
    { id: 'high', color: '#ff5a5a', label: 'High' },
  ]

  const durations = ['15 min', '30 min', '1 Hour', '2 Hours', 'More than 2 Hours'];

  const [location ,setLocation] = useState(null);
  const [selectedType ,setSelectedType] = useState('');
  const [severity, setSeverity] = useState('medium');
  const [duration,setDuration] = useState('30 min');
  const [description , setDescription] = useState('');
  const [submitted,setSubmitted] = useState(false);

  const canSubmit = (location && selectedType !== '' && severity && duration);

  //function handlesubmit 
  function handleSubmit() {
    if (!canSubmit) {
      return
    };

    const payload = {
      location,
      selectedType,
      severity,
      duration,
      description,
    };

    console.log('Submitting:', payload);

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setSelectedType('');
      setDescription('');
    }, 5000);
  }

  return (
    <div className="screen-container">

      <div className="incident-header">
        <div className="incident-icon">⚠</div>
        <div>
          <div className="incident-title">Report Incident</div>
          <div className="incident-subtitle">Crowdsource live update</div>
        </div>
      </div>

      {
        submitted && <div className="success-banner">
                        ✓ Incident reported! Thanks for helping other commuters.
                     </div>
      }

      <div className="incident-section">
        <div className="incident-section-title">Incident Location</div>
        <SearchBar
          label="Location"
          placeholder="Enter incident location..."
          value={location}
          onSelect={setLocation}
          dotColor="#57cdf4"
        />
      </div>

      <div className="incident-section">
        <div className="incident-section-title">Incident Type</div>
        <div className="incident-type-grid">
          {
            incidents.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedType(item.id)}
                className={`incident-type-btn ${selectedType === item.id ? 'incident-type-btn-active' : ''}`}
              >
                <span className="incident-type-emoji">{item.emoji}</span>
                <span className={`incident-type-label ${selectedType === item.id ? 'incident-type-label-active' : ''}`}>
                  {item.label}
                </span>
              </button>
            ))
          }
        </div>
      </div>

      <div className="incident-section">
        <div className="incident-section-title">Severity</div>
        <div className="severity-row">
          {
            severities.map((s) => (
              <button
                key={s.id}
                onClick={() => setSeverity(s.id)}
                className={`severity-btn ${severity === s.id ? 'severity-btn-active' : ''}`}
              >
                {s.label}
              </button>
            ))
          }
        </div>
      </div>

      <div className="incident-section">
        <div className="incident-section-title">Estimated Duration</div>
        <div className="severity-row" style={{ flexWrap: 'wrap', gap: '6px' }}>
          {durations.map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`severity-btn ${duration === d ? 'severity-btn-active' : ''}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="incident-section">
        <div className="incident-section-title">Description (optional)</div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the incident…"
          rows={3}
          className="search-input"
          style={{ resize: 'none', minHeight: '80px' }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`submit-incident-btn ${!canSubmit ? 'submit-incident-btn-disabled' : ''}`}
      >
        Submit Report →
      </button>


    </div>
  )
}

export default IncidentScreen
