import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <h1>Hello world!</h1>
    </AuthProvider>
  );
}

export default App;
