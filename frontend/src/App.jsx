import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewJournalPage from "./components/NewJournalPage";
import EditJournalPage from "./components/EditJournalPage";

function App() {
  return (
    <div>
      <div className="bg-[#6E260E] m-2 rounded-md">
        <nav className="flex">
          <a href="/new" className="navbar-routes">
            New Journal
          </a>
          <a href="/edit" className="navbar-routes">
            Edit Journal
          </a>
        </nav>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/new" element={<NewJournalPage />} />
          <Route path="/edit" element={<EditJournalPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
