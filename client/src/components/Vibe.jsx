import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vibe = ({ bio, dbVibe }) => {
  const [vibe, setVibe] = useState(dbVibe);
  useEffect(() => {
    updateVibe();
  }, [bio]);

  const vibeCalculator = (data) => {
    const {emotion_scores} = data;
    const max = Math.max(...Object.values(emotion_scores));
    for (const score in emotion_scores) {
      if (emotion_scores[score] === max) {
        return score;
      }
    }
  };

  const updateVibe = () => {
    axios.post('/api/vibe', { bio })
      .then(response => {
        const { data } = response;
        const emotion = vibeCalculator(data);
        let emoToVibe;
        switch (emotion) {
        case 'anger':
          emoToVibe = 'Metal';
          break;
        case 'joy':
          emoToVibe = 'Hyperpop';
          break;
        case 'surprise':
          emoToVibe = 'Industrial';
          break;
        case 'sadness':
          emoToVibe = 'Dreampop';
          break;
        case 'disgust':
          emoToVibe = 'Electroclash';
          break;
        case 'fear':
          emoToVibe = 'Breakcore';
          break;
        }
        setVibe(emoToVibe);
      })
      .catch(err => {
        console.error('Failed to POST vibe to API', err);
      });
  };

  return (
    <>
      Vibe Rater: { vibe }
    </>
  );
};

export default Vibe;
