import React, { useState, useEffect } from "react";

const ROWS = 6;
const COLUMNS = 7;
const WINNING_LENGTH = 4;

const Game = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [currentPlayer, setCurrentPlayer] = useState("Red");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver === "draw") {
      // Oyun berabere kaldığında sadece yeniden başlat
      resetGame();
    } else if (currentPlayer === "Yellow" && !gameOver) {
      // Bilgisayarın hamlesi
      setTimeout(() => {
        makeComputerMove(grid);
      }, 100); // Bilgisayarın hamlesi 100 milisaniye sonra yapılır
    }
  }, [gameOver, currentPlayer, grid]);

  function createEmptyGrid() {
    return Array(ROWS)
      .fill(null)
      .map(() => Array(COLUMNS).fill(null));
  }

  function resetGame() {
    setGrid(createEmptyGrid());
    setCurrentPlayer("Red");
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
          setGameOver(true);
        } else {
          setCurrentPlayer(currentPlayer === "Red" ? "Yellow" : "Red");
        }
        break;
      }
    }
  }

  function makeComputerMove(grid) {
    if (gameOver) return;

    // Rastgele bir sütun seç
    const availableColumns = [];
    for (let col = 0; col < COLUMNS; col++) {
      if (!grid[0][col]) {
        availableColumns.push(col);
      }
    }

    if (availableColumns.length === 0) {
      // Oyun berabere
      setGameOver("draw"); // Oyun berabere durumunu ayarla
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
          setGameOver(true);
        } else {
          setCurrentPlayer(currentPlayer === "Red" ? "Yellow" : "Red");
        }
        break;
      }
    }
  }

 // Kazananı kontrol et
function checkForWin(grid, row, col, player) {
    return (
      checkVertical(grid, row, col, player) ||
      checkHorizontal(grid, row, col, player) ||
      checkDiagonalRight(grid, row, col, player) ||
      checkDiagonalLeft(grid, row, col, player)
    );
  }
  
  // Dikey kontrol
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
  
  // Yatay kontrol
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
  
  // Sağ çapraz kontrol
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
  
  // Sol çapraz kontrol
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
  
  // İnline CSS Stilleri
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
      marginBottom: "40px", // İzgara ile başlık arasına boşluk ekledik
    },
    grid: {
      backgroundColor: "gray", // İzgaranın arka plan rengi gri olarak ayarlandı
      padding: "10px", // İzgaraya biraz iç boşluk ekledik
      position: "relative", // Kazanan çizgisini konumlandırmak için gerekli
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
      animation: "dropPieceAnimation 1s ease",
    }),
  };

  return (
    <div style={styles.gameContainer}>
      <h1 style={styles.title}>Connect 4</h1>
      <div style={styles.gridContainer}>
        <div style={styles.grid}>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <div
                  key={columnIndex}
                  style={styles.cell(
                    cell === "Red"
                      ? "red"
                      : cell === "Yellow"
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
              {gameOver === "draw" ? "Berabere!" : "Kazandın!"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
