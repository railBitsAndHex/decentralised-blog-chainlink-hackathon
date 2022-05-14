import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { useAccountsChanged, useNetworksChanged } from "./hooks/AuthHooks";
import Navbar from "./components/Navbar";

function App() {
  useAccountsChanged();
  useNetworksChanged();
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/profile-page" element={<ProfilePage />} />
            <Route path="/*" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
