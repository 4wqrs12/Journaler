import styles from "./EditJournalStyles.module.css";

function Journal({ name }) {
  return (
    <div className={`${styles.journalContainer}`}>
      <button className={`btn ${styles.journalButton}`}>{name}</button>
    </div>
  );
}

export default Journal;
