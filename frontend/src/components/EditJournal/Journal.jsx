import styles from "./EditJournalStyles.module.css";
import JournalModal from "../JournalModal/JournalModal";
import { useState } from "react";

function Journal({ journalName }) {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  return (
    <div className={`${styles.journalContainer}`}>
      <button onClick={openModal} className={`btn ${styles.journalButton}`}>
        {journalName}
      </button>
      {showModal && (
        <JournalModal
          journalName={journalName}
          displayFunction={setShowModal}
        />
      )}
    </div>
  );
}

export default Journal;
