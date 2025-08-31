import { useEffect, useState } from "react";
import styles from "./EditJournalStyles.module.css";
import Journal from "./Journal";
import { useAuth } from "../contexts/AuthContext";

function EditJournal() {
  const [journals, setJournals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useAuth();

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  const filteredData = journals.filter((journal) => {
    return journal.journalName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    console.log(token);
  }, [token]);

  async function fetchJournals() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API}/api/get-journals`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await res.json();
      console.log(json);
      if (json.success) {
        setJournals(json.data);
        console.log(json);
      }

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <>
      <div className={`${styles.header}`}>
        <h1>Edit your journals here</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className={`${styles.searchBar}`}
        />
      </div>

      <div className={`${styles.journals}`}>
        {journals && journals.length > 0 ? (
          filteredData.map((item, index) => (
            <Journal key={index} journalName={item.journalName} />
          ))
        ) : (
          <p>No journals found. Create a new journal!</p>
        )}
      </div>
    </>
  );
}
export default EditJournal;
