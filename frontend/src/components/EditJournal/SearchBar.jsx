import styles from "./EditJournalStyles.module.css";

function SearchBar() {
  return (
    <input
      type="text"
      placeholder="Search..."
      className={`${styles.searchBar}`}
    />
  );
}

export default SearchBar;
