import { useState } from 'react'
import ResultScreen from './screens/ResultScreen'
import CompareScreen from './screens/CompareScreen'

export default function App() {

  const [currentScreen,setCurrentScreen] = useState('result')

  const [origin,setOrigin] = useState(null)

  const [destination,setDestination] = useState(null)

  const [routes,setRoutes] = useState([])

  const [selectedRoute,setSelectedRoute] = useState(null)

  const [isLoading,setIsLoading] = useState(false)

  const [error,setError] = useState(null)

  function renderScreen() {
    const props = {origin, setOrigin, destination, setDestination, routes, setRoutes, selectedRoute, setSelectedRoute, isLoading, setIsLoading, error, setError, setCurrentScreen}

    if (currentScreen === 'result') return <ResultScreen {...props} />;
    if (currentScreen === 'compare') return <CompareScreen {...props} />;
  }

  return (
    <div className="app-shell">
      <div className="phone" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="screen-scroll" style={{ flex: 1, overflowY: 'auto' }}>
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}
