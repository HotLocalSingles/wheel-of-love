import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Photos = ({ id }) => {

  const [photos, setPhotos] = useState([]);
  const [imageURL, setImageURL] = useState('');

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };

  const fetchPhotos = () => {
    axios.get(`/photos/${id}`)
      .then(response => setPhotos(response.data))
      .catch(err => {
        console.error('Failed to GET user photos from DB at client:', err);
      });
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleSavePhoto = () => {
    axios.post('/photos/:id', { id, imageURL })
      .then(user => user)
      .catch(err => {
        console.error('Failed to add photo to DB at client:', err);
      });
  };

  const handleDeletePhoto = (imageURL) => {
    axios.delete(`/photos/${id}/${encodeURIComponent(imageURL)}`)
      .then(() => {
        fetchPhotos();
      })
      .catch(err => {
        console.error('Failed to delete photo from DB at client:', err);
      });
  };

  return (
    <>
      <div>
        {photos.map((photo, i) => (
          <img
            onClick={() => handleDeletePhoto(photo)}
            className="thumbnail"
            style={{ width: '25%' }}
            key={i}
            src={photo}
          />
        ))}
      </div>
      <div>
        <input
          onChange={handleImageURLChange}
          value={imageURL}
          placeholder='Add a link to a photo here'>
        </input>
        <button onClick={handleSavePhoto}>Save a Photo</button>
      </div>
    </>
  );
};

export default Photos;
