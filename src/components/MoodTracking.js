// MoodTracking.js
import React from 'react';
import '../styles/MoodTracking.scss';

const MoodTracking = ({ moodEntries }) => {
  return (
    <div className="mood-tracking">
      {moodEntries.map((entry, index) => (
        <div key={index} className="mood-entry">
          <div className={`mood-emoji ${entry.sentiment}`}>{entry.sentiment}</div>
          <div className="mood-date">{entry.date}</div>
        </div>
      ))}
    </div>
  );
};

export default MoodTracking;
