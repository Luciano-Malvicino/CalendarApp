import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';// Update with your actual context import



function LoginForm() {

    return (
      <form className='login-reg-form'>
        <div className="input-container">
          <label>
            Username
          <input type="text" />
          </label>
          <label>
            Password
            <input type="password" />
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