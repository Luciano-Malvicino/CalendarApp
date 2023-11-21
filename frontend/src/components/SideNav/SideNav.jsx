import React from 'react';
import './SideNav.css'

function SideNav() {
  return (
  <div className="side-div">
    <nav className='sidenav'>
      <a className='navitem'>
        <img id='test' className='icon' src='/src/assets/list.svg'></img>
        Game Library
      </a>
      <a className='navitem'>
        <img id='test' className='icon' src='/src/assets/save.svg'></img>
        User Saves
      </a>
      <a className='navitem'>
        <img id='test' className='icon' src='/src/assets/plus.svg'></img>
        Add ?
      </a>
      <a className='navitem'>
        <img id='test' className='icon' src='/src/assets/sun.svg'></img>
        Light Mode
      </a>
      <a className='navitem bottom'>
        <img id='test' className='icon' src='/src/assets/reload.svg'></img>
        Reload
      </a>
    </nav>
  </div>
  );
};
export default SideNav;