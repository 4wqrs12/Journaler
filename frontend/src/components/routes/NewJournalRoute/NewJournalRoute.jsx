import NewJournal from "../../NewJournal/NewJournal";
import styles from "./NewRouteStyles.module.css";
import { useAuth } from "../../contexts/AuthContext";

function NewJournalRoute() {
  const { token } = useAuth();

  return (
    <div className={`${styles.newJournal}`}>
      {token ? (
        <NewJournal />
      ) : (
        <p>Please login or signup to create a journal!</p>
      )}
    </div>
  );
}

export default NewJournalRoute;
