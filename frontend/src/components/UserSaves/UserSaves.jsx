import React from 'react';
import SideNav from '../SideNav/SideNav';
import ContextMenu from '../ContextMenu/ContextMenu';
import './UserSaves.css'

function UserSaves() {

  return (
    <div>
      <SideNav id="save" />
      <div className='user-save-wrapper'>
        <p className='user-save-title'>Common Saves</p>
        <div className='user-wrapper'>
          <div id='metroid' className='user-save-table'>
            <p className='user-table-title'>Metroid Fusion</p>
            <hr className='user-save-line'/>
            <div className='user-save-a'>
              <p className='save-table-content'>At Final Fight</p>
              <div className='context-menu-div'>
                <ContextMenu />
              </div>
            </div>
            <div className='user-save-a'>
              <p className='save-table-content'>Save File 100%</p>
              <div className='context-menu-div'>
                <ContextMenu />
              </div>
            </div>
          </div>
          <div id='pokemon' className='user-save-table'>
            <p className='user-table-title'>Pokemon Emerald</p>
            <hr className='user-save-line'/>
            <div className='user-save-a'>
              <p className='save-table-content'>Shiny Living Dex + 100%</p>
              <div className='context-menu-div'>
                <ContextMenu />
              </div>
            </div>
            <div className='user-save-a'>
              <p className='save-table-content'>At Victory Road</p>
              <div className='context-menu-div'>
                <ContextMenu />
              </div>
            </div>
          </div>
          <div id='mario' className='user-save-table'>
            <p className='user-table-title'>Super Mario Bros Advanced 4</p>
            <hr className='user-save-line'/>
            <div className='user-save-a'>
              <p className='save-table-content'>Save File 100%</p>
              <div className='context-menu-div'>
                <ContextMenu />
              </div>
            </div>
          </div>
          <div id='mariok' className='user-save-table'>
            <p className='user-table-title'>Mario Kart Super Circuit</p>
            <hr className='user-save-line'/>
            <div className='user-save-a'>
              <p className='save-table-content'>50 + 100CC Finished</p>
              <div className='context-menu-div'>
                <ContextMenu />
              </div>
            </div>
            <div className='user-save-a'>
              <p className='save-table-content'>All Tracks Unlocked</p>
              <div className='context-menu-div'>
                <ContextMenu />
              </div>
            </div>
            <div className='user-save-a'>
              <p className='save-table-content'>Save File 100%</p>
              <div className='context-menu-div'>
                <ContextMenu />
              </div>
            </div>
          </div>
          <div id='zelda' className='user-save-table'>
            <p className='user-table-title'>The Legend of Zelda</p>
            <hr className='user-save-line'/>
            <div className='user-save-a'>
              <p className='save-table-content'>Save File 100%</p>
              <div className='context-menu-div'>
                <ContextMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSaves;