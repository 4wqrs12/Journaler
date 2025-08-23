import Navbar from "./components/Navbar/Navbar";
import NewJournalRoute from "./components/routes/NewJournalRoute";
import EditJournalRoute from "./components/routes/EditJournalRoute";
import Home from "./components/routes/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewJournalRoute />} />
        <Route path="/edit" element={<EditJournalRoute />} />
      </Routes>
    </div>
  );
}

export default App;
