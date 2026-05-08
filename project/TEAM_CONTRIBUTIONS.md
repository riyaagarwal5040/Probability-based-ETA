# PathSure - Team Contributions

## Project Overview
**PathSure** is a probability-based ETA (Estimated Time of Arrival) application that provides route reliability scores and travel time predictions using real-time traffic data.

---

## Team Members & Contributions

### 👤 **Rahil Paliwal**
**Role:** Frontend Developer - Core Routing & Analysis

#### Components Developed:
1. **ResultScreen** (`ResultScreen.jsx` + CSS)
   - Route analysis display with reliability scores
   - Arrival probability visualization (P50, P73, P90, P95)
   - Circular progress indicators
   - Distribution bar with percentile markers
   - Confidence level selection grid
   - Metrics dashboard (reliability, uncertainty, median ETA, distance)
   - Integration with Google Maps for navigation

2. **CompareScreen** (`CompareScreen.jsx` + CSS)
   - Multi-route comparison interface
   - Filter system (by reliability, time, distance)
   - Route cards with score visualization
   - Best route highlighting
   - Detailed statistics per route
   - Route selection and navigation

3. **RouteMap Component** (`RouteMap.jsx` + CSS)
   - Google Maps embed integration
   - Dynamic waypoint generation
   - Route geometry visualization
   - Fallback handling for missing route data

#### Core Files:
- **App.jsx** - Main application structure and state management
- **main.jsx** - Application entry point and CSS imports
- **variables.css** - CSS custom properties (colors, spacing, typography)

#### Technical Contributions:
- State management architecture
- Screen navigation logic
- Route data structure design
- CSS variable system setup
- Component integration

**Lines of Code:** ~1,200 lines
**Files Created:** 9 files

---

### 👤 **Teammate 1**
**Role:** Frontend Developer - User Input & Reporting

#### Components Developed:
1. **HomeScreen** (`HomeScreen.jsx` + CSS)
   - Main search interface
   - Origin/destination input with autocomplete
   - Swap location functionality
   - Live clock display
   - Network status dashboard
   - Hourly reliability chart
   - Route analysis trigger
   - Loading state management

2. **IncidentScreen** (`IncidentScreen.jsx` + CSS)
   - Traffic incident reporting interface
   - Incident type selection (accident, jam, roadblock, etc.)
   - Severity level picker
   - Duration estimation
   - Location display
   - Form validation
   - Success feedback

3. **SearchBar Component** (`SearchBar.jsx` + CSS)
   - Location search with Nominatim API
   - Autocomplete dropdown
   - Search result display
   - Selected location indicator
   - Loading states
   - Clear functionality

#### Technical Contributions:
- OpenStreetMap Nominatim API integration
- OSRM routing API integration
- Real-time clock implementation
- Form state management
- API error handling

**Lines of Code:** ~900 lines
**Files Created:** 6 files

---

### 👤 **Teammate 2**
**Role:** Frontend Developer - Navigation & User Guidance

#### Components Developed:
1. **BottomNav Component** (`BottomNav.jsx` + CSS)
   - Fixed bottom navigation bar
   - 5 navigation items (Home, Route, Report, Compare, Guide)
   - Active state highlighting
   - Icon and label display
   - Screen switching logic

2. **LoadingSpinner Component** (`LoadingSpinner.jsx` + CSS)
   - Animated loading indicator
   - Custom loading messages
   - Overlay background
   - CSS animation implementation
   - Reusable across screens

3. **GuideScreen** (`GuideScreen.jsx` + CSS)
   - How-to guide interface
   - GPS vs PathSure comparison
   - Step-by-step instructions
   - FAQ accordion
   - Expandable/collapsible sections
   - Educational content display

#### Technical Contributions:
- Navigation system architecture
- Loading state UX
- User education content
- Accordion component logic
- Responsive design patterns

**Lines of Code:** ~700 lines
**Files Created:** 6 files

---

## Shared Responsibilities

### **app.css**
- Shared component styles
- Layout utilities
- Common UI patterns
- Responsive design rules

### **Code Reviews**
- All team members participated in code reviews
- Cross-component integration testing
- CSS consistency checks

---

## Technology Stack

### Frontend:
- **React** - UI framework
- **Vite** - Build tool
- **CSS3** - Styling with custom properties

### APIs:
- **OSRM** - Route calculation
- **Nominatim** - Location search
- **Google Maps Embed** - Map visualization

### Tools:
- **Git/GitHub** - Version control
- **VS Code** - Development environment
- **npm** - Package management

---

## Project Statistics

| Metric | Value |
|--------|-------|
| Total Components | 9 |
| Total Screens | 5 |
| Total CSS Files | 11 |
| Total Lines of Code | ~2,800 |
| Git Commits | 15+ |
| Development Time | 2 weeks |

---

## Key Features Implemented

✅ Real-time route analysis
✅ Probability-based ETA predictions
✅ Multi-route comparison
✅ Interactive map integration
✅ Traffic incident reporting
✅ Location search with autocomplete
✅ Responsive mobile-first design
✅ Dark theme UI
✅ Live traffic status
✅ User guidance system

---

## Git Workflow

- **Branch:** `rahil`
- **Repository:** `riyaagarwal5040/Probability-based-ETA`
- **Collaboration:** Feature-based commits
- **Code Style:** Consistent formatting and naming conventions

---

## Future Enhancements

- [ ] Real-time traffic data integration
- [ ] Historical route analysis
- [ ] Weather impact modeling
- [ ] User authentication
- [ ] Saved routes/favorites
- [ ] Push notifications
- [ ] Offline mode

---

*Last Updated: May 7, 2026*
