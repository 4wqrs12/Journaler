import styles from "./JournalModalStyles.module.css";
import { useEffect, useState } from "react";

function JournalModal({ journalName, displayFunction }) {
  const [journalText, setJournalText] = useState("");

  function closeModal() {
    displayFunction(false);
  }

  async function fetchText() {
    try {
      const res = await fetch(
        `http://localhost:5000/api/get-text/${journalName}`
      );
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const json = await res.json();
      setJournalText(json.data.journalText);
      console.log(json.data.journalText);
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

  useEffect(() => {
    fetchText();
  }, []);

  return (
    <div className={`${styles.modalContainer}`}>
      <div className={`${styles.modalContent}`}>
        <h1 className={`${styles.journalName}`}>{journalName}</h1>
        <textarea
          className={`${styles.journalTextArea}`}
          value={journalText}
          cols={200}
          rows={50}
          placeholder="Start writing your journal here..."
        />
        <div className={`${styles.modalControls}`}>
          <button className={`btn ${styles.saveButton}`}>Save</button>

          <button className={`btn ${styles.closeButton}`} onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default JournalModal;
