import Navbar from "./components/Navbar/Navbar";
import NewJournalRoute from "./components/routes/NewJournalRoute/NewJournalRoute";
import EditJournalRoute from "./components/routes/EditJournalRoute";
import Home from "./components/routes/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./components/routes/Auth/Login/LoginRoute";
import Signup from "./components/routes/Auth/Signup/SignupRoute";
import { AuthProvider } from "./components/contexts/AuthContext";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewJournalRoute />} />
        <Route path="/edit" element={<EditJournalRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
