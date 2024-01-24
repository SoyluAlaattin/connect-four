import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

// Definition of the GameList component
const GameList = () => {
  const [rows, setRows] = useState([]); // State for storing game history
  const navigate = useNavigate(); // Hook for navigation

  // useEffect hook to run when the component mounts
  useEffect(() => {
    const gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || []; // Fetching game history from localStorage
    setRows(gameHistory); // Setting the game history to the state
  }, []);

  // Column definitions for DataGrid
  const columns = [
    { field: "player", headerName: "PLAYER", width: 150 },
    { field: "result", headerName: "RESULT", width: 150 },
    { field: "gameName", headerName: "GAME NAME", width: 150 },
  ];

  // Function to start a new game
  const handleStart = () => {
    navigate("/game"); // Navigates to the '/game' route
  };

  // Style definitions
  const styles = {
    container: {
      height: "calc(100vh - 60px)",
      width: "100%",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    header: {
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
    },
    dataGrid: {
      height: 400,
      width: "70%",
      backgroundColor: "#fff",
      margin: "20px 0",
    },
    startButton: {
      padding: "10px 20px",
      cursor: "pointer",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
    },
  };

  // JSX structure to be rendered by the component
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>GAME HISTORY</h1>
      <DataGrid
        rows={rows
          .map((row, index) => ({
            id: index + 1, // Assigns a unique id to each row
            player: row.player,
            result: row.result,
            gameName: row.gameName,
          }))
          .reverse()} // Displays the game history in reverse order
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        style={styles.dataGrid}
      />

      <button onClick={handleStart} style={styles.startButton}>
        Start
      </button>
    </div>
  );
};

export default GameList;
