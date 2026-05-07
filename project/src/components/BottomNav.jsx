import React from 'react';
import '../styles/BottomNav.css';


function BottomNav({ currentScreen, setCurrentScreen }) {

  const navItems = [
  {id: 'home', icon: '⌂', label: 'Home'},
  {id: 'result', icon: '◈', label: 'Route'},
  {id: 'incident',icon: '⚠', label: 'Report'},
  {id: 'compare',icon: '⇌', label: 'Compare'},
  {id: 'guide', icon: '?', label: 'Guide'},
  ];

  return (
    <nav className="bottom-nav">
      {
        navItems.map((item) => (
          <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`nav-item ${currentScreen === item.id ? 'nav-item-active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
        ))
      }
    </nav>
  );
}

export default BottomNav;


