import NewJournal from "../../NewJournal/NewJournal";
import styles from "./NewRouteStyles.module.css";

function NewJournalRoute() {
  return (
    <div className={`${styles.newJournal}`}>
      <h1>Create a new journal here!</h1>
      <NewJournal />
    </div>
  );
}

export default NewJournalRoute;
