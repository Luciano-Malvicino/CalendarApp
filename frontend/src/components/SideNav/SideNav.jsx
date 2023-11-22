import React, { useState } from 'react';
import './SideNav.css'

function selectNavItem(event) {
  let navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
}

function SideNav() {
  const [isMobileMenuVisible, setMobileMenuVisibility] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuVisibility(!isMobileMenuVisible);
  };

  return (
  <div className='side-div'>
    <nav className={`side-nav ${isMobileMenuVisible ? 'mobile-hidden' : ''}`}>
      <a className='nav-item' onMouseDown={selectNavItem}>
        <div>
          <img id='side-svg' className='icon' src='/src/assets/list.svg'></img>
        </div>
        Game Library
      </a>
      <a className='nav-item' onMouseDown={selectNavItem}>
        <div>
          <img id='side-svg' className='icon' src='/src/assets/save.svg'></img>
        </div>
        User Saves
      </a>
      <a className='nav-item' onMouseDown={selectNavItem}>
        <div>
          <img id='side-svg' className='icon' src='/src/assets/plus.svg'></img>
        </div>
        Add ?
      </a>
      <a className='nav-item' onMouseDown={selectNavItem}>
        <div>
          <img id='side-svg' className='icon' src='/src/assets/sun.svg'></img>
        </div>
        Light Mode
      </a>
      <a className='nav-item bottom'>
        <div>
          <img id='side-svg' className='icon' src='/src/assets/reload.svg'></img>
        </div>
        Reload
      </a>
    </nav>

    <div className='mobile-toggle-container'>
        <img className='mobile-toggle mobile-icon' src='/src/assets/menu.svg' onClick={toggleMobileMenu}/>
        <div className={`mobile-menu ${isMobileMenuVisible ? 'visible' : ''}`}>
          <a className='mobile-nav-item'>
            <div>
              <img id='side-svg' className='mobile-icon' src='/src/assets/list.svg'></img>
            </div>
            Game Library
          </a>
          <a className='mobile-nav-item'>
            <div>
              <img id='side-svg' className='mobile-icon' src='/src/assets/save.svg'></img>
            </div>
            User Saves
          </a>
          <a className='mobile-nav-item'>
            <div>
              <img id='side-svg' className='mobile-icon' src='/src/assets/plus.svg'></img>
            </div>
            Add ?
          </a>
          <a className='mobile-nav-item'>
            <div>
              <img id='side-svg' className='mobile-icon' src='/src/assets/sun.svg'></img>
            </div>
            Light Mode
          </a>
          <a className='mobile-nav-item'>
            <div>
              <img id='side-svg' className='mobile-icon' src='/src/assets/reload.svg'></img>
            </div>
            Reload
          </a>
        </div>
    </div>
  </div>
  );
}

export default SideNav;