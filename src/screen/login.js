import React, { useState, useEffect } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [backgroundColor, setBackgroundColor] = useState(localStorage.getItem("backgroundColor") || "");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && backgroundColor) {
      localStorage.setItem("username", username);
      localStorage.setItem("backgroundColor", backgroundColor);
      onLogin();
    } else {
      alert(
        "Lütfen tüm alanları doğru şekilde doldurunuz!"
      );
    }
  };

  const updateBackgroundColor = (color) => {
    document.body.style.backgroundColor = color;
  };

  useEffect(() => {
    const savedBackgroundColor = localStorage.getItem("backgroundColor");
    if (savedBackgroundColor) {
      updateBackgroundColor(savedBackgroundColor);
    }
  }, []);

  const styles = {
    loginContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      padding: "20px",
    },
    title: { // CONNECT 4 yazısının stili
      fontSize: "150px", // Font büyüklüğü
      fontWeight: "bold", // Kalın font
      marginBottom: "30px", // Alt boşluk
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

  return (
    <div style={styles.loginContainer}>
      <h1 style={styles.title}>CONNECT 4</h1>
      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Kullanıcı Adınız"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.colorPicker}>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>Arka Plan Rengi Seç:</p>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => {
            setBackgroundColor(e.target.value);
            updateBackgroundColor(e.target.value);
          }}
        />
      </div>
      <button onClick={handleLogin} style={styles.button}>
        Devam Et
      </button>
    </div>
  );
};

export default Login;
