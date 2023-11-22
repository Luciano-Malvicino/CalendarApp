import React, { useEffect } from 'react';
import './Description.css'

function Description({ selectedGame }) {

  useEffect(() => {
    // Do something with selectedElement, e.g., update the text
    console.log('Selected Element:', selectedGame);
  }, [selectedGame]);

  return (
    <div className='text-flexbox'>
      <div className='descript-container'>
        <p className='description-title'>Description</p>
        <p id='description' className='description-text'>
          Super Mario Bros Advanced 4 is a 2D action-adventure platform game for the Game Boy Advance.  
          It was released for consoles in Japan on October 23, 1988; in North America on February 12, 1990; and in Europe and Australia on August 29, 1991. 
          Super Mario Bros Advanced 4 retains the same level-based platformer mechanics of previous titles. 
          These core mechanics are iterated upon, featuring greatly expanded levels, several new power-ups, new enemies and bosses, a more fleshed-out multiplayer mode, a world map, and many optional levels and secrets. 
          The game has gone on to become one of the most influential titles for the Super Mario franchise, and several elements introduced in this title have since become franchise mainstays, including landscape-themed worlds, the Koopalings, airships, and Toad Houses. 
        </p>
      </div>
      <div className='extra-info'>
        <div className='alt-div'>
          <p>this is the current game {selectedGame}</p>
          <p className='alt-text'>Average Length: </p>
          <p id='average-length' className='alt-text'>6 hours</p>
        </div>
        <div className='alt-div'>
          <p className='alt-text'>Rating</p>
          <p id='rating' className='alt-text'>4/5</p>
        </div>
        <div className='alt-div'>
          <p className='alt-text'>Your Playtime</p>
          <p id='playtime' className='alt-text'>3.5 hours</p>
        </div>
        <div className='alt-div'>
          <p className='alt-text'>Genre</p>
          <p id='genre' className='alt-text'>Platformer</p>
        </div>
      </div>
    </div>
  );
}

export default Description;