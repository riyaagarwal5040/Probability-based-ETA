# PathSure - Probability-Based Route Reliability System

🚀 **Live Demo:** [https://pathsure-eta.vercel.app](https://pathsure-eta.vercel.app)

## Overview

PathSure is a probability-based ETA application that revolutionizes route planning by providing reliability scores instead of single-point time estimates.

**Traditional GPS:** "Arrive at 3:00 PM"  
**PathSure:** "73% chance of arriving within 27 minutes"

## Key Features

- 📊 **Probability-based ETA** with confidence levels (P50, P73, P90, P95)
- 🗺️ **Multi-route comparison** with reliability scores (45-95)
- ⚠️ **Real-time incident reporting** system
- 🌍 **Interactive map visualization**
- 📱 **Mobile-first responsive design**
- 👥 **Crowdsourced data collection**

## Tech Stack

**Frontend:**
- React.js - Component-based UI framework
- Vite - Fast build tool and dev server
- CSS3 - Modern styling with custom properties

**APIs:**
- OSRM - Route calculation
- Nominatim - Geocoding service
- Google Maps Embed - Map visualization

**Tools:**
- Git & GitHub - Version control
- Vercel - Deployment platform
- npm - Package management

## Project Structure

```
project/
├── src/
│   ├── components/      # Reusable components
│   │   ├── BottomNav.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── RouteMap.jsx
│   │   └── SearchBar.jsx
│   ├── screens/         # Main screens
│   │   ├── HomeScreen.jsx
│   │   ├── ResultScreen.jsx
│   │   ├── CompareScreen.jsx
│   │   ├── IncidentScreen.jsx
│   │   └── GuideScreen.jsx
│   ├── styles/          # CSS files
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── index.html
└── package.json
```

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/riyaagarwal5040/Probability-based-ETA.git

# Navigate to project directory
cd Probability-based-ETA/project

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Team

**Rahil Paliwal** - Ideation & Mathematical Modeling  
**Riya Agarwal** - User Input & API Integration  
**Jahanvi** - Navigation & Architecture

## Project Stats

- 9 Components
- 5 Screens
- 11 CSS Files
- 2,800+ Lines of Code
- 3 API Integrations

## Future Enhancements

- FastAPI backend with PostgreSQL/MongoDB
- AI/ML predictive traffic modeling
- Blockchain for decentralized reporting
- Multi-modal transportation support
- Weather integration
- Voice navigation

## License

This project is part of an academic assignment.

---

**Live Application:** [https://pathsure-eta.vercel.app](https://pathsure-eta.vercel.app)
