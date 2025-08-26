import { useState } from "react";
import styles from "./EditJournalStyles.module.css";
import Journal from "./Journal";

function EditJournal() {
  const [journals, setJournals] = useState(["My Summer", "Office"]);

  // fetched journals using async/await function and use that function in useEffect

  return (
    <div className={`${styles.editJournal}`}>
      {journals.map((v, i) => (
        <Journal journalName={v} key={i} />
      ))}
    </div>
  );
}

export default EditJournal;
