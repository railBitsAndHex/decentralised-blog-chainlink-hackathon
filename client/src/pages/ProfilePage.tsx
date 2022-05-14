import React from "react";
import { useAuth } from "../context/AuthContext";
function ProfilePage() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return <div>ProfilePage</div>;
}

export default ProfilePage;
