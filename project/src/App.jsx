import React, { useState, useEffect } from 'react'
import BottomNav from './components/BottomNav'
import HomeScreen from './screens/HomeScreen'
import ResultScreen from './screens/ResultScreen'
import IncidentScreen from './screens/IncidentScreen'
import CompareScreen from './screens/CompareScreen'
import GuideScreen from './screens/GuideScreen'

export default function PathSureApp() {

  const [currentScreen,setCurrentScreen] = useState('home')

  const [origin,setOrigin] = useState(null)

  const [destination,setDestination] = useState(null)

  const [routes,setRoutes] = useState([])

  const [selectedRoute,setSelectedRoute] = useState(null)

  const [isLoading,setIsLoading] = useState(false)

  const [error,setError] = useState(null)


  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  function renderScreen() {
    const props = {
      origin, setOrigin,
      destination, setDestination,
      routes, setRoutes,
      selectedRoute, setSelectedRoute,
      isLoading, setIsLoading,
      error, setError,
      setCurrentScreen,
      theme, toggleTheme,
    };

    if (currentScreen === 'home')     return <HomeScreen     {...props} />;
    if (currentScreen === 'result')   return <ResultScreen   {...props} />;
    if (currentScreen === 'incident') return <IncidentScreen {...props} />;
    if (currentScreen === 'compare')  return <CompareScreen  {...props} />;
    if (currentScreen === 'guide')    return <GuideScreen />;
    return <HomeScreen {...props} />;
  }

  return (
    <div className="app-shell">
      <div className="phone" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="screen-scroll" style={{ flex: 1, overflowY: 'auto' }}>
          {renderScreen()}
        </div>

        <BottomNav
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
      </div>
    </div>
  );
}