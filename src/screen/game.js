import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

const ROWS = 6;
const COLUMNS = 7;
const WINNING_LENGTH = 4;

const Game = () => {
  const [grid, setGrid] = useState(createEmptyGrid()); // Oyun tahtasını temsil eden grid'i tutar
  const [currentPlayer, setCurrentPlayer] = useState("Player"); // Sıradaki oyuncuyu tutar
  const [gameOver, setGameOver] = useState(false); // Oyunun bitip bitmediğini kontrol eder
  const [playerName, setPlayerName] = useState(
    localStorage.getItem("username")
  ); // Oyuncu adını saklar
  const [gameHistory, setGameHistory] = useState([]); // Oyun geçmişini saklar
  const [gameName, setGameName] = useState(localStorage.getItem("gameName")); // Oyun adını saklar
  const [playerColor, setPlayerColor] = useState(
    localStorage.getItem("playerColor")
  ); // Oyuncu rengini saklar
  const [backgroundColor, setBackgroundColor] = useState(
    localStorage.getItem("backgroundColor")
  ); // Arka plan rengini saklar

  useEffect(() => {
    if (gameOver) {
      // Oyun bittiğinde bir toast mesajı görüntüler
      toast.loading('PLEASE REFRESH THE PAGE TO START THE NEW GAME', {
        position: 'top-center',
        duration: 7000,
      });
    }
  }, [gameOver]);

  function checkForDraw(grid) {
    return grid.every((row) => row.every((cell) => cell !== null)); // Oyunun berabere olduğunu kontrol eder
  }

  useEffect(() => {
    const savedGameHistory =
      JSON.parse(localStorage.getItem("gameHistory")) || [];
    setGameHistory(savedGameHistory); // Oyun geçmişini localStorage'dan alır ve günceller
  }, []);

  useEffect(() => {
    if (gameOver === "draw") {
      setTimeout(() => {
        resetGame();
      }, 2000); // Berabere durumunda oyunu sıfırlar
    }
    if (gameOver && playerName) {
      const result =
        gameOver === "draw"
          ? "DRAW"
          : currentPlayer === "Player"
          ? "WİNNER"
          : "GAME OVER";

      const storedHistory =
        JSON.parse(localStorage.getItem("gameHistory")) || [];

      const newGame = {
        player: playerName,
        result,
        gameName,
      };

      const updatedHistory = [...storedHistory, newGame];

      localStorage.setItem("gameHistory", JSON.stringify(updatedHistory)); // Oyun geçmişini günceller
      setGameHistory(updatedHistory);

      console.log(result);
    } else if (currentPlayer === "Bilgisayar" && !gameOver) {
      setTimeout(() => {
        makeComputerMove(grid); // Bilgisayarın hamlesini yapar
      }, 300);
    }
  }, [gameOver, currentPlayer]);

  function createEmptyGrid() {
    return Array(ROWS)
      .fill(null)
      .map(() => Array(COLUMNS).fill(null)); // Başlangıçta boş bir oyun tahtası oluşturur
  }

  function resetGame() {
    setGrid(createEmptyGrid()); // Oyunu sıfırlar
    setCurrentPlayer("Player");
    setGameOver(false);
  }

  function placeDisc(columnIndex) {
    if (gameOver) return;

    for (let row = ROWS - 1; row >= 0; row--) {
      if (!grid[row][columnIndex]) {
        const newGrid = grid.map((row) => [...row]);
        newGrid[row][columnIndex] = currentPlayer; // Oyuncunun taşını tahtaya koyar
        setGrid(newGrid);
        if (checkForWin(newGrid, row, columnIndex, currentPlayer)) {
          setGameOver(currentPlayer); // Kazananı kontrol eder
        } else if (checkForDraw(newGrid)) {
          setGameOver("draw"); // Beraberlik kontrolü
        } else {
          setCurrentPlayer(
            currentPlayer === "Player" ? "Bilgisayar" : "Player"
          ); // Sıradaki oyuncuyu değiştirir
        }
        break;
      }
    }
  }

  function makeComputerMove(grid) {
    if (gameOver) return;

    const availableColumns = [];
    for (let col = 0; col < COLUMNS; col++) {
      if (!grid[0][col]) {
        availableColumns.push(col);
      }
    }

    if (availableColumns.length === 0) {
      setGameOver("draw");
      return;
    }

    const randomColumn =
      availableColumns[Math.floor(Math.random() * availableColumns.length)];

    for (let row = ROWS - 1; row >= 0; row--) {
      if (!grid[row][randomColumn]) {
        const newGrid = grid.map((row) => [...row]);
        newGrid[row][randomColumn] = currentPlayer;
        setGrid(newGrid);

        if (checkForWin(newGrid, row, randomColumn, currentPlayer)) {
          setGameOver("Kaybetti");
        } else if (checkForDraw(newGrid)) {
          setGameOver("draw");
        } else {
          setCurrentPlayer(
            currentPlayer === "Player" ? "Bilgisayar" : "Player"
          );
        }

        break;
      }
    }
  }

  function checkForWin(grid, row, col, player) {
    return (
      checkVertical(grid, row, col, player) ||
      checkHorizontal(grid, row, col, player) ||
      checkDiagonalRight(grid, row, col, player) ||
      checkDiagonalLeft(grid, row, col, player)
    );
  }

  function checkVertical(grid, row, col, player) {
    let count = 1;
    let r = row + 1;
    while (r < ROWS && grid[r][col] === player) {
      count++;
      r++;
    }
    r = row - 1;
    while (r >= 0 && grid[r][col] === player) {
      count++;
      r--;
    }
    return count >= WINNING_LENGTH;
  }

  function checkHorizontal(grid, row, col, player) {
    let count = 1;
    let c = col + 1;
    while (c < COLUMNS && grid[row][c] === player) {
      count++;
      c++;
    }
    c = col - 1;
    while (c >= 0 && grid[row][c] === player) {
      count++;
      c--;
    }
    return count >= WINNING_LENGTH;
  }

  function checkDiagonalRight(grid, row, col, player) {
    let count = 1;
    let r = row + 1;
    let c = col + 1;
    while (r < ROWS && c < COLUMNS && grid[r][c] === player) {
      count++;
      r++;
      c++;
    }
    r = row - 1;
    c = col - 1;
    while (r >= 0 && c >= 0 && grid[r][c] === player) {
      count++;
      r--;
      c--;
    }
    return count >= WINNING_LENGTH;
  }

  function checkDiagonalLeft(grid, row, col, player) {
    let count = 1;
    let r = row + 1;
    let c = col - 1;
    while (r < ROWS && c >= 0 && grid[r][c] === player) {
      count++;
      r++;
      c--;
    }
    r = row - 1;
    c = col + 1;
    while (r >= 0 && c < COLUMNS && grid[r][c] === player) {
      count++;
      r--;
      c++;
    }
    return count >= WINNING_LENGTH;
  }

  const styles = {
    gameContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "20px",
    },
    title: {
      fontSize: "100px",
      marginBottom: "10px",
    },
    gridContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "40px",
      border: "5px solid #333",
      borderRadius: "10px",
      boxShadow: "0px 0px 5000px rgba(0, 0, 0, 99.5)",
    },
    grid: {
      padding: "10px",
      position: "relative",
    },
    sideCell: {
      width: "50px",
      height: "50px",
      border: "1px solid black",
      borderRadius: "50%",
      backgroundColor: "#FFFFFF",
      margin: "5px",
    },
    row: {
      display: "flex",
    },
    
    cell: (color) => ({
      width: "50px",
      height: "50px",
      border: "1px solid black",
      borderRadius: "50%",
      backgroundColor: color || "#FFFFFF",
      margin: "5px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
    }),
    winningText: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "60px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.gameContainer}>
      <Toaster />
      <h1 style={styles.title}>{gameName || "Connect 4"}</h1>
      <div style={{ backgroundColor: backgroundColor }}>
        <div style={styles.grid}>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <div
                  key={columnIndex}
                  style={styles.cell(
                    cell === "Player" ? playerColor : cell === "Bilgisayar" ? "black" : undefined
                  )}
                  onClick={() => placeDisc(columnIndex)}
                  className={cell === null ? "droppingPiece" : ""}
                />
              ))}
            </div>
          ))}
          {gameOver && (
            <div style={styles.winningText}>
              {gameOver === "draw"
                ? "DRAW!"
                : gameOver === "Player"
                ? "WİNNER!"
                : "GAMEOVER!"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
