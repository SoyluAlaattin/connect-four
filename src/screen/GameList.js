import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

const GameList = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
    setRows(gameHistory);
  }, []);

  const columns = [
    { field: "id", headerName: "Sıra", width: 90 },
    {
      field: "player",
      headerName: "Oyuncu",
      width: 150,
      valueGetter: (params) => `${params.row.playerName} VS Bilgisayar`,
    },
    {
      field: "result",
      headerName: "Sonuç",
      width: 130,
    },
  ];

  const handleStart = () => {
    navigate("/game");
  };

  const styles = {
    container: {
      height: "calc(100vh - 60px)", // Ekrandan biraz daha az yükseklik
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
      <h1 style={styles.header}>Oyun Geçmişi</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        style={styles.dataGrid}
      />
      <button onClick={handleStart} style={styles.startButton}>
        Start
      </button>
    </div>
  );
};

export default GameList;
