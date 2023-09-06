import React from 'react';
import '../styles/DiaryEntry.scss'

const DiaryEntry = ({ mood, date, text }) => {
  return (
    <div className="diary-entry">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Mood</th>
            <th>Diary Entry</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{date.toISOString().split('T')[0]}</td>
            <td>{mood}</td>
            <td>{text}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DiaryEntry;
