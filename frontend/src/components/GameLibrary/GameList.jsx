import React, { useState } from 'react';
import Description from './Description';
import './GameList.css'

function calculateScale(distance) {
  // You can adjust these values based on your preference
  const baseScale = 1.05;
  const adjacentScale = 1.0;
  const fartherScale = 0.95;

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

  cards.forEach(card => {
    if (card === hoveredCard) {
      const distance = Math.abs(cards.indexOf(hoveredCard) - cards.indexOf(card));
      const scale = calculateScale(distance);
      card.style.transform = `scale(${scale})`;
      card.style.zIndex = '2';
      card.style.marginLeft = '5px';
      card.style.marginRight = '5px';
    } else {
      const distance = Math.abs(cards.indexOf(hoveredCard) - cards.indexOf(card));
      const scale = calculateScale(distance);
      card.style.transform = `scale(${scale})`;
      card.style.zIndex = '1';
      if(scale === 1.0){
        card.style.marginLeft = '5px';
        card.style.marginRight = '5px';
      }
      else{
        card.style.marginLeft = '5px';
        card.style.marginRight = '5px';
      }
      
    }
  });
}

function resetCardScale() {
  const cards = document.querySelectorAll('.card-img');
  cards.forEach(card => {
    card.style.transform = 'scale(1)';
    card.style.zIndex = '0';
    card.style.marginLeft = '5px';
    card.style.marginRight = '5px';
  });
}

function selectNavItem(event) {
  let cardlist = document.querySelectorAll('.card-img');
  cardlist.forEach(item => item.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
}

function GameList() {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleDivClick = (gameName) => {
    setSelectedGame(gameName);
  };

  function handleMouseOver(event) {
    hoverCard(event);
    selectNavItem(event);
    const elementId = event.currentTarget.id;
    handleDivClick(elementId)
  };

  return (
    <div>
      <h1 className='library-title'>Game Library</h1>
      <div className='card-list' onMouseOut={resetCardScale}>
        <div id='metroid' className='card-img' onMouseOver={ handleMouseOver }>
          <img className='game-img' src='/src/assets/metroid.jpg'/>
        </div>
        <div id='pokemom' className='card-img' onMouseOver={ handleMouseOver }>
          <img className='game-img' src='/src/assets/pokemon.jpg'/>
        </div>
        <div id='mario' className='card-img' onMouseOver={ handleMouseOver }>
          <img className='game-img' src='/src/assets/mario.jpg'/>
        </div>
        <div id='mariok' className='card-img' onMouseOver={ handleMouseOver }>
          <img className='game-img' src='/src/assets/mariokart.png'/>
        </div>
        <div id='zelda' className='card-img' onMouseOver={ handleMouseOver }>
          <img className='game-img' src='/src/assets/zelda.jpg'/>
        </div>
      </div>
      <hr className='line'/>
      <Description selectedGame={ selectedGame }/>
    </div>
  );
}

export default GameList;