import React, { useState } from 'react';
import DiaryEntry from './DiaryEntry';
import '../styles/MoodSelection.scss';

const MoodSelection = ({ onEntrySubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');
  const [entryText, setEntryText] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [analysis, setAnalysis] = useState(''); // State to store analysis

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMoodChange = (event) => {
    setSelectedMood(event.target.value);
  };

  const handleEntryTextChange = (event) => {
    setEntryText(event.target.value);
  };

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    const parsedDate = new Date(inputDate);

    if (!isNaN(parsedDate.getTime())) {
      setSelectedDate(parsedDate);
    }
  };

  const handleSubmit = async () => {
    // Create an entry object with mood, date, and text
    const entry = {
      sentiment: selectedMood,
      date: selectedDate.toISOString(),
      text: entryText,
    };

    // Send the entry text to the backend for analysis
    try {
      const response = await fetch('/analyzeSentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textToAnalyze: entryText }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data.sentimentAnalysis); // Set the analysis result
      } else {
        console.error('Failed to fetch analysis');
      }
    } catch (error) {
      console.error('An error occurred while fetching analysis', error);
    }

    // Call the onEntrySubmit callback to pass the entry data to the parent component
    onEntrySubmit(entry);

    // Close the modal and reset the form
    closeModal();
    setSelectedMood('');
    setEntryText('');
    setSelectedDate(new Date());
  };

  return (
    <div className="mood-selector">
      <h1>Hola ¿cómo ha estado tu día?</h1>
      <button onClick={openModal}>Agregar entrada</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Selecciona tu estado de ánimo</h2>
            <select value={selectedMood} onChange={handleMoodChange}>
              <option value="😔">😔 Triste</option>
              <option value="😐">😐 Neutral</option>
              <option value="🙂">🙂 Feliz</option>
              <option value="😀">😀 Muy Feliz</option>
            </select>

            <div>
              <label htmlFor="datePicker">Fecha:</label>
              <input
                type="date"
                id="datePicker"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
              />
            </div>

            <textarea
              placeholder="Cuéntame"
              value={entryText}
              onChange={handleEntryTextChange}
            ></textarea>
            <button onClick={handleSubmit}>Enviar</button>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Pass the selected mood, date, and entry text to DiaryEntry */}
      {selectedMood && (
        <DiaryEntry
          mood={selectedMood}
          date={selectedDate}
          text={entryText}
          analysis={analysis} // Pass the analysis result
        />
      )}
    </div>
  );
};

export default MoodSelection;
