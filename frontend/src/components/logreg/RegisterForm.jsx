import React from 'react';
import './Login.css';



function RegisterForm() {

    return (
      <form>
        <div className="input-container">
          <label>
            Username
          <input type="text" />
          </label>
          <label>
            Email &nbsp;&nbsp;  
            <input type="text" />
          </label>
          <label>
            Password
            <input type="password" />
          </label>

          

          <div className="button-container">
            <button type="button">
              <img className="select-icon" src="../../src/assets/chevron_right.svg" alt="SVG Icon" />
              <p>Register</p>
            </button>
            <a href="/Forgot" className="forgotPasswordReg" type="button">
              <img className="select-icon" src="../../src/assets/chevron_right.svg" alt="SVG Icon" />
              <p>forgot password</p>
            </a>
          </div>
        </div>
    </form>
    );
}

export default RegisterForm;