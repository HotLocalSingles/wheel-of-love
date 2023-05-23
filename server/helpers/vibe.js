const axios = require('axios');

const getVibe = async (bio) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('text', bio);

  const options = {
    method: 'POST',
    url: 'https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '4ee5323ca2mshd65cd59ad8adeffp113c73jsnf696f704bac0',
      'X-RapidAPI-Host': 'twinword-emotion-analysis-v1.p.rapidapi.com'
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.error('Failed to GET vibe from API', err);
  }
};

module.exports.getVibe = getVibe;
