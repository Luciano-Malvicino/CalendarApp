import React from 'react';
import './Login.css';



function PasswordForm() {

    return (
      <form>
        <div className="input-container">
          <label>
            New Password
            <input className="password" type="text" />
          </label>

          

          <div className="button-container">
            <button type="button">
              <img className="select-icon" src="../../src/assets/chevron_right.svg" alt="SVG Icon" />
              <p>Recover Password</p>
            </button>
          </div>
        </div>
    </form>
    );
}

export default PasswordForm;