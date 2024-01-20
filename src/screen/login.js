import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [discColor, setDiscColor] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      username &&
      backgroundColor &&
      discColor &&
      backgroundColor !== discColor
    ) {
      localStorage.setItem("username", username);
      localStorage.setItem("backgroundColor", backgroundColor);
      localStorage.setItem("discColor", discColor);
      onLogin();
    } else {
      alert(
        "Lütfen tüm alanları doğru şekilde doldurunuz ve farklı renkler seçiniz!"
      );
    }
  };

  const styles = {
    loginContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      padding: "20px",
    },
    inputGroup: {
      marginBottom: "20px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    input: {
      padding: "10px",
      width: "200px",
      margin: "10px 0",
    },
    colorPicker: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "20px 0",
    },
    button: {
      padding: "10px 20px",
      cursor: "pointer",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.loginContainer}>
      <h1>Connect 4</h1>
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
        <p>Arka Plan Rengi Seç:</p>
        <input
          type="color"
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </div>
      <div style={styles.colorPicker}>
        <p>Jeton Rengi Seç:</p>
        <input type="color" onChange={(e) => setDiscColor(e.target.value)} />
      </div>
      <button onClick={handleLogin} style={styles.button}>
        Devam Et
      </button>
    </div>
  );
};

export default Login;
