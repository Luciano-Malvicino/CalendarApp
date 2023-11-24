import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate, useParams} from 'react-router-dom';



function PasswordForm({token}) {
    
    const navigate  = useNavigate ();
    const [password, setPassword] = useState('');
    let email;
    
    useEffect(() => {
      // Use the useEffect hook to perform side effects, such as navigation
      const fetchData = async () => {
        // If token is undefined, navigate to '/Forgot'
        if (token === undefined) {
          navigate('/Forgot');
          return; // Exit early to avoid further execution
        }
  
        try {
          const response = await fetch('http://localhost:3000/api/verifyToken', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
  
          if (response.ok) {
            const data = await response.json();
  
            if (data.success === true) {
              console.log('Valid Token');
            } else {
              navigate('/Login');
              console.log('Failed to login');
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(); // Call the async function immediately
  
      // No cleanup function needed here
  
      // Include 'token' in the dependency array if needed
    }, [token]);

    const handleReset = async (event) => {
      try{
        console.log('Attempting Password Change');
        event.preventDefault(); // Prevent the default form submission behavior
        
        const response = await fetch('http://localhost:3000/api/Reset',{
          method: 'POST',
          headers : {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify({token , password})
        });

      if(response.ok)
      {
        const data = await response.json();

        if(data.success == true)
        {
          console.log("User Password Reset");
          navigate ('/Login');
        }
        else
        {
          console.log("Invalid Token or other error");
        }

      }
    }
    catch {
      return
    }
  }



    return (
      <form className='login-reg-form' onSubmit={handleReset}>
        <div className="input-container">
          <label>
            New Password
            <input className="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <div className="button-container">
            <button className="response-button" type="submit">
              <img className="select-icon" src="../../src/assets/chevron_right.svg" alt="SVG Icon" />
              <p>Reset Password</p>
            </button>
          </div>
        </div>
    </form>
    );
}

export default PasswordForm;