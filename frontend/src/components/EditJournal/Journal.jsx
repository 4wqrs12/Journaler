import styles from "./EditJournalStyles.module.css";

function Journal({ journalName }) {
  return (
    <div className={`${styles.journalContainer}`}>
      <button className={`btn ${styles.journalButton}`}>{journalName}</button>
    </div>
  );
}

export default Journal;
