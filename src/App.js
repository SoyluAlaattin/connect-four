import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./screen/login"; // Login component
import GameList from "./screen/GameList"; // Game list component
import Game from "./screen/game"; // Game component
import { Toaster } from "react-hot-toast"; // Toast notification component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // User's session state

  const handleLogin = () => {
    setIsLoggedIn(true); // User login operation
  };
  const handleLogout = () => {
    setIsLoggedIn(false); // User logout operation
  };

  return (
    <Router> {/* Use React Router for client-side routing */}
      <Toaster /> {/* Toast component for notifications */}
      <Routes> {/* Routing paths */}
        <Route
          path="/login" // Define the path for "/login" URL
          element={
            !isLoggedIn ? (
              <Login onLogin={handleLogin} /> // Show the login component if the user is not logged in
            ) : (
              <Navigate replace to="/games" /> // Redirect to the "/games" page if the user is logged in
            )
          }
        />
        <Route
          path="/games" // Define the path for "/games" URL
          element={isLoggedIn ? <GameList /> : <Navigate replace to="/login" />} // Show the game list if the user is logged in. Redirect to the login page otherwise.
        />
        <Route
          path="/game" // Define the path for "/game" URL
          element={isLoggedIn ? <Game /> : <Navigate replace to="/login" />} // Show the game page if the user is logged in. Redirect to the login page otherwise.
        />
        <Route path="/" element={<Navigate replace to="/login" />} /> {/* Redirect to the login page if on the homepage ("/") */}
      </Routes>
    </Router>
  );
};

export default App; // Export as the application component
