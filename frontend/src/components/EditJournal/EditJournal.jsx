import { useEffect, useState } from "react";
import styles from "./EditJournalStyles.module.css";
import Journal from "./Journal";

function EditJournal() {
  const [journals, setJournals] = useState([]);

  async function fetchJournals() {
    try {
      const res = await fetch("http://localhost:5000/api/get-journals");
      const json = await res.json();
      if (json.success) {
        setJournals(json.data);
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
    <div className={`${styles.editJournal}`}>
      {journals && journals.length > 0 ? (
        journals.map((journal, index) => (
          <Journal key={index} journalName={journal.journalName} />
        ))
      ) : (
        <p>No journals found. Create a new journal!</p>
      )}
    </div>
  );
}
export default EditJournal;
