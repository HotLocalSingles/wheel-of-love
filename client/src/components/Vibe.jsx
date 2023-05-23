import React, { useState } from 'react';
import axios from 'axios';

const Vibe = ({ bio }) => {
  const [vibe, setVibe] = useState(null);

  const vibeCalculator = (data) => {
    const {emotion_scores} = data;
    const max = Math.max(...Object.values(emotion_scores));
    for (const score in emotion_scores) {
      if (emotion_scores[score] === max) {
        return score;
      }
    }
  };

  const handleGetVibeClick = () => {
    axios.post('/api/vibe', { bio })
      .then(response => {
        const { data } = response;
        const emotion = vibeCalculator(data);
        setVibe(emotion);
      })
      .catch(err => {
        console.error('Failed to POST vibe to API', err);
      });
  };

  return (
    <>
      <h1>Vibe Rating: { vibe }</h1>
      <button onClick={handleGetVibeClick}>Rate My Vibe</button>
    </>
  );
};

export default Vibe;
