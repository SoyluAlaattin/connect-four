import React, { useState, useEffect } from "react";

// Definition of the Login component
const Login = ({ onLogin }) => {
  // State declarations for username, background color, game name, and player color
  // Initialized with values from localStorage or an empty string if not available
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [backgroundColor, setBackgroundColor] = useState(
    localStorage.getItem("backgroundColor") || ""
  );
  const [gameName, setGameName] = useState(
    localStorage.getItem("gameName") || ""
  );
  const [playerColor, setPlayerColor] = useState(
    localStorage.getItem("playerColor") || ""
  ); // Added state for game name

  // Function called when the login process is initiated
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission
    if (username && backgroundColor && playerColor) { // If all fields are filled
      // Saving new values to localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("backgroundColor", backgroundColor);
      localStorage.setItem("playerColor", playerColor);
      localStorage.setItem("gameName", gameName);
      onLogin(); // Calling the onLogin callback function
    } else {
      alert("Please fill in all fields correctly!"); // Warning for missing fields
    }
  };

  // Function to update background color
  const updateBackgroundColor = (color) => {
    document.body.style.backgroundColor = "grey";
  };
  // Function to update player color
  const updatePlayerColor = (color) => {
    document.body.style.playerColor = color;
  };

  // useEffect hook to run when the component mounts
  useEffect(() => {
    // Fetching saved colors from localStorage and applying them
    const savedBackgroundColor = localStorage.getItem("backgroundColor");
    const savedPlayerColor = localStorage.getItem("playerColor");
    if (savedBackgroundColor) {
      updateBackgroundColor(savedBackgroundColor);
    }
    if (savedPlayerColor) {
      updatePlayerColor(savedPlayerColor);
    }
  }, []);

  // Style definitions
  const styles = {
    loginContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
      padding: "0px",
    },
    title: {
      fontSize: "150px", // Title font size
      fontWeight: "bold", // Title font weight
      marginBottom: "30px", // Space below the title
    },
    inputGroup: {
      marginBottom: "10px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    input: {
      padding: "20px",
      width: "200px",
      margin: "1px 0",
    },
    colorPicker: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "10px 0",
    },
    button: {
      padding: "25px 40px",
      cursor: "pointer",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      marginTop: "30px",
    },
  };

  // JSX structure to be rendered by the component
  return (
    <div style={styles.loginContainer}>
      <h1 style={styles.title}>CONNECT 4</h1>
      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="USER NAME"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="GAME NAME"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.colorPicker}>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>BOARD COLOR</p>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => {
            setBackgroundColor(e.target.value);
            updateBackgroundColor(e.target.value);
          }}
        />
      </div>
      <div style={styles.colorPicker}>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>GAMER COLOR</p>
        <input
          type="color"
          value={playerColor}
          onChange={(e) => {
            setPlayerColor(e.target.value);
            updatePlayerColor(e.target.value);
          }}
        />
      </div>
      <button onClick={handleLogin} style={styles.button}>
        CONTINUE
      </button>
    </div>
  );
};

export default Login;
