# PathSure - User Workflow Documentation

## Complete User Journey from Start to Finish

---

## 🚀 Application Launch

### Step 1: Initial Load
**Screen:** HomeScreen

**What User Sees:**
- PathSure logo and branding
- "Where are you going?" subtitle
- Live status badge (green dot)
- Two search input fields (Origin & Destination)
- Current time display
- Network status dashboard
- Hourly reliability chart

**User Actions Available:**
- Enter origin location
- Enter destination location
- View live network statistics
- Check hourly reliability trends

---

## 📍 Step 2: Enter Origin Location

### User Interaction:
1. **Click** on "Origin" search field
2. **Type** starting location (e.g., "San Francisco")

### System Response:
- Search field activates (yellow border)
- After 3+ characters, autocomplete dropdown appears
- Loading indicator shows "···" while searching
- Nominatim API fetches location suggestions

### Dropdown Display:
```
📍 San Francisco
   San Francisco, California, United States

📍 San Francisco International Airport
   San Francisco, California, United States

📍 San Francisco Bay
   California, United States
```

### User Selection:
- **Click** on desired location from dropdown
- Selected location displays with cyan dot indicator
- Dropdown closes automatically

---

## 🎯 Step 3: Enter Destination Location

### User Interaction:
1. **Click** on "Destination" search field
2. **Type** destination (e.g., "Oakland")

### System Response:
- Same autocomplete behavior as origin
- Yellow dot indicator for destination
- Suggestions appear in dropdown

### Alternative Action - Swap Locations:
- **Click** swap button (⇅) between fields
- Origin and destination instantly switch places
- Useful for return trips

---

## ⚡ Step 4: Analyze Route

### Trigger:
**Click** "⟳ Analyze Route" button

### Button States:
- **Disabled:** Gray, when origin or destination missing
- **Enabled:** Yellow, when both locations selected
- **Loading:** Shows "⟳ Analyzing..." with spinner

### System Processing:
1. **Loading overlay appears** with spinner
2. **API Call to OSRM:**
   - Sends origin coordinates (lat, lng)
   - Sends destination coordinates (lat, lng)
   - Requests multiple route alternatives
   - Requests full route geometry

3. **Reliability Calculation:**
   - Analyzes route duration
   - Considers current time (rush hour detection)
   - Calculates complexity (turns, distance)
   - Generates reliability score (45-95)

4. **Data Processing:**
   - Formats route data
   - Calculates percentiles (P50, P73, P90, P95)
   - Prepares map waypoints

### Loading Time:
- Typical: 1-3 seconds
- Message: "Analyzing Routes…"
- Submessage: "Fetching live traffic data…"

---

## 📊 Step 5: View Results

### Screen Transition:
**HomeScreen → ResultScreen**

### ResultScreen Layout:

#### Top Bar:
- **← Back button** (returns to HomeScreen)
- **Route Analysis** title
- **Route name** subtitle (e.g., "Fastest Route")
- **⇌ Compare button** (opens CompareScreen)

#### Main Content:

**1. Arrival Probability Card (Yellow border)**
```
┌─────────────────────────────────────┐
│ ARRIVAL PROBABILITY                 │
│                                     │
│  73%        [Circular Progress: 85] │
│             REL                     │
│                                     │
│ chance of arriving within 27 min   │
│ median 25m · P95 32m · worst 35m   │
│                                     │
│ [Distribution Bar with marker]      │
│ + 0%        + 73%         100%     │
└─────────────────────────────────────┘
```

**2. Compare Routes Section**
```
COMPARE ROUTES                    2 OPTIONS

┌─────────────────────────────────────┐
│ Route A · Direct        ★ BEST      │
│ ⏱ 25 min  🛣 15.3 km               │
│                              85     │
│                             HIGH    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Route B · Alternative               │
│ ⏱ 28 min  🛣 17.2 km  ⚠ 1         │
│                              78     │
│                           MODERATE  │
└─────────────────────────────────────┘
```

**3. Adjust Confidence Target**
```
┌────┬────┬────┬────┐
│P50 │P73 │P90 │P95 │
│25m │27m │30m │32m │
│50% │73% │90% │95% │
└────┴────┴────┴────┘
```

**4. Metrics Grid**
```
┌──────────────┬──────────────┐
│ RELIABILITY  │ UNCERTAINTY  │
│    85/100    │    ±4 min    │
│   σ = 0.12   │ NORMAL       │
│   HIGH       │              │
├──────────────┼──────────────┤
│ MEDIAN ETA   │  DISTANCE    │
│   25 min     │   15.3 km    │
│ P50 baseline │ total route  │
└──────────────┴──────────────┘
```

**5. Map Preview**
- Google Maps embed showing route
- Origin and destination markers
- Route path visualization

**6. Start Navigation Button**
```
┌─────────────────────────────────────┐
│      🗺 Start Navigation            │
└─────────────────────────────────────┘
```

### User Actions Available:
- Select different route (Route A or B)
- Change confidence level (P50, P73, P90, P95)
- View map
- Start navigation (opens Google Maps)
- Go back to search
- Compare routes

---

## 🔄 Step 6: Compare Routes (Optional)

### Trigger:
**Click** "⇌" button in top bar

### Screen Transition:
**ResultScreen → CompareScreen**

### CompareScreen Layout:

#### Header:
- **← Back button** (returns to ResultScreen)
- **Compare routes** title
- Route summary (e.g., "2 options · SF → Oakland")

#### Filter Chips:
```
┌──────────────┬──────────┬────────────┐
│ By reliability│ By time │ By distance│
└──────────────┴──────────┴────────────┘
```

#### Route Cards (Detailed):
```
┌─────────────────────────────────────┐
│ ★ BEST CHOICE                       │
│                                     │
│ Fastest Route              ⭕ 85   │
│ 15.3 km · 25 min           SCORE   │
│                                     │
│ ┌─────────┬─────────┬─────────┐   │
│ │DURATION │DISTANCE │ SCORE   │   │
│ │  25m    │ 15.3km  │   85    │   │
│ └─────────┴─────────┴─────────┘   │
│                                     │
│ [Currently selected ✓]              │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Alternative 1              ⭕ 78    │
│ 17.2 km · 28 min           SCORE   │
│                                     │
│ ┌─────────┬─────────┬─────────┐   │
│ │DURATION │DISTANCE │ SCORE   │   │
│ │  28m    │ 17.2km  │   78    │   │
│ └─────────┴─────────┴─────────┘   │
│                                     │
│ [Use this route ›]                  │
└─────────────────────────────────────┘
```

### User Actions:
- **Filter routes** by reliability, time, or distance
- **Select different route** (click "Use this route")
- **View detailed stats** for each route
- **Return to ResultScreen** with selected route

---

## 🚨 Step 7: Report Incident (Optional)

### Trigger:
**Click** "Report" icon in bottom navigation

### Screen Transition:
**Any Screen → IncidentScreen**

### IncidentScreen Layout:

#### Header:
```
⚠ Report Incident
  Crowdsource live update
```

#### Form Sections:

**1. Incident Location**
```
┌─────────────────────────────────────┐
│ INCIDENT LOCATION                   │
│ 📍 San Francisco, California        │
└─────────────────────────────────────┘
```

**2. Incident Type (Select One)**
```
┌─────┬─────┬─────┐
│ 🚗  │ 🚦  │ 🚧  │
│ACCID│ JAM │BLOCK│
├─────┼─────┼─────┤
│ 👷  │ 🌧  │ 🚨  │
│CONST│WEATH│EMERG│
└─────┴─────┴─────┘
```

**3. Severity Level**
```
┌──────┬────────┬──────┐
│ Low  │ Medium │ High │
└──────┴────────┴──────┘
```

**4. Estimated Duration**
```
┌──────┬──────┬───────┬────────┬─────────┐
│15 min│30 min│ 1 Hour│ 2 Hours│ Ongoing │
└──────┴──────┴───────┴────────┴─────────┘
```

**5. Description (Optional)**
```
┌─────────────────────────────────────┐
│ Brief description of the incident…  │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

**6. Submit Button**
```
┌─────────────────────────────────────┐
│      Submit Report →                │
└─────────────────────────────────────┘
```

### Submission Flow:
1. User fills form
2. **Click** "Submit Report"
3. **Success message appears:**
   ```
   ✓ Incident reported! Thanks for helping other commuters.
   ```
4. Form resets after 3 seconds
5. User can report another incident or navigate away

---

## ❓ Step 8: View Guide (Optional)

### Trigger:
**Click** "Guide" icon in bottom navigation

### Screen Transition:
**Any Screen → GuideScreen**

### GuideScreen Layout:

#### Header:
```
? How PathSure Works
  Understanding route reliability
```

#### Content Sections:

**1. GPS vs PathSure Comparison**
```
┌──────────────────┬──────────────────┐
│ Traditional GPS  │    PathSure      │
├──────────────────┼──────────────────┤
│ ❌ Single ETA    │ ✓ Probability    │
│ ❌ No uncertainty│ ✓ Reliability    │
│ ❌ Ignores       │ ✓ Real-time      │
│    variance      │   crowdsourcing  │
└──────────────────┴──────────────────┘
```

**2. How It Works (4 Steps)**
```
🗺 1. Enter route
   Type your origin and destination

⚡ 2. Analyze
   We compute reliability scores using live data

📊 3. Choose confidence
   Pick P50, P73, P90, or P95

🚗 4. Navigate
   Start your trip with confidence
```

**3. FAQ (Expandable)**
```
┌─────────────────────────────────────┐
│ What is a reliability score?     ▼ │
├─────────────────────────────────────┤
│ A 0–100 metric that reflects how   │
│ predictable a route is...          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ What does P73 mean?              ▼ │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ How is this different from         │
│ Google Maps?                      ▼ │
└─────────────────────────────────────┘
```

### User Actions:
- **Read guide content**
- **Expand/collapse FAQ items** (click question)
- **Navigate back** to other screens

---

## 🧭 Step 9: Navigation Bar (Always Available)

### Bottom Navigation:
```
┌──────┬──────┬──────┬──────┬──────┐
│  ⌂   │  ◈   │  ⚠   │  ⇌   │  ?   │
│ Home │Route │Report│Compar│Guide │
└──────┴──────┴──────┴──────┴──────┘
```

### Navigation Flow:
- **Home (⌂):** Returns to search screen
- **Route (◈):** Shows current route results
- **Report (⚠):** Opens incident reporting
- **Compare (⇌):** Opens route comparison
- **Guide (?):** Opens help/guide

### Active State:
- Current screen icon highlighted in yellow
- Other icons in muted gray

---

## 🔄 Complete User Flow Diagram

```
┌─────────────┐
│   START     │
│  (Launch)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ HomeScreen  │◄─────────────┐
│             │              │
│ • Enter     │              │
│   Origin    │              │
│ • Enter     │              │
│   Dest      │              │
│ • Analyze   │              │
└──────┬──────┘              │
       │                     │
       │ Click Analyze       │
       ▼                     │
┌─────────────┐              │
│  Loading    │              │
│  Spinner    │              │
└──────┬──────┘              │
       │                     │
       │ API Response        │
       ▼                     │
┌─────────────┐              │
│ResultScreen │              │
│             │              │
│ • View      │              │
│   Results   │              │
│ • Select    │              │
│   Route     │              │
│ • Adjust    │              │
│   Confidence│              │
└──────┬──────┘              │
       │                     │
       ├─────────────────────┘
       │     Back Button
       │
       ├──────────────┐
       │              │
       ▼              ▼
┌─────────────┐ ┌─────────────┐
│CompareScreen│ │IncidentScr  │
│             │ │             │
│ • Filter    │ │ • Report    │
│ • Compare   │ │   Incident  │
│ • Select    │ │ • Submit    │
└─────────────┘ └─────────────┘
       │              │
       └──────┬───────┘
              │
              ▼
       ┌─────────────┐
       │ GuideScreen │
       │             │
       │ • Learn     │
       │ • FAQ       │
       └─────────────┘
              │
              │ Bottom Nav
              │ (Always Available)
              │
       ┌──────┴──────┐
       │             │
       ▼             ▼
    [Any Screen Navigation]
```

---

## ⚙️ Technical Workflow

### State Management Flow:
```
App.jsx (Root State)
    │
    ├─ origin
    ├─ destination
    ├─ routes[]
    ├─ selectedRoute
    ├─ isLoading
    ├─ error
    └─ currentScreen
         │
         ├─ Props passed to screens
         │
         └─ Screens update state via setters
```

### API Call Sequence:
```
1. User clicks "Analyze"
   ↓
2. setIsLoading(true)
   ↓
3. Fetch OSRM API
   ↓
4. Process response
   ↓
5. Calculate reliability
   ↓
6. setRoutes(results)
   ↓
7. setSelectedRoute(results[0])
   ↓
8. setCurrentScreen('result')
   ↓
9. setIsLoading(false)
```

---

## 🎯 Key User Scenarios

### Scenario 1: Quick Route Check
1. Open app
2. Enter origin
3. Enter destination
4. Click analyze
5. View reliability score
6. Start navigation
**Time:** ~30 seconds

### Scenario 2: Compare Multiple Routes
1. Complete Scenario 1
2. Click compare button
3. Review alternatives
4. Select better route
5. Return to results
6. Start navigation
**Time:** ~1 minute

### Scenario 3: Report Traffic Incident
1. Navigate to Report screen
2. Select incident type
3. Choose severity
4. Add description
5. Submit report
**Time:** ~45 seconds

### Scenario 4: Learn About App
1. Navigate to Guide screen
2. Read how it works
3. Expand FAQ items
4. Return to home
**Time:** ~2 minutes

---

## 📱 User Experience Highlights

### Visual Feedback:
- ✅ Loading spinners during API calls
- ✅ Button state changes (disabled/enabled)
- ✅ Active navigation highlighting
- ✅ Success messages after actions
- ✅ Error banners for failures

### Smooth Transitions:
- ✅ Screen changes are instant
- ✅ No page reloads
- ✅ State persists across navigation
- ✅ Back button maintains context

### Accessibility:
- ✅ Clear labels and instructions
- ✅ High contrast colors
- ✅ Large touch targets
- ✅ Readable font sizes

---

*This workflow represents the complete user journey through the PathSure application.*
