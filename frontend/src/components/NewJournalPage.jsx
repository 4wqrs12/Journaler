import { useState } from "react";

function NewJournal() {
  const [journalName, setJournalName] = useState("");

  function handleNameChange(e) {
    setJournalName(e.target.value);
  }

  return (
    <div className="route-content">
      <h1 className="route-title">New Journal</h1>
      <input
        type="text"
        value={journalName}
        onChange={handleNameChange}
        placeholder="Journal name..."
        className="focus:outline-none mt-5"
      />
      {journalName && (
        <button className="ml-5 rounded-2xl bg-[#E1C16E] px-5 cursor-pointer hover:bg-[#c0a35b]">
          Submit
        </button>
      )}
    </div>
  );
}

export default NewJournal;
