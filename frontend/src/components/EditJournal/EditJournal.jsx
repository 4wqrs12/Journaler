import { useEffect, useState } from "react";
import styles from "./EditJournalStyles.module.css";
import Journal from "./Journal";
import { refresh } from "../../utils/refreshToken";
import { jwtDecode } from "jwt-decode";

function EditJournal() {
  const [journals, setJournals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  const filteredData = journals.filter((journal) => {
    return journal.journalName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  async function fetchJournals() {
    try {
      if (
        jwtDecode(localStorage.getItem("accessToken")).exp * 1000 <
        Date.now() + 60 * 1000
      ) {
        await refresh();
      }

      const res = await fetch(
        `${import.meta.env.VITE_BASE_API}/api/get-journals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            refreshToken: localStorage.getItem("refreshToken"),
          }),
        }
      );
      const json = await res.json();
      if (json.success) {
        setJournals(json.data);
        console.log(json);
      }

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
    } catch (e) {
      if (e.message.includes("401")) {
        await refresh();
      }
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
