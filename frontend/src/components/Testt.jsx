import React, { useEffect } from 'react';

function Testt() {
  // Move the handleLogin function inside the component scope
  const handleLogin = async (event) => {
    try {
      const pokemonResponse = await fetch('https://localhost:3000/api/listFiles?selectedPath=/pokemon/', {
        method: 'GET',
        credentials: 'include', // Add this line to include credentials
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await pokemonResponse.text();
      console.log(responseData);
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
