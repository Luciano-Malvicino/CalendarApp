import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './SideNav.css'

function selectNavItem(event) {
  let navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
}


  

function SideNav({ id }) {
  const [isMobileMenuVisible, setMobileMenuVisibility] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  React.useEffect(() => {
    setSelectedId(id);
  }, [id]);

  const navigate  = useNavigate ();

  const logout = async () => {
    try {
      const response = await fetch(`https://localhost:3000/api/logout`, {
        method: 'GET',
        credentials: 'include', // Add this line to include credentials
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.ok) {
        navigate ('/Login');
      }
    } catch(error){
  
    }
  }
  


  const toggleMobileMenu = () => {
    setMobileMenuVisibility(!isMobileMenuVisible);
  };

  return (
  <div>
    <div className='side-div'>
      <nav className={`side-nav ${isMobileMenuVisible ? 'mobile-hidden' : ''}`}>
        <Link to='/GameList' className={`nav-item ${selectedId === 'list' ? 'selected' : ''}`} onMouseDown={selectNavItem}>
          <div>
            <img id='side-svg' className='icon' src='/src/assets/list.svg'></img>
          </div>
          Game Library
        </Link>
        <Link to='/UserSaves' className={`nav-item ${selectedId === 'save' ? 'selected' : ''}`} onMouseDown={selectNavItem}>
          <div>
            <img id='side-svg' className='icon' src='/src/assets/save.svg'></img>
          </div>
          User Saves
        </Link>
        <Link to='/SaveList' className={`nav-item ${selectedId === 'premade' ? 'selected' : ''}`} onMouseDown={selectNavItem}>
          <div>
            <img id='side-svg' className='icon' src='/src/assets/article.svg'></img>
          </div>
          Pre-Made Saves
        </Link>
        <Link className='nav-item' onMouseDown={selectNavItem}>
          <div>
            <img id='side-svg' className='icon' src='/src/assets/sun.svg'></img>
          </div>
          Light Mode
        </Link>
        <a className='nav-item bottom' onClick={() => window.location.reload()}>
          <div>
            <img id='side-svg' className='icon' src='/src/assets/reload.svg'></img>
          </div>
          Reload
        </a>
      </nav>

      <div className='mobile-toggle-container'>
          <img className='mobile-toggle mobile-icon' src='/src/assets/menu.svg' onClick={toggleMobileMenu}/>
          <div className={`mobile-menu ${isMobileMenuVisible ? 'visible' : ''}`}>
            <a className='mobile-nav-item' onClick={selectNavItem}>
              <div>
                <img id='side-svg' className='mobile-icon' src='/src/assets/list.svg'></img>
              </div>
              Game Library
            </a>
            <a className='mobile-nav-item' onClick={selectNavItem}>
              <div>
                <img id='side-svg' className='mobile-icon' src='/src/assets/save.svg'></img>
              </div>
              User Saves
            </a>
            <a className='mobile-nav-item' onClick={selectNavItem}>
              <div>
                <img id='side-svg' className='mobile-icon' src='/src/assets/plus.svg'></img>
              </div>
              Add ?
            </a>
            <a className='mobile-nav-item' onClick={selectNavItem}>
              <div>
                <img id='side-svg' className='mobile-icon' src='/src/assets/sun.svg'></img>
              </div>
              Light Mode
            </a>
            <a className='mobile-nav-item' onClick={selectNavItem}>
              <div>
                <img id='side-svg' className='mobile-icon' src='/src/assets/reload.svg'></img>
              </div>
              Reload
            </a>
          </div>
      </div>
    </div>
    <div className='top-nav'>
      <div className='top-div'>
        <p className='p-styles'>Emu Cloud</p>
        <img className='logout-svg' src='/src/assets/logout.svg' onClick={logout}/>
      </div>
      <hr className='top-line'/>
    </div>
    
  </div>
  );
}

export default SideNav;