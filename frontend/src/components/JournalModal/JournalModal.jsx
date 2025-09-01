import styles from "./JournalModalStyles.module.css";
import { useEffect, useState } from "react";
import { refresh } from "../../utils/refreshToken";
import { jwtDecode } from "jwt-decode";

function JournalModal({ journalName, displayFunction }) {
  const [journalText, setJournalText] = useState("");

  function closeModal() {
    displayFunction(false);
  }

  async function fetchText() {
    try {
      if (
        jwtDecode(localStorage.getItem("accessToken")).exp * 1000 <
        Date.now() + 60 * 1000
      ) {
        await refresh();
      }

      const res = await fetch(
        `${import.meta.env.VITE_BASE_API}/api/get-text/${journalName}`,
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
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const json = await res.json();
      setJournalText(json.data.journalText);
    } catch (e) {
      if (e.message.includes("401")) {
        await refresh();
      }
      console.error(`Error: ${e}`);
    }
  }

  useEffect(() => {
    fetchText();
  }, []);

  async function saveText() {
    try {
      if (
        jwtDecode(localStorage.getItem("accessToken")).exp * 1000 <
        Date.now() + 60 * 1000
      ) {
        await refresh();
      }

      const res = await fetch(
        `${import.meta.env.VITE_BASE_API}/api/save-text/${journalName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            journalText: journalText,
            refreshToken: localStorage.getItem("refreshToken"),
          }),
        }
      );
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const json = await res.json();
      console.log(`Save text: ${json.message}`);
    } catch (e) {
      if (e.message.includes("401")) {
        await refresh();
      }
      console.error(`Error: ${e}`);
    }
  }

  function handleTextChange(e) {
    setJournalText(e.target.value);
  }

  return (
    <div className={`${styles.modalContainer}`}>
      <div className={`${styles.modalContent}`}>
        <h1 className={`${styles.journalName}`}>{journalName}</h1>
        <textarea
          className={`${styles.journalTextArea}`}
          value={journalText}
          onChange={handleTextChange}
          placeholder="Start writing your journal here..."
        />
        <div className={`${styles.modalControls}`}>
          <button
            title="Save your changes"
            className={`btn ${styles.saveButton}`}
            onClick={saveText}
          >
            Save
          </button>

          <button
            title="This will discard any unsaved changes"
            className={`btn ${styles.closeButton}`}
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default JournalModal;
