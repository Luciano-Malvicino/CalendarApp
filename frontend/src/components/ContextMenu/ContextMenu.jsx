import React, { useState, useEffect, useRef } from 'react';
import './ContextMenu.css';

const ContextMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 }); // Add this line
  const contextMenuRef = useRef(null);

  const toggleContextMenu = (event) => {
    setIsVisible(!isVisible);
    const clickX = event.clientX;
    const clickY = event.clientY;
    setPosition({ top: clickY, left: clickX });
  };

  const closeContextMenu = () => {
    setIsVisible(false);
  };

  const handleMenuDelete = async (event) => {
    const gameName = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.game;
    console.log(gameName);
    const fileName = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.file;
    console.log(fileName);

    const response = await fetch(`https://localhost:3000/api/deleteFile`, {
      method: 'POST',
      credentials: 'include', // Add this line to include credentials
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({'gameName' : '/' + gameName + '/','fileName' : fileName + '.state'}),
    });

    const data = await response.json();

    if(response.ok)
    {
      console.log("Deleting");
      const container = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement
      if(data.success)
      {
        if(container)
        {
          container.remove();
        }
      }
    }

    console.log("Done");
    closeContextMenu();
  };

  const handleMenuDownload = async (event) => {
    // Handle menu item click actions here
    const gameName = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.game;
    console.log(gameName);
    const fileName = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.file;
    console.log(fileName);

    const response = await fetch(`https://localhost:3000/api/downloadFile`, {
      method: 'POST',
      credentials: 'include', // Add this line to include credentials
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({'gameName' : '/' + gameName + '/','fileName' : fileName + '.state'}),
    });

    const file = await response.blob();

    if(response.ok)
    {
      console.log("Test");
      const blobUrl = URL.createObjectURL(file);

      // Create a link element
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download =  fileName + '.state';

      // Trigger a click on the link to start the download
      link.click();

      // Clean up: revoke the Blob URL
      URL.revokeObjectURL(blobUrl);
    }

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
        <div className="context-menu" style={{ top: position.top, left: position.left }} onClick={closeContextMenu}>
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

