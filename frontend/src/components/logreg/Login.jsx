import React, { useEffect } from 'react';
import {createRoot } from 'react-dom/client'; // Import ReactDOM
import './Login.css';
import { createPortal } from 'react-dom';
import LoginForm from './LoginForm.jsx';

function Login() {
  useEffect(() => {
    const handleResize = () => {
      const canvas = document.getElementById('backgroundCanvas');
      const ctx = canvas.getContext('2d');
      const backgroundImage = new Image();
      backgroundImage.src = './../../src/assets/gameboyback.png';

      backgroundImage.onload = () => {
        // Remove the existing marker div
        const existingMarkerDiv = document.getElementById('markerDiv');
        if (existingMarkerDiv) {
          removeExistingMarkerDivs();
        }
        
        drawCanvas(ctx, canvas, backgroundImage);
        drawCanvas(ctx, canvas, backgroundImage);

      };
    };

    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const drawCanvas = (ctx, canvas, backgroundImage) => {
    removeExistingMarkerDivs();
    const targetColor = [112, 110, 115, 255]; // Example: red color, adjust as needed
    const markerSize = 1;

    // Calculate the center of the image
    const centerX = backgroundImage.width / 2;
    const centerY = backgroundImage.height / 2;

    const screenWidth = Math.max(900, window.innerWidth);
    const screenHeight = Math.min(600, window.innerHeight);

    /*
    console.log('height');
    console.log(screenHeight);
    console.log('width');
    console.log(screenWidth);
    */

    // Calculate the crop dimensions based on the center
    const cropWidth = screenWidth * 0.7; // Adjust these values based on your cropping requirements
    const cropHeight = screenHeight * 1.4;

    const aspectRatio = canvas.width / canvas.height;
    const scale = Math.max(cropWidth / canvas.width, cropHeight / canvas.height);
    const scaledWidth = canvas.width * scale;
    const scaledHeight = canvas.height * scale;
    const cropX = Math.max(0, centerX - scaledWidth / 2);
    const cropY = Math.max(0, centerY - scaledHeight / 2);

    /*
    console.log("This is my cropped width:" + cropWidth)
    console.log("This is my cropped height:" + cropHeight)
    console.log("This is my crop X: " + cropX);
    console.log("This is my crop Y: " + cropY);
    console.log("This is my scaled width: " + scaledWidth);
    console.log("This is my scaled height: " + scaledHeight);
    console.log("This is my scale: " + scale);
    console.log("This is my canvas height: " + canvas.height);
    console.log("This is my canvas width: " + canvas.width);
 
    */
    const xScale = window.innerWidth / cropWidth;
    const yScale = window.innerHeight / cropHeight;

    /*
    console.log("Target X scale:" + 1.43)
    console.log("Target Y scale:" + 1.46)
    */
    // Set the canvas size to match the cropped dimensions
    canvas.width = cropWidth;
    canvas.height = cropHeight;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the cropped background image
    ctx.drawImage(
      backgroundImage,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Find the first occurrence of a specific pixel color
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let found = false;

    // Coordinates of the top-left corner of the matching area
    let startX = 0;
    let startY = 0;
    
    // Coordinates of the bottom-right corner of the matching area
    let endX = 0;
    let endY = 0;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
    
      // Check if the pixel color matches the target color
      if (r === targetColor[0] && g === targetColor[1] && b === targetColor[2] && a === targetColor[3]) {
        found = true;
    
        // Update the extent of the matching area
        if (startX === 0 && startY === 0) {
          startX = i / 4 % canvas.width;
          startY = Math.floor(i / 4 / canvas.width);
        } else {
          endX = i / 4 % canvas.width;
          endY = Math.floor(i / 4 / canvas.width);
        }
      }
    }
    
    if (found) {
      // Calculate the size of the matching area
      const areaWidth = endX - startX + 1;
      const areaHeight = endY - startY + 1;
    
      // Create a yellow div around the found area
    
      const markerDiv = document.getElementById('markerDiv')
      markerDiv.className = 'markerDiv'; // Added class for easier removal
      markerDiv.style.position = 'absolute';
      markerDiv.style.top = `${(startY - markerSize / 2) * yScale}px`;
      markerDiv.style.left = `${(startX - markerSize / 2) * xScale}px`;
      markerDiv.style.width = `${areaWidth * xScale}px`;
      markerDiv.style.height = `${areaHeight * yScale}px`;
    } else {
      console.log('Target color not found.');
    }
  };

  const canvasStyles = {
    zIndex: -1,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#A2ACCA',
  };

  const loginDivStyles = {
    position: 'absolute',
    top: '10px', // Adjust as needed
    left: '50%',
    transform: 'translateX(-50%)', // Center the div horizontally
    textAlign: 'center',
    width: '100%', // Full width
  };

  const clearMarkerDivStyles = () => {
    const existingMarkerDivs = document.querySelectorAll('.markerDiv');
  
    existingMarkerDivs.forEach((div) => {
      div.style = ''; // Clear all styles
    });
  };
  
  // ...
  
  const removeExistingMarkerDivs = () => {
    clearMarkerDivStyles();
  };
  

  const handleClick = () => {
    // Replace '/your-target-page' with the actual path of the page you want to navigate to
    window.location.href = '/Login';
  };

  return (
    <div >
      <div id="markerDiv">
          <LoginForm />
      </div>
      <canvas id="backgroundCanvas" style={canvasStyles}>
      </canvas>
      <div style={loginDivStyles}>
        <h1  className="logo" onClick={handleClick}>Emu  Cloud</h1>
      </div>
    </div>
  );
}

export default Login;
