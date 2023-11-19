import React, { useEffect } from 'react';
import './Login.css';



function LoginForm() {

    return (
      <form>
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
            <button type="button">
              <img className="select-icon" src="../../src/assets/chevron_right.svg" alt="SVG Icon" />
              <p>Register</p>
            </button>
            <button className="forgotPassword" type="button">
              <img className="select-icon" src="../../src/assets/chevron_right.svg" alt="SVG Icon" />
              <p>forgot password</p>
            </button>
          </div>
        </div>
    </form>
    );
}

export default LoginForm;