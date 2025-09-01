import EditJournal from "../EditJournal/EditJournal";

function EditJournalRoute() {
  return (
    <div>
      {localStorage.getItem("accessToken") ? (
        <EditJournal />
      ) : (
        <p>Please login or signup to view your journals!</p>
      )}
    </div>
  );
}

export default EditJournalRoute;
