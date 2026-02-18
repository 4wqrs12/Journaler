import { useState } from "react";

function NewJournal() {
  const [journalName, setJournalName] = useState("");

  function handleNameChange(e) {
    setJournalName(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/new-journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ journalName }),
      });
      const data = await res.json();
      if (data.success === true) {
        setJournalName("");
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.log(`An error has occurred: ${e}`);
    }
  }

  return (
    <div className="route-content">
      <h1 className="route-title">New Journal</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={journalName}
          onChange={handleNameChange}
          placeholder="Journal name..."
          className="focus:outline-none mt-5"
        />
        {journalName && (
          <button
            type="submit"
            className="ml-5 rounded-2xl bg-[#E1C16E] px-5 cursor-pointer hover:bg-[#c0a35b]"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}

export default NewJournal;
