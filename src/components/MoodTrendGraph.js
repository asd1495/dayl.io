import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles/MoodTrendGraph.scss';

const MoodTrendGraph = ({ moodEntries }) => {
  const [moodCounts, setMoodCounts] = useState([]);

  useEffect(() => {
    const counts = {
      '😔': 0, // Triste
      '😐': 0, // Neutral
      '🙂': 0, // Feliz
      '😀': 0, // Muy Feliz
    };

    moodEntries.forEach((entry) => {
      const sentiment = entry.sentiment;
      counts[sentiment]++;
    });

    const data = Object.keys(counts).map((sentiment) => ({
      mood: sentiment,
      frequency: counts[sentiment],
    }));

    setMoodCounts(data);
  }, [moodEntries]);

  return (
    <div className="mood-trend">
      <h2>¿Cómo han variado tus emociones?</h2>
      <div className="chart-container">
        <BarChart width={600} height={400} data={moodCounts}>
          <XAxis dataKey="mood" />
          <YAxis allowDecimals={false} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Frecuencia" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default MoodTrendGraph;
