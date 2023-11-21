import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';// Update with your actual context import



function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const handleLogin = async (event) => {
      try{
        event.preventDefault(); // Prevent the default form submission behavior
        
        const response = await fetch('http://localhost:3000/api/login',{
          method: 'POST',
          header : {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify({username , password})
        });

      if(response.ok)
      {
        const data = await reponse.json();
      }
    }
    catch {
      return
    }
  }
    return (
      <form className='login-reg-form' onSubmit={handleLogin}>
        <div className="input-container">
          <label>
            Username
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          <div className="button-container">
            <button type="submit">
              <img className="select-icon" src="../../src/assets/chevron_right.svg" alt="SVG Icon" />
              <p>Login</p>
            </button>
            <a href="/Register" type="button">
              <img className="select-icon" src="../../src/assets/chevron_right.svg" alt="SVG Icon" />
              <p>Register</p>
            </a>
            <a href="/Forgot" className="forgotPassword" type="button">
              <img className="select-icon" src="../../src/assets/chevron_right.svg" alt="SVG Icon" />
              <p>forgot password</p>
            </a>
          </div>
        </div>
    </form>
    );
}

export default LoginForm;