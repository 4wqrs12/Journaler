import styles from "./JournalModalStyles.module.css";
import { useEffect, useState } from "react";

function JournalModal({ journalName, displayFunction }) {
  const [journalText, setJournalText] = useState("");

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
          <button onClick={saveText} className={`btn ${styles.saveButton}`}>
            Save
          </button>

          <button className={`btn ${styles.closeButton}`} onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default JournalModal;
