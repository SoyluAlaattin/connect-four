import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const GameList = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
    setRows(gameHistory);
  }, []);

  const columns = [
    { field: "player", headerName: "PLAYER", width: 150 },
    { field: "result", headerName: "RESULT", width: 150 },
    { field: "gameName", headerName: "GAME NAME", width: 150 },
  ];
  const handleStart = () => {
    navigate("/game");
  };

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
      width: "100%",
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

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>GAME HISTORY
</h1>
      <DataGrid
        rows={rows
          .map((row, index) => ({
            id: index + 1,
            player: row.player,
            result: row.result,
            gameName: row.gameName,
          }))
          .reverse()} // rows dizisini ters çevirin
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