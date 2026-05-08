import '../styles/RouteMap.css';

export default function RouteMap({ route, origin, destination }) {

  if (!route || !route.geometry || !route.geometry.coordinates) {

    const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&mode=driving`;
    
    return (
      <iframe title="Route map" src={mapUrl} className="route-map" allowFullScreen loading="lazy"/>
    )

  }

  const coordinates = route.geometry.coordinates
  
  const step = Math.max(1, Math.floor(coordinates.length / 8))
  
  const waypoints = coordinates
    .filter((_, i) => i % step === 0)
    .slice(1, -1) 
    .slice(0, 10) 
    .map(coord => `${coord[1]},${coord[0]}`)
    .join('|')

  const mapUrl = waypoints ? `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&waypoints=${waypoints}&mode=driving` : `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&mode=driving`

  return (
    <iframe title="Route map" src={mapUrl} className="route-map" allowFullScreen loading="lazy"/>
  )
  
}
