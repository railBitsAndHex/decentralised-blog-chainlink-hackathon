import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { useNetworksChanged } from "./hooks/AuthHooks";
import Navbar from "./components/Navbar";
import CreateBlogPost from "./pages/CreateBlogPost";
import Blogfeed from "./pages/Blogfeed";
import { BlogpostProvider } from "./context/BlogpostContext";
import UpdateProfilePage from "./pages/UpdateProfilePage";

function App() {
  useNetworksChanged();
  return (
    <AuthProvider>
      <BlogpostProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/profile-page" element={<ProfilePage />} />
              <Route path="/create-post" element={<CreateBlogPost />} />
              <Route path="/blogfeed" element={<Blogfeed />} />
              <Route path="/update-profile" element={<UpdateProfilePage />} />
              <Route path="/*" element={<HomePage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </BlogpostProvider>
    </AuthProvider>
  );
}

export default App;
