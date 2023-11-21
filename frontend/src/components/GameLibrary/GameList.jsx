import React, { useState } from 'react';
import './GameList.css'

function SideNav() {

  return (
    <div>
      <img className='game-img' src='/src/assets/Mario.jpg'/>
      <img className='game-img' src='/src/assets/MarioKart.jpg'/>
      <img className='game-img' src='/src/assets/Metroid.jpg'/>
      <img className='game-img' src='/src/assets/Pokemon.webp'/>
      <img className='game-img' src='/src/assets/Zelda.png'/>
    </div>
  );
}

export default SideNav;