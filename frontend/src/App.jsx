import {BrowserRouter, Routes, Route} from "react-router-dom";
import NewJournalPage from "./components/NewJournalPage";

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/new" element={<NewJournalPage/>}/>
        </Routes>
    </BrowserRouter>;
}

export default App;