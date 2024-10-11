import React, { useState } from 'react';
import './ForgotPass.css'; // Add this for styling
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Handle form submission 
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value; // Get the email value from the form input

    fetch('/CSE442/2024-Fall/cse-442l/php/reset-request.php', {
      method: 'POST',
      credentials: 'include', // Ensure session cookies are included
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ email }), // Use URLSearchParams to encode the body
    })  
      .then((response) => response.text())
      .then((data) => {
        alert(data); // Display the response message as an alert
      })
      .catch((err) => console.log(err));
  };

  // Handle the close button click to redirect to the login page
  const handleClose = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="forgotpass-container"> {/* Outer container to scope styles */}
      <div className="reset-container">
        <div className="reset-box">
          <button className="close-btn" onClick={handleClose}>X</button>
          <div className="logo">
            <div className="circle">
              <span>TBD</span>
            </div>
          </div>
          <h2>Reset Your Password</h2>
          <p>
            Enter the email address or username linked to your TBD account and we'll send you an email.
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Enter your email address:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <button type="submit" className="send-btn">Send Link</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;