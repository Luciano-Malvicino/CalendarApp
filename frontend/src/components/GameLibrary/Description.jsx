import React, { useState, useEffect } from 'react';
import './Description.css'

function Description({ selectedGame }) {
  const [selectedGameInfo, setSelectedGameInfo] = useState({
    description: '',
    length: '',
    rating: '',
    publisher: '',
    genre: '',
    game: '',
    name: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:3000/api/gameinfo?selectedGame=${selectedGame}`, {
          method: 'GET',
          credentials: 'include', // Add this line to include credentials
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setSelectedGameInfo(data);
        } else {
          console.log('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    fetchData();
  }, [selectedGame]);
  
  return (
    <div style={{marginTop: '-20px', marginLeft: '100px'}}>
      <p className='game-title'>{ selectedGameInfo.name }</p>
      <div className='text-flexbox'>
        <div className='description-container'>
          <p className='description-title'>Description</p>
          <p id='description' className='description-text'>{ selectedGameInfo.description }</p>
        </div>
        <div className='extra-info'>
          <div className='alt-div'>
            <p className='alt-text'>Average Length: </p>
            <p id='average-length' className='alt-text'>{ selectedGameInfo.length }</p>
          </div>
          <div className='alt-div'>
            <p className='alt-text'>Rating: </p>
            <p id='rating' className='alt-text'>{ selectedGameInfo.rating }</p>
          </div>
          <div className='alt-div'>
            <p className='alt-text'>Publisher: </p>
            <p id='playtime' className='alt-text'>{ selectedGameInfo.publisher }</p>
          </div>
          <div className='alt-div'>
            <p className='alt-text'>Genre: </p>
            <p id='genre' className='alt-text'>{ selectedGameInfo.genre }</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;