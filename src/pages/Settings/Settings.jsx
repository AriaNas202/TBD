import React, { useEffect, useState } from 'react';
import spotifylogo1 from "../../asset/spotifylogo-1.png";
import openEye from "../../asset/eyeOpen.png";
import closedEye from "../../asset/eyeClosed.png"
import "./settingsStyle.css";
import xSign from "../../asset/x-sign.png";
import { useNavigate } from 'react-router-dom';
import './mobile.css'; // Adjust the path as needed


export const Settings = () => {

  const navigate = useNavigate();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false); // State for overlay visibility
  const [name, setName] = useState(''); // State for name input value
  const [email, setEmail] = useState('');

  // State for the first password field (Current Password)
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // State for the second password field (Change Password)
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);


  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible); // Toggle the overlay visibility
  };



  const [spotifyName, setSpotifyName] = useState('');

  useEffect(() => {
    // Fetch the Spotify name from the backend
    fetch('https://se-prod.cse.buffalo.edu/CSE442/2024-Fall/cse-442l/php/getSpotifyName.php', {
      method: 'GET',
      credentials: 'include', // Ensure session cookies are included
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.spotifyName) { // Check for the correct property
          setSpotifyName(data.spotifyName); // Set the Spotify name
          localStorage.setItem('spotifyName', JSON.stringify(data.spotifyName)); // Store locally for caching
        } else {
          console.error('No Spotify name found in response:', data);
        }
      })
      .catch(err => console.error('Error fetching Spotify Name:', err));
  }, []);




  







// Placeholder for upload photo function
const handleUploadPhoto = () => {
  console.log("Photo uploaded!"); // Replace with your upload logic
  toggleOverlay(); // Close the overlay after action
};

  // Handle Name change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle Email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

const handlePasswordChange = (e) => {
  setPassword(e.target.value);
};

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword); // Toggle the password visibility
};

const handleNewPasswordChange = (e) => {
  setNewPassword(e.target.value);
};

const toggleNewPasswordVisibility = () => {
  setShowNewPassword(!showNewPassword);
};


const [message, setMessage] = useState(null); // To handle the response message


 // Function to handle form submission
 const handleSubmit = async (e) => {

  e.preventDefault();

  const formData = {
    username: name,
    email,
    password,
    confirm_password: newPassword,
  };

  try {
    const response = await fetch("https://se-prod.cse.buffalo.edu/CSE442/2024-Fall/cse-442l/php/update_settings.php", {
      method: "POST",
      credentials: 'include', // Ensure session cookies are included
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Send the form data as JSON
    });

    const result = await response.json(); // Get the JSON response

    // Handle success or error from the backend response
    if (result.success) {
      setMessage({ text: result.message, type: "success" });
    } else {
      setMessage({ text: result.message, type: "error" });
    }
  } catch (error) {
    setMessage({ text: "An error occurred. Please try again.", type: "error" });
  }
};







// State to control overlay visibility
const [isDeleteOverlayVisible, setDeleteOverlayVisible] = useState(false);

// Function to toggle the delete account overlay
const toggleDeleteOverlay = () => {
  setDeleteOverlayVisible(!isDeleteOverlayVisible);
};

// Function to handle deletion logic
const handleDeleteAccount = () => {
  console.log("Account deleted.");
  // Add your delete logic here
  toggleDeleteOverlay(); // Hide the overlay after deletion
};



const [friendName, setFriendName] = useState('');
  const [notifications, setNotifications] = useState([]);

  // Function to handle adding a friend
  const handleAddFriend = () => {
    if (friendName.trim()) {
      setNotifications([...notifications, `Friend request sent to ${friendName}`]);
      setFriendName(''); // Clear the input after sending
    }
  };




  const [username, setUsername] = useState(''); // State to hold the username
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to manage error



    useEffect(() => {
      // Function to fetch username
      const fetchUsername = async () => {
          try {
              const response = await fetch('https://se-prod.cse.buffalo.edu/CSE442/2024-Fall/cse-442l/php/getUsername.php', {
                  method: 'GET',
                  credentials: 'include', // Include credentials if necessary
              });

              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }

              const data = await response.json();
              if (data.success) {
                  setUsername(data.username); // Update state with username
              } else {
                  setError(data.message); // Handle any error messages from the backend
              }
          } catch (err) {
              setError(err.message); // Set error state if the fetch fails
          } finally {
              setLoading(false); // Stop loading regardless of success or failure
          }
      };
      fetchUsername();
    }, []); // Empty dependency array means this runs once on mount

    // Render loading or error message if applicable
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

   









  return (
    <div className="desktop">
      <div className="contain">




        {/*FRIENDS MANAGEMENT!!!!*/}
        <div className="friends-tab">

          {/* Overlay shown on hover */}
      <div className="coming-soon-overlay">Coming Soon</div>

      <h1>Manage Friends</h1>
      <div className="notifications">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="notification">
              {notification}
            </div>
          ))
        ) : (
          <div className="notification">No notifications</div>
        )}
      </div>






      <div className="add-friend">
        <input
          type="text"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
          placeholder="Enter friend's name"
          className="friend-input"
        />
        <button className="add-button" onClick={handleAddFriend}>
          +
        </button>
      </div>


    </div>
  
























{/*CHANGE INFO*/}
        
        <div className="infoChange">
          
            <div className="infoPurpleBox">
              <div className="name">Name</div>


        {/*TEXT BOX FOR NAME*/}
              
              <input 
               type="text" 
              id="nameInput" 
              value={name} 
              onChange={handleNameChange} // Update state on change
              placeholder="Current Name" // Placeholder text
              className="name-input" // Add a class for styling
             />

            <input 
            type="email" 
            id="emailInput" 
            value={email} 
            onChange={handleEmailChange} // Update state on change
            placeholder="Current Email" // Placeholder text
            className="email-input" // Add a class for styling
            />

      {/* Button to Confirm Update */}
              {/* Button to Confirm Update */}
      <button 
    className="updateButton" 
    onClick={handleSubmit}  // Connect the handleSubmit function to the button's onClick event
>
    Update
</button>




          <div className="email">Email</div>
          <div className="password">Password</div>
          <div className="confirmPassword">Confirm Password</div>
          
      <div className="password-input-container">
        <input 
          type={showPassword ? 'text' : 'password'} // Toggle between text and password
          id="passwordInput" 
          value={password} 
          onChange={handlePasswordChange} 
          placeholder="Password..." 
          className="password-input" 
        />
         <button className="toggle-password" onClick={togglePasswordVisibility}>
          <img 
            src={showPassword ? closedEye : openEye} // Toggle between the icons
            alt="Toggle Password Visibility" 
            className="toggle-password-icon" 
          />
        </button>
      </div>



      <div className="password-input-container2">
        <input 
          type={showNewPassword ? 'text' : 'password'}
          id="newPasswordInput"
          value={newPassword}
          onChange={handleNewPasswordChange}
          placeholder="Confirm Password..."
          className="password-input2"
        />
        <button className="toggle-password2" onClick={toggleNewPasswordVisibility}>
          <img 
            src={showNewPassword ? closedEye : openEye}
            alt="Toggle New Password Visibility"
            className="toggle-password-icon2"
          />
        </button>
      </div>




            </div>
        </div>








































        {/*SIGN OUT and DELETE ACCOUNT !!!! */}
        <div className="account-management">
          <div className="accManagementBox">
          <span className="signOut" onClick={() => navigate('/')}>
  Sign Out
</span>

<span className="deleteAcc" onClick={toggleDeleteOverlay}>
  Delete Account
</span>

          </div>
        </div>



















       {/* Delete Account Overlay */}
{/* Delete Account Overlay */}
{isDeleteOverlayVisible && (
  <div className="delOverlay">
    <div className="delOverlay-content">
      <h1>Account Deletion</h1>
      <h2>Are You Sure You Want to Delete This Account?</h2>
      <h3>Warning: This Action is Permanent</h3>
      <div className="delOverlay-buttons">
      <button
  className="delete-button" onClick={() => { handleDeleteAccount(); navigate('/'); }}
>
  Delete
</button>

        <button className="cancel-button" onClick={toggleDeleteOverlay}>Cancel</button>
      </div>
    </div>
  </div>
)}





{/*USERNAME PROFILE PIC*/}
<button
  className="cancel-instance"
  style={{
    border: "none",
    background: "transparent",
    fontSize: "50px",
    cursor: "pointer",
    padding: "5px",
  }}
  aria-label="Cancel"
  onClick={() => navigate('/home')} // Navigates to /home when clicked
>
  <img 
    src={xSign} 
    alt="Cancel"
    
  />
</button>




{/*USERNAME PROFILE PIC*/}
        <div className="mainProfile">
          
            <div className="mainProfilePic" />

            <button 
              className="changePicButt" 
              onClick={toggleOverlay} // Open overlay on click
            >
              <div className="coming-soon-overlay">Coming Soon</div>
              Change Photo
            </button>

          {/* Overlay profile pic */}
          {isOverlayVisible && (
            <div className="overlay">
              <div className="overlay-content">
                <h1>Change Profile Photo</h1>
                <h3>Your Photo Must be 200x200</h3>
                <div className="overlay-buttons">
                  <button onClick={handleUploadPhoto}>Upload Photo</button>
                  <button onClick={toggleOverlay}>Cancel</button>
                </div>
              </div>
            </div>
          )}
            
           
            <div className="username" style={{ fontSize: '35px' }}>{username}</div>
            

        </div>




















        {/*Spotify Link Section */}
        <div className="spotify-tab">
          <div className="spotifyBox">
            <div className="spotifyCustomLogo">
              
                <div className="ellipse" />
                <img className="spotifyLogoPic" alt="Spotifylogo" src={spotifylogo1} />
              


            </div>
            
           


            <div className="spotifyName">{spotifyName || 'Not Connected'}</div>


            <div className="spotifyButtonBox">

              {/*Spotify Button*/}
              <button 
              className="spotifyButton" 
              onClick={() => navigate('/spotify')} // Navigate to Spotify when clicked
              >
               Use Different Account
              </button>




            </div>
          </div>
        </div>









        <div className="pageSettingsLabel">Settings</div>







      </div>
    </div>
  );
};