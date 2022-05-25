import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { BlogpostProvider } from "./context/BlogpostContext";
import { ProfileProvider } from "./context/ProfileContext";
import { FollowProvider } from "./context/FollowContext";
import { TxProvider } from "./context/TransactionContext";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Nbar";
import CreateBlogPost from "./pages/CreateBlogPost";
import Blogfeed from "./pages/Blogfeed";
import UpdateProfilePage from "./pages/UpdateProfilePage";

import { useNetworksChanged } from "./hooks/AuthHooks";

// MUI styling
import "rsuite/dist/rsuite.min.css";
function App() {
  useNetworksChanged();
  return (
    <AuthProvider>
      <BlogpostProvider>
        <ProfileProvider>
          <FollowProvider>
            <TxProvider>
              <div className="App">
                <Navbar />
                <Routes>
                  <Route path="/" element={<PrivateRoute />}>
                    <Route
                      path="/profile-page/:uid"
                      element={<ProfilePage />}
                    />
                    <Route path="/create-post" element={<CreateBlogPost />} />
                    <Route path="/blogfeed" element={<Blogfeed />} />
                    <Route
                      path="/update-profile"
                      element={<UpdateProfilePage />}
                    />
                    <Route path="/*" element={<HomePage />} />
                  </Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/home" element={<HomePage />} />
                </Routes>
              </div>
            </TxProvider>
          </FollowProvider>
        </ProfileProvider>
      </BlogpostProvider>
    </AuthProvider>
  );
}

export default App;
