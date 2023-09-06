import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles/MoodTrendGraph.scss';

const MoodTrendGraph = ({ moodEntries }) => {
  const [moodCounts, setMoodCounts] = useState([]);

  // Calculate mood counts
  useEffect(() => {
    const counts = [];
    moodEntries.forEach((entry) => {
      const sentiment = entry.sentiment;
      counts.push({ sentiment, count: (counts.find((c) => c.sentiment === sentiment)?.count || 0) + 1 });
    });

    setMoodCounts(counts);
  }, [moodEntries]);

  // Group mood counts by sentiment
  const groupedMoodCounts = moodCounts.reduce((acc, current) => {
    const { sentiment, count } = current;
    if (!acc[sentiment]) {
      acc[sentiment] = [];
    }
    acc[sentiment].push({ sentiment, count });
    return acc;
  }, {});

  const lines = Object.keys(groupedMoodCounts).map((sentiment, index) => (
    <Line
      key={sentiment}
      type="monotone"
      dataKey="count"
      data={groupedMoodCounts[sentiment]}
      name={sentiment}
      stroke={`color${index}`}
    />
  ));

  return (
    <div className="mood-trend">
      <h2>Mood Trend</h2>
      <div className="chart-container">
        <LineChart width={600} height={400} data={moodCounts}>
          <XAxis dataKey="sentiment" />
          <YAxis type="number" tickCount={5} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          {lines}
        </LineChart>
      </div>
    </div>
  );
};

export default MoodTrendGraph;
