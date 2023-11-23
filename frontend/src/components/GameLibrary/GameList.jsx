import React, { useState, useEffect } from 'react';
import Description from './Description';
import './GameList.css'

function calculateScale(distance) {
  // You can adjust these values based on your preference
  const baseScale = 1.1;
  const adjacentScale = 1.0;
  const fartherScale = 0.90;

  if (distance == 0){
    return baseScale
  } else if (distance === 1) {
    return adjacentScale;
  } else {
    return fartherScale;
  }
}

function hoverCard(event) {
  const hoveredCard = event.currentTarget;
  const cards = Array.from(document.querySelectorAll('.card-img'));
  const isMobileView = window.innerWidth <= 810;

  cards.forEach(card => {
    if (card === hoveredCard) {
      if(isMobileView){
        card.style.transform = `scale(1.1)`;
        card.style.zIndex = '2';
      } else{
        const distance = Math.abs(cards.indexOf(hoveredCard) - cards.indexOf(card));
        const scale = calculateScale(distance);
        card.style.transform = `scale(${scale})`;
        card.style.marginLeft = '10px';
        card.style.marginRight = '10px';
      }
    } else {
      const distance = Math.abs(cards.indexOf(hoveredCard) - cards.indexOf(card));
      const scale = calculateScale(distance);
      card.style.transform = `scale(${scale})`;
      card.style.zIndex = '1';
      if(scale === 1.0){
        if(isMobileView){
          card.style.transform = 'scale(1)';
        } else{
          card.style.transform = `scale(${scale})`;
          card.style.marginLeft = '5px';
          card.style.marginRight = '5px';
        }
      } else {
        if(isMobileView){
          card.style.transform = 'scale(1)';
        } else{
          const distance = Math.abs(cards.indexOf(hoveredCard) - cards.indexOf(card));
          const scale = calculateScale(distance);
          card.style.transform = `scale(${scale})`;
          card.style.marginLeft = '-8px';
          card.style.marginRight = '-8px';
        }
      }
    }
  });
}

/*
on div 
onMouseOut={resetCardScale}

function resetCardScale() {
  const cards = document.querySelectorAll('.card-img');
  cards.forEach(card => {
    card.style.transform = 'scale(1)';
    card.style.zIndex = '0';
    card.style.marginLeft = '5px';
    card.style.marginRight = '5px';
  });
}
*/

function selectNavItem(event) {
  let cardlist = document.querySelectorAll('.card-img');
  cardlist.forEach(item => item.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
}

function GameList() {
  const [selectedGame, setSelectedGame] = useState('mario');

  const [gameCards, setGameCards] = useState([
    { id: 'metroid', hasFile: false },
    { id: 'pokemon', hasFile: true },
    { id: 'mario', hasFile: false },
    { id: 'mariok', hasFile: true },
    { id: 'zelda', hasFile: false }
  ]);

  const handleDivClick = (gameName) => {
    setSelectedGame(gameName);
  };

  function handleMouseOver(event) {
    hoverCard(event);
    selectNavItem(event);
    handleUploadPlay(event);
    handleDivClick(event.currentTarget.id);
  };

  function handleUploadPlay(event) {
    const uploads = document.querySelectorAll('.upload');
    const plays = document.querySelectorAll('.play');
    uploads.forEach(card => {
      card.style.display = 'none';
    });
    plays.forEach(card => {
      card.style.display = 'none';
    });
    const hoveredCard = event.currentTarget;
    if(gameCards.find((game) => game.id === hoveredCard.id).hasFile === false){
      hoveredCard.querySelector('.upload').style.display = 'block';
      hoveredCard.querySelector('.play').style.display = 'none';
    } else{
      hoveredCard.querySelector('.upload').style.display = 'none';
      hoveredCard.querySelector('.play').style.display = 'block';
    }
  };

  function handleOnClickUpload(event) {

  };

  function handleOnClickPlay(event) {

  };

  return (
    <div className='library-wrapper-div'>
      <p className='library-title'>Game Library</p>
      <div className='card-list' >
        <div id='metroid' className='card-img' onMouseOver={ handleMouseOver } onClick={ handleMouseOver }>
          <img className='game-img' src='/src/assets/metroid.jpg'/>
          <div className='upload' onClick={ handleOnClickUpload }>
            <p className='upload-text'>upload your rom here</p>
            <img className='upload-svg' src='/src/assets/upload.svg'/>
          </div>
          <div className='play' onClick={ handleOnClickPlay }>
            <p className='play-text'>play game</p>
            <img className='play-svg' src='/src/assets/play.svg'/>
          </div>
        </div>
        <div id='pokemon' className='card-img' onMouseOver={ handleMouseOver } onClick={ handleMouseOver }>
          <img className='game-img' src='/src/assets/pokemon.jpg'/>
          <div className='upload' onClick={ handleOnClickUpload }>
            <p className='upload-text'>upload your rom here</p>
            <img className='upload-svg' src='/src/assets/upload.svg'/>
          </div>
          <div className='play' onClick={ handleOnClickPlay }>
            <p className='play-text'>play game</p>
            <img className='play-svg' src='/src/assets/play.svg'/>
          </div>
        </div>
        <div id='mario' className='card-img' onMouseOver={ handleMouseOver } onClick={ handleMouseOver }>
          <img className='game-img' src='/src/assets/mario.jpg'/>
          <div className='upload' onClick={ handleOnClickUpload }>
            <p className='upload-text'>upload your rom here</p>
            <img className='upload-svg' src='/src/assets/upload.svg'/>
          </div>
          <div className='play' onClick={ handleOnClickPlay }>
            <p className='play-text'>play game</p>
            <img className='play-svg' src='/src/assets/play.svg'/>
          </div>
        </div>
        <div id='mariok' className='card-img' onMouseOver={ handleMouseOver } onClick={ handleMouseOver }>
          <img className='game-img' src='/src/assets/mariokart.png'/>
          <div className='upload' onClick={ handleOnClickUpload }>
            <p className='upload-text'>upload your rom here</p>
            <img className='upload-svg' src='/src/assets/upload.svg'/>
          </div>
          <div className='play' onClick={ handleOnClickPlay }>
            <p className='play-text'>play game</p>
            <img className='play-svg' src='/src/assets/play.svg'/>
          </div>
        </div>
        <div id='zelda' className='card-img' onMouseOver={ handleMouseOver } onClick={ handleMouseOver }>
          <img className='game-img' src='/src/assets/zelda.jpg'/>
          <div className='upload' onClick={ handleOnClickUpload }>
            <p className='upload-text'>upload your rom here</p>
            <img className='upload-svg' src='/src/assets/upload.svg'/>
          </div>
          <div className='play' onClick={ handleOnClickPlay }>
            <p className='play-text'>play game</p>
            <img className='play-svg' src='/src/assets/play.svg'/>
          </div>
        </div>
      </div>
      <hr className='line'/>
      <Description selectedGame={ selectedGame }/>
    </div>
  );
}

export default GameList;