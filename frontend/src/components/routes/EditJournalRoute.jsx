import EditJournal from "../EditJournal/EditJournal";
import { useAuth } from "../contexts/AuthContext";

function EditJournalRoute() {
  const { token } = useAuth();

  return (
    <div>
      <button onClick={() => console.log(token)}>log</button>
      {token ? (
        <EditJournal />
      ) : (
        <p>Please login or signup to view your journals!</p>
      )}
    </div>
  );
}

export default EditJournalRoute;
