import React from 'react';
import './Login.css';



function ForgotForm() {

    return (
      <form className='login-reg-form'>
        <div className="input-container">
          <label className="Recover">
            Email &nbsp;&nbsp;  
            <input type="text" />
          </label>

          

          <div className="button-container">
            <button className="response-button" type="button">
              <img className="select-icon" src="../../src/assets/chevron_right.svg" alt="SVG Icon" />
              <p>Recover Password</p>
            </button>
          </div>
        </div>
    </form>
    );
}

export default ForgotForm;