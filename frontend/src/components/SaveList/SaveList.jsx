import React from 'react';
import SideNav from '../SideNav/SideNav';
import './SaveList.css'

function SaveList() {

  return (
    <div>
      <SideNav id="premade" />
      <div className='div-wrapper-save'>
        <p className='save-title'>Common Saves</p>
        <div className='save-wrapper'>
          <div id='metroid' className='save-table'>
            <p className='table-title'>Metroid Fusion</p>
            <hr className='save-line'/>
            <a href='/metroid/beforeFinalFight' download="MetroidFinalFight.sps" className='save-a'>
              <p className='table-content'>At Final Fight</p>
              <img className='save-icon' src='/src/assets/download.svg'/>
            </a>
            <a href='/metroid/metroidFinished' download="Metroid100%.sps" className='save-a'>
              <p className='table-content'>Save File 100%</p>
              <img className='save-icon' src='/src/assets/download.svg'/>
            </a>
          </div>
          <div id='pokemon' className='save-table'>
            <p className='table-title'>Pokemon Emerald</p>
            <hr className='save-line'/>
            <a href='/pokemon/shinyLivingDex' download="ShinyLivingDex.sps" className='save-a'>
              <p className='table-content'>Shiny Living Dex + 100%</p>
              <img className='save-icon' src='/src/assets/download.svg'/>
            </a>
            <a href='/pokemon/victoryRoad' download="VictoryRoad.sps" className='save-a'>
              <p className='table-content'>At Victory Road</p>
              <img className='save-icon' src='/src/assets/download.svg'/>
            </a>
          </div>
          <div id='mario' className='save-table'>
            <p className='table-title'>Super Mario Bros Advanced 4</p>
            <hr className='save-line'/>
            <a href='/mario/marioFinished' download="Mario100%.sps" className='save-a'>
              <p className='table-content'>Save File 100%</p>
              <img className='save-icon' src='/src/assets/download.svg'/>
            </a>
          </div>
          <div id='mariok' className='save-table'>
            <p className='table-title'>Mario Kart Super Circuit</p>
            <hr className='save-line'/>
            <a href='/mariok/50+100ccFinished' download="50-100CCFinished.sps" className='save-a'>
              <p className='table-content'>50 + 100CC Finished</p>
              <img className='save-icon' src='/src/assets/download.svg'/>
            </a>
            <a href='/mariok/allTracks' download="AllTracks.sps" className='save-a'>
              <p className='table-content'>All Tracks Unlocked</p>
              <img className='save-icon' src='/src/assets/download.svg'/>
            </a>
            <a href='/mariok/mariokFinished' download="Mariok100%.sps" className='save-a'>
              <p className='table-content'>Save File 100%</p>
              <img className='save-icon' src='/src/assets/download.svg'/>
            </a>
          </div>
          <div id='zelda' className='save-table'>
            <p className='table-title'>The Legend of Zelda</p>
            <hr className='save-line'/>
            <a href='/zelda/zeldaFinished' download="Zelda100%.sps"className='save-a'>
              <p className='table-content'>Save File 100%</p>
              <img className='save-icon' src='/src/assets/download.svg'/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaveList;