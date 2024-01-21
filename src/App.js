import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./screen/login";
import GameList from "./screen/GameList";
import Game from "./screen/game"; // Game bileşenini import edin

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate replace to="/games" />
            )
          }
        />
        <Route
          path="/games"
          element={isLoggedIn ? <GameList /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/game"
          element={isLoggedIn ? <Game /> : <Navigate replace to="/login" />}
        />

        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
