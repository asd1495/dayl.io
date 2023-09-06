import React, { useState } from 'react';
import DiaryEntry from './DiaryEntry'; // Import the DiaryEntry component
import '../styles/MoodSelection.scss'; // Import the SCSS stylesheet

const MoodSelection = ({ onEntrySubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');
  const [entryText, setEntryText] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

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
      setSelectedDate(parsedDate); // Set the Date object
    }
  };

  const handleSubmit = () => {
    // Create an entry object with mood, date, and text
    const entry = {
      sentiment: selectedMood,
      date: selectedDate.toISOString(), // Convert Date to ISO string
      text: entryText,
    };

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
                value={selectedDate.toISOString().split('T')[0]} // Format Date to "YYYY-MM-DD"
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
        />
      )}
    </div>
  );
};

export default MoodSelection;
