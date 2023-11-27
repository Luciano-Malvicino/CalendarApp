import React, { useEffect } from 'react';

function Testt() {
  // Move the handleLogin function inside the component scope
  const handleLogin = async (event) => {
    try {
      console.log('hello1');
      event.preventDefault();

      const response = await fetch('http://localhost:3000/api/getAllFiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success === true) {
          console.log('Logged In');
        } else {
          console.log('Failed to login');
        }
      }
    } catch (error){
      console.error('Error during fetch:', error);
      return;
    }
  };

  useEffect(() => {
    // The rest of your useEffect logic
  }, []); // Make sure to add the missing dependencies if needed

  return (
    <div className="button-container">
      {/* Bind a button to the handleLogin function */}
      <button onClick={handleLogin}>Handle Content</button>
    </div>
  );
}

export default Testt;
