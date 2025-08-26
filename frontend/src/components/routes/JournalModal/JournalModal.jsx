import styles from "./JournalModalStyles.module.css";
import { useState } from "react";

function JournalModal({ journalName, displayFunction }) {
  const [journalText, setJournalText] = useState("");

  // fetch journalText from dynamic backned endpoint using journalName as param

  function handleChange(e) {
    setJournalText(e.target.value);
  }

  function closeModal() {
    displayFunction(false);
  }

  return (
    <div className={`${styles.modalContainer}`}>
      <div className={`${styles.modalContent}`}>
        <h1 className={`${styles.journalName}`}>{journalName}</h1>
        <textarea
          className={`${styles.journalTextArea}`}
          value={journalText}
          onChange={handleChange}
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
