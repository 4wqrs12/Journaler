import { useState } from "react";

function NewJournal() {
  const [journalName, setJournalName] = useState("");

  function handleNameChange(e) {
    setJournalName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!journalName) {
      console.log("nothing for journalName");
      return;
    }
    console.log(`Sent ${journalName} to backend`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name..."
          value={journalName}
          onChange={handleNameChange}
        />
        {journalName && (
          <button type="submit">Create Journal: "{journalName}"</button>
        )}
      </form>
    </div>
  );
}

export default NewJournal;
