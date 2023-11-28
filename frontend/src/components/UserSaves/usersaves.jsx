import React, { useState, useEffect } from 'react';
import SideNav from '../SideNav/SideNav';
import ContextMenu from '../ContextMenu/ContextMenu';
import './UserSaves.css'

function addSave(event) {
  document.getElementById(event.target.dataset.name).click();
}

async function handleFileChange(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];

  const gamename = event.currentTarget.dataset.name
  if (file) {
    const formData = new FormData();
    formData.append('gameName', gamename); // Replace with actual game name
    formData.append('fileName', file.name + '.state'); // Replace with actual file name
    formData.append('file', file);

    try {
      console.log('testin');
      const response = await fetch('https://localhost:3000/api/uploadFile', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const metroidData = await response.json();
      console.log('Server response:', metroidData);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  // Optionally, you can hide the file input again
  fileInput.style.display = 'none';
  window.location.reload();
}


function UserSaves() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('testin');
        const metroidResponse = await fetch('https://localhost:3000/api/listFiles?selectedPath=/metroid/', {
        method: 'GET',
        credentials: 'include', // Add this line to include credentials
        headers: {
          'Content-Type': 'application/json',
        },
      });
        
        
        const metroidjsonData = await metroidResponse.json();
        console.log(metroidjsonData.success);
        const metroidArray = metroidjsonData.files;
        metroidArray.shift();
        const metroidArrayNames = metroidArray.map((element) => {
          const parts = element.split('/');
          const lastPart = parts[parts.length - 1];
          return lastPart.split('.')[0];
        });
        
        console.log('testin');
        console.log(metroidArrayNames);
        console.log(metroidArrayNames[0]);
        
     
        const pokemonResponse = await fetch(`https://localhost:3000/api/listFiles?selectedPath=/pokemon/`, {
          method: 'GET',
          credentials: 'include', // Add this line to include credentials
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const pokemonjsonData = await pokemonResponse.json();
        const pokemonArray = pokemonjsonData.files;
        pokemonArray.shift();
        const pokemonArrayNames = pokemonArray.map((element) => {
          const parts = element.split('/');
          const lastPart = parts[parts.length - 1];
          return lastPart.split('.')[0];
        });

        const marioResponse = await fetch(`https://localhost:3000/api/listFiles?selectedPath=/mario/`, {
          method: 'GET',
          credentials: 'include', // Add this line to include credentials
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const mariojsonData = await marioResponse.json();
        const marioArray = mariojsonData.files;
        marioArray.shift();
        const marioArrayNames = marioArray.map((element) => {
          const parts = element.split('/');
          const lastPart = parts[parts.length - 1];
          return lastPart.split('.')[0];
        });

        const mariokResponse = await fetch(`https://localhost:3000/api/listFiles?selectedPath=/mariok/`, {
          method: 'GET',
          credentials: 'include', // Add this line to include credentials
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const marikjsonData = await mariokResponse.json();
        const mariokArray = marikjsonData.files;
        mariokArray.shift();
        const mariokArrayNames = mariokArray.map((element) => {
          const parts = element.split('/');
          const lastPart = parts[parts.length - 1];
          return lastPart.split('.')[0];
        });

        const zeldaResponse = await fetch(`https://localhost:3000/api/listFiles?selectedPath=/zelda/`, {
          method: 'GET',
          credentials: 'include', // Add this line to include credentials
          headers: {
            'Content-Type': 'application/json',
          },
        });
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
      <a key={index} className='user-save-a' data-game={category} data-file={fileName}>
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
              <img className='add-svg' src='/src/assets/plus.svg' data-name = "/metroid/" onClick={ addSave }/><input data-name = "/metroid/" id="/metroid/" onChange={handleFileChange} style={{ display: 'none' }} type="file"/>
            </div>
            <hr className='user-save-line'/>
            {renderSaveItems('metroid')}
          </div>
          <div id='pokemon' className='user-save-table'> 
            <div className='title-wrapper'>
              <p className='user-table-title'>Pokemon Emerald</p>
              <img className='add-svg' src='/src/assets/plus.svg' data-name = "/pokemon/" onClick={ addSave }/><input data-name = "/pokemon/" id="/pokemon/" onChange={handleFileChange} style={{ display: 'none' }} type="file"/>
            </div>
            <hr className='user-save-line'/>
            {renderSaveItems('pokemon')}
          </div>
          <div id='mario' className='user-save-table'>
            <div className='title-wrapper'>
              <p className='user-table-title'>Super Mario Bros Advanced 4</p>
              <img className='add-svg' src='/src/assets/plus.svg' data-name = "/mario/" onClick={ addSave }/><input data-name = "/mario/" id="/mario/" onChange={handleFileChange} style={{ display: 'none' }} type="file"/>
            </div>
            <hr className='user-save-line'/>
            {renderSaveItems('mario')}
          </div>
          <div id='mariok' className='user-save-table'>
            <div className='title-wrapper'>
              <p className='user-table-title'>Mario Kart Super Circuit</p>
              <img className='add-svg' src='/src/assets/plus.svg' data-name = "/mariok/" onClick={ addSave }/><input data-name = "/mariok/" id="/mariok/" onChange={handleFileChange} style={{ display: 'none' }} type="file"/>
            </div>
            <hr className='user-save-line'/>
            {renderSaveItems('mariok')}
          </div>
          <div id='zelda' className='user-save-table'>
            <div className='title-wrapper'>
              <p className='user-table-title'>The Legend of Zelda</p>
              <img className='add-svg' src='/src/assets/plus.svg' data-name = "/zelda/" onClick={ addSave }/><input data-name = "/zelda/" id="/zelda/" onChange={handleFileChange} style={{ display: 'none' }} type="file"/>
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