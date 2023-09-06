// App.js

import React, { useState } from 'react';
import './App.css'; // Import your global styles
import MoodSelection from './components/MoodSelection'
import MoodTracking from './components/MoodTracking';
import MoodTrendGraph from './components/MoodTrendGraph';
import DiaryEntry from './components/DiaryEntry';


function App() {
  const [moodEntries, setMoodEntries] = useState([]);

const handleEntrySubmit = (entry) => {
  setMoodEntries([...moodEntries, entry]);
};

return (
  <div className="App">
    <MoodSelection onEntrySubmit={handleEntrySubmit} />
    <MoodTracking moodEntries={moodEntries} /> {/* Pass moodEntries as a prop */}
    <MoodTrendGraph moodEntries={moodEntries} />
    {moodEntries.map((entry, index) => (
        <DiaryEntry
          key={index}
          mood={entry.sentiment}
          date={new Date(entry.date)}
          text={entry.text}
        />
      ))}
    {/* Add other components and features here */}
  </div>
);

}

export default App;
