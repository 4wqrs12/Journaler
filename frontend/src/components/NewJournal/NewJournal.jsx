import { useState } from "react";
import styles from "./NewJournalStyles.module.css";
import TimedMessage from "./TimedMessage";

function NewJournal() {
  const [journalName, setJournalName] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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
      setMessage(json.message);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

  return (
    <div className={`${styles.createContainer}`}>
      <form className={`${styles.creationForm}`} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name..."
          value={journalName}
          onChange={handleNameChange}
          className={`${styles.journalInput}`}
        />
        {journalName && (
          <span>
            <button className={`btn ${styles.createButton}`} type="submit">
              Create Journal: "{journalName}"
            </button>
          </span>
        )}
      </form>
      <TimedMessage visible={isVisible} text={message} />
    </div>
  );
}

export default NewJournal;
