import React, { useState, useEffect, useRef } from 'react';
import './ContextMenu.css';

const ContextMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const contextMenuRef = useRef(null);

  const toggleContextMenu = () => {
    setIsVisible(!isVisible);
  };

  const closeContextMenu = () => {
    setIsVisible(false);
  };

  const handleMenuDelete = () => {
    // Handle menu item click actions here
    console.log('Clicked on:', action);
    closeContextMenu();
  };

  const handleMenuDownload = () => {
    // Handle menu item click actions here
    console.log('Clicked on:', action);
    closeContextMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        closeContextMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="context-menu-container" ref={contextMenuRef}>
      <div className="menu-trigger" onClick={toggleContextMenu}>
        <img className='context-menu-icon' src='/src/assets/vertical.svg'/>
      </div>
      {isVisible && (
        <div className="context-menu" onClick={closeContextMenu}>
          <ul>
            <li onClick={handleMenuDownload}>
              <p className='context-text'>Download</p>
              <img id='context-svg' className='context-menu-icon-alt' src='/src/assets/download.svg'/>
            </li>
            <li onClick={handleMenuDelete}>
              <p className='context-text'>Delete</p>
              <img id='context-svg' className='context-menu-icon-alt' src='/src/assets/delete.svg'/>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContextMenu;

