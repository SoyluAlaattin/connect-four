import React, { useState, useEffect } from "react";

const ROWS = 6;
const COLUMNS = 7;
const WINNING_LENGTH = 4;

const Game = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [currentPlayer, setCurrentPlayer] = useState("Player");
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState(
    localStorage.getItem("username")
  );
  const [gameHistory, setGameHistory] = useState([]);
  const [gameName, setGameName] = useState(localStorage.getItem("gameName"));
  function checkForDraw(grid) {
    return grid.every((row) => row.every((cell) => cell !== null));
  }
  useEffect(() => {
    const savedGameHistory =
      JSON.parse(localStorage.getItem("gameHistory")) || [];
    setGameHistory(savedGameHistory);
  }, []);

  useEffect(() => {
    console.log(grid);
  }, [grid]);

  useEffect(() => {
    if (gameOver === "draw") {
      setTimeout(() => {
        resetGame();
      }, 2000); // 2 saniye sonra sıfırla
    }
    if (gameOver && playerName) {
      const result =
        gameOver === "draw"
          ? "Berabere"
          : currentPlayer === "Player"
          ? "Kazandınız"
          : "Kaybettiniz";

      const storedHistory =
        JSON.parse(localStorage.getItem("gameHistory")) || [];

      const newGame = {
        player: playerName,
        result,
        gameName,
      };

      const updatedHistory = [...storedHistory, newGame];

      localStorage.setItem("gameHistory", JSON.stringify(updatedHistory));
      setGameHistory(updatedHistory);

      console.log(result);
    } else if (currentPlayer === "Bilgisayar" && !gameOver) {
      setTimeout(() => {
        makeComputerMove(grid);
      }, 100);
    }
  }, [gameOver, currentPlayer]);

  function createEmptyGrid() {
    return Array(ROWS)
      .fill(null)
      .map(() => Array(COLUMNS).fill(null));
  }

  function resetGame() {
    setGrid(createEmptyGrid());
    setCurrentPlayer("Player");
    setGameOver(false);
  }

  function placeDisc(columnIndex) {
    if (gameOver) return;

    for (let row = ROWS - 1; row >= 0; row--) {
      if (!grid[row][columnIndex]) {
        const newGrid = grid.map((row) => [...row]);
        newGrid[row][columnIndex] = currentPlayer;
        setGrid(newGrid);
        if (checkForWin(newGrid, row, columnIndex, currentPlayer)) {
          setGameOver(currentPlayer);
        } else if (checkForDraw(newGrid)) {
          // Beraberlik kontrolü eklendi
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

        // Kazanma ve beraberlik kontrolü
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
      marginBottom: "40px",
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
      fontSize: "48px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.gameContainer}>
     

      <h1 style={styles.title}>{gameName || "Connect 4"}</h1>
      <div style={styles.gridContainer}>
        <div style={styles.grid}>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <div
                  key={columnIndex}
                  style={styles.cell(
                    cell === "Player"
                      ? "red"
                      : cell === "Bilgisayar"
                      ? "yellow"
                      : undefined
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
                ? "Berabere!"
                : gameOver === "Player"
                ? "Kazandınız!"
                : "Kaybettiniz!"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
