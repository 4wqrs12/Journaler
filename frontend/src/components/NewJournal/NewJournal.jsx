import { useState } from "react";
import styles from "./NewJournalStyles.module.css";

function NewJournal() {
  const [journalName, setJournalName] = useState("");

  function handleNameChange(e) {
    setJournalName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!journalName) {
      console.log("nothing for journalName");
      return;
    }
  }

  return (
    <div className={`${styles.createContainer}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name..."
          value={journalName}
          onChange={handleNameChange}
          className={`${styles.journalInput}`}
        />
        {journalName && (
          <button className={`btn ${styles.createButton}`} type="submit">
            Create Journal: "{journalName}"
          </button>
        )}
      </form>
    </div>
  );
}

export default NewJournal;
