import NewJournal from "../../NewJournal/NewJournal";
import styles from "./NewRouteStyles.module.css";

function NewJournalRoute() {
  return (
    <div className={`${styles.newJournal}`}>
      {localStorage.getItem("token") ? (
        <NewJournal />
      ) : (
        <p>Please login or signup to create a journal!</p>
      )}
    </div>
  );
}

export default NewJournalRoute;
