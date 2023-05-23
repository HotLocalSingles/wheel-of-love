const axios = require('axios');

//Axios helper function to get an icebreaker from the API
const getIcebreaker = async () => {

  const options = {
    method: 'GET',
    url: 'https://conversation-starter1.p.rapidapi.com/',
    headers: {
      'X-RapidAPI-Key': '4ee5323ca2mshd65cd59ad8adeffp113c73jsnf696f704bac0',
      'X-RapidAPI-Host': 'conversation-starter1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (err) {
    console.error('Failed to GET icebreaker from API', err);
  }
};

module.exports.getIcebreaker = getIcebreaker;
