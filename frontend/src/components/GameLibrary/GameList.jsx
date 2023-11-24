import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const [gameCards, setGameCards] = useState([
    { id: 'metroid', hasFile: false, romFile: useRef(null) },
    { id: 'pokemon', hasFile: false, romFile: useRef(null) },
    { id: 'mario', hasFile: false, romFile: useRef(null) },
    { id: 'mariok', hasFile: false, romFile: useRef(null) },
    { id: 'zelda', hasFile: false, romFile: useRef(null) }
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
    if(event.currentTarget === undefined){
      if(gameCards.find((game) => game.id === event.id).hasFile === false){
        event.querySelector('.upload').style.display = 'block';
        event.querySelector('.play').style.display = 'none';
      } else{
        event.querySelector('.upload').style.display = 'none';
        event.querySelector('.play').style.display = 'block';
      }
    }else{
      const hoveredCard = event.currentTarget;
      if(gameCards.find((game) => game.id === hoveredCard.id).hasFile === false){
        hoveredCard.querySelector('.upload').style.display = 'block';
        hoveredCard.querySelector('.play').style.display = 'none';
      } else{
        hoveredCard.querySelector('.upload').style.display = 'none';
        hoveredCard.querySelector('.play').style.display = 'block';
      }
    }
  };

  const handleOnClickUpload = (index) => {
    gameCards[index].romFile.current.click();
  };

  const handleOnClickPlay = (index) => {
    console.log('Clicked on play for index:', index);
    const selectedFile = gameCards[index].romFile.current.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      // Redirect to the /emulator route with the selected file as a parameter
      navigate('/emulator', { state: { emulatorFile: selectedFile } });
    } else {
      // If the input file is in the "upload" div, find it and get the file
      const uploadDiv = document.getElementById(gameCards[index].id);
      const uploadInput = uploadDiv.querySelector('.upload input[type="file"]');
      const fileFromUpload = uploadInput.files[0];

      if (fileFromUpload) {
        // Redirect to the /emulator route with the selected file as a parameter
        navigate('/emulator', { state: { selectedFile: fileFromUpload } });
      } else {
        console.log('No file selected');
      }
    }
  };
  
  const handleFileChange = (index, event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log('Selected File for', gameCards[index].id, ':', selectedFile.name);
      const updatedGameCards = [...gameCards];
      updatedGameCards[index].romFile.current = event.target; // Change this line to set the ref to the input element
      updatedGameCards[index].hasFile = true;
      const uploadDiv = event.target.parentNode;
      const cardElement = uploadDiv.parentNode;
      handleUploadPlay(cardElement);
      setGameCards(updatedGameCards);
    } else {
      console.log('No file selected');
      const updatedGameCards = [...gameCards];
      updatedGameCards[index].hasFile = false;
      setGameCards(updatedGameCards);
    }
  };

  return (
    <div className='library-wrapper-div'>
      <p className='library-title'>Game Library</p>
      <div className='card-list' >
      {gameCards.map((game, index) => (
        <div key={game.id} id={game.id} className='card-img' onMouseOver={ handleMouseOver } onClick={ handleMouseOver }>
          <img className='game-img' src={`/src/assets/${game.id}.jpg`}/>
          <div className='upload' onClick={() => handleOnClickUpload(index)}>
            <p className='upload-text'>upload your rom here</p>
            <img className='upload-svg' src='/src/assets/upload.svg'/>
            <input type="file" ref={game.romFile} style={{ display: 'none' }} onChange={(event) => handleFileChange(index, event)} accept=".gba"/>
          </div>
          <div className='play' onClick={() => handleOnClickPlay(index)}>
            <p className='play-text'>play game</p>
            <input type='file' id='file' style={{display: 'none'}}/>
            <img className='play-svg' src='/src/assets/play.svg'/>
          </div>
        </div>
      ))}
      </div>
      <hr className='line'/>
      <Description selectedGame={ selectedGame }/>
    </div>
  );
}

export default GameList;