// MoodTracking.js
import React from 'react';
import DiaryEntry from './DiaryEntry'; // Import the DiaryEntry component

const MoodTracking = ({ moodEntries }) => {
  return (
    <div className="mood-tracking">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Mood</th>
            <th>Diary Entry</th>
          </tr>
        </thead>
        <tbody>
          {moodEntries.map((entry, index) => (
            <DiaryEntry
              key={index}
              date={entry.date}
              mood={entry.sentiment}
              diaryEntry={entry.text}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoodTracking;
