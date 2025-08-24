import { useState } from "react";
import styles from "./NewJournalStyles.module.css";

function NewJournal() {
  const [journalName, setJournalName] = useState("");

  function handleNameChange(e) {
    setJournalName(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!journalName) {
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/create-journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ journalName }),
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const json = await res.json();
      console.log(json);
    } catch (e) {
      console.error(`Error: ${e}`);
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
