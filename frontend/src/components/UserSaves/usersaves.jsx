import React from 'react';
import SideNav from '../SideNav/SideNav';
import ContextMenu from '../ContextMenu/ContextMenu';
import './UserSaves.css'

function addSave(event) {
  const parentElement = event.currentTarget.parentNode.parentNode;
  console.log('Parent element:', parentElement);
}

function UserSaves() {

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
            {/* this is where you shove the files */}
          </div>
          <div id='pokemon' className='user-save-table'>
            <div className='title-wrapper'>
              <p className='user-table-title'>Pokemon Emerald</p>
              <img className='add-svg' src='/src/assets/plus.svg'/>
            </div>
            <hr className='user-save-line'/>
            {/* this is where you shove the files */}
          </div>
          <div id='mario' className='user-save-table'>
            <div className='title-wrapper'>
              <p className='user-table-title'>Super Mario Bros Advanced 4</p>
              <img className='add-svg' src='/src/assets/plus.svg'/>
            </div>
            <hr className='user-save-line'/>
            {/* this is where you shove the files */}
          </div>
          <div id='mariok' className='user-save-table'>
            <div className='title-wrapper'>
              <p className='user-table-title'>Mario Kart Super Circuit</p>
              <img className='add-svg' src='/src/assets/plus.svg'/>
            </div>
            <hr className='user-save-line'/>
            <div className='user-save-a'>
              <p className='save-table-content'>50 + 100CC Finished</p>
              <div className='context-menu-div'>
                <ContextMenu />
              </div>
            </div>
          </div>
          <div id='zelda' className='user-save-table'>
            <div className='title-wrapper'>
              <p className='user-table-title'>The Legend of Zelda</p>
              <img className='add-svg' src='/src/assets/plus.svg'/>
            </div>
            <hr className='user-save-line'/>
            {/* this is where you shove the files */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSaves;