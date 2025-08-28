import styles from "./EditJournalStyles.module.css";

function SearchBar() {
  return (
    <input
      type="text"
      placeholder="Search..."
      className={`${styles.searchBar}`}
    />

    // use filter to filter out the buttons and get the requested journal, use props to get the journals array from EditJournal.jsx, and get setter function as prop too
  );
}

export default SearchBar;
