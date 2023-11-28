import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import './Login.css';



function RegisterForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const navigate  = useNavigate ();

    const handleRegister = async (event) => {
      try{
        event.preventDefault(); // Prevent the default form submission behavior
        
        const response = await fetch('https://localhost:3000/api/Register',{
          method: 'POST',
          credentials: 'include',
          headers : {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify({username , password, email})
        });

      if(response.ok)
      {
        const data = await response.json();

        if(data.success == true)
        {
          console.log("Account Created")
          navigate ('/Login');
        }
        else if(data.success == false){
          console.log("Invalid Account Creation")
        }
        else
        {
          console.log("Failed to Register")
        }

      }
    }
    catch {
      return
    }
  }

    return (
      <form className='login-reg-form' onSubmit={handleRegister}>
        <div className="input-container">
          <label>
            Username
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </label>
          <label>
            Email &nbsp;&nbsp;  
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </label>

          

          <div className="button-container">
            <button type="submit">
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