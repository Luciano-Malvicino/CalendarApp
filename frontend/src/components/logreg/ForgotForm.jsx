import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import './Login.css';



function ForgotForm() {

  const [email, setEmail] = useState('');
  
  const navigate  = useNavigate ();

  const handleForgot = async (event) => {
    try{
      event.preventDefault(); // Prevent the default form submission behavior
      
      const response = await fetch('https://localhost:3000/api/ForgotLink',{
        method: 'POST',
        credentials : 'include',
        headers : {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({email})
      });

      if(response.ok)
      {
        const data = await response.json();

        if(data.success == true)
        {
          navigate ('/Login');
        }
        else
        {
          console.log("failed to login")
        }

      }
    }
    catch {
      return
    }
  }

    return (
      <form className='login-reg-form' onSubmit={handleForgot}>
        <div className="input-container">
          <label className="Recover">
            Email &nbsp;&nbsp;  
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </label>

          

          <div className="button-container">
            <button className="response-button" type="submit">
              <img className="select-icon" src="../../src/assets/chevron_right.svg" alt="SVG Icon" />
              <p>Recover Password</p>
            </button>
          </div>
        </div>
    </form>
    );
}

export default ForgotForm;