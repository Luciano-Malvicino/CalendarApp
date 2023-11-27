import React, { useState, useEffect } from 'react';
import SideNav from '../SideNav/SideNav';
import ContextMenu from '../ContextMenu/ContextMenu';
import './UserSaves.css'

function addSave(event) {
  const parentElement = event.currentTarget.parentNode.parentNode;
  console.log('Parent element:', parentElement);
}

function UserSaves() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = 'UserTemplate';
        
        const metroidResponse = await fetch(`http://localhost:3000/api/listFiles?selectedPath=${username}/metroid/`);
        const metroidjsonData = await metroidResponse.json();
        const metroidArray = metroidjsonData.files;
        metroidArray.shift();
        const metroidArrayNames = metroidArray.map((element) => {
          const parts = element.split('/');
          const lastPart = parts[parts.length - 1];
          return lastPart.split('.')[0];
        });
        
        const pokemonResponse = await fetch(`http://localhost:3000/api/listFiles?selectedPath=${username}/pokemon/`);
        const pokemonjsonData = await pokemonResponse.json();
        const pokemonArray = pokemonjsonData.files;
        pokemonArray.shift();
        const pokemonArrayNames = pokemonArray.map((element) => {
          const parts = element.split('/');
          const lastPart = parts[parts.length - 1];
          return lastPart.split('.')[0];
        });

        const marioResponse = await fetch(`http://localhost:3000/api/listFiles?selectedPath=${username}/mario/`);
        const mariojsonData = await marioResponse.json();
        const marioArray = mariojsonData.files;
        marioArray.shift();
        const marioArrayNames = marioArray.map((element) => {
          const parts = element.split('/');
          const lastPart = parts[parts.length - 1];
          return lastPart.split('.')[0];
        });

        const mariokResponse = await fetch(`http://localhost:3000/api/listFiles?selectedPath=${username}/mariok/`);
        const marikjsonData = await mariokResponse.json();
        const mariokArray = marikjsonData.files;
        mariokArray.shift();
        const mariokArrayNames = mariokArray.map((element) => {
          const parts = element.split('/');
          const lastPart = parts[parts.length - 1];
          return lastPart.split('.')[0];
        });

        const zeldaResponse = await fetch(`http://localhost:3000/api/listFiles?selectedPath=${username}/zelda/`);
        const zeldajsonData = await zeldaResponse.json();
        const zeldaArray = zeldajsonData.files;
        zeldaArray.shift();
        const zeldaArrayNames = zeldaArray.map((element) => {
          const parts = element.split('/');
          const lastPart = parts[parts.length - 1];
          return lastPart.split('.')[0];
        });

        setData({
          metroid: metroidArrayNames,
          pokemon: pokemonArrayNames,
          mario: marioArrayNames,
          mariok: mariokArrayNames,
          zelda: zeldaArrayNames,
        });


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderSaveItems = (category) => {
    if (!data[category]) {
      return null;
    }

    return data[category].map((fileName, index) => (
      <a key={index} className='user-save-a'>
        <p className='save-table-content'>{fileName}</p>
        <div className='context-menu-div'>
          <ContextMenu />
        </div>
      </a>
    ));
  };
  

  return (
    <div>
      <SideNav id="save" />
      <div className='user-save-wrapper'>
        <p className='user-save-title'>User Saves</p>
        <div className='user-wrapper'>
          <div id='metroid' className='user-save-table'>
            <div className='title-wrapper'>
              <p className='user-table-title'>Metroid Fusion</p>
              <img className='add-svg' src='/src/assets/plus.svg' onClick={ addSave }/>
            </div>
            <hr className='user-save-line'/>
            {renderSaveItems('metroid')}
          </div>
          <div id='pokemon' className='user-save-table'>
            <div className='title-wrapper'>
              <p className='user-table-title'>Pokemon Emerald</p>
              <img className='add-svg' src='/src/assets/plus.svg'/>
            </div>
            <hr className='user-save-line'/>
            {renderSaveItems('pokemon')}
          </div>
          <div id='mario' className='user-save-table'>
            <div className='title-wrapper'>
              <p className='user-table-title'>Super Mario Bros Advanced 4</p>
              <img className='add-svg' src='/src/assets/plus.svg'/>
            </div>
            <hr className='user-save-line'/>
            {renderSaveItems('mario')}
          </div>
          <div id='mariok' className='user-save-table'>
            <div className='title-wrapper'>
              <p className='user-table-title'>Mario Kart Super Circuit</p>
              <img className='add-svg' src='/src/assets/plus.svg'/>
            </div>
            <hr className='user-save-line'/>
            {renderSaveItems('mariok')}
          </div>
          <div id='zelda' className='user-save-table'>
            <div className='title-wrapper'>
              <p className='user-table-title'>The Legend of Zelda</p>
              <img className='add-svg' src='/src/assets/plus.svg'/>
            </div>
            <hr className='user-save-line'/>
            {renderSaveItems('zelda')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSaves;