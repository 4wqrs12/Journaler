import styles from "./EditJournalStyles.module.css";

function Journal({ name }) {
  return (
    <div className={`${styles.journalButton}`}>
      <button>{name}</button>
    </div>
  );
}

export default Journal;
