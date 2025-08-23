import styles from "./NavbarStyles.module.css";

function Navbar() {
  return (
    <div className={`${styles.navBar}`}>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/new">New Journal</a>
        </li>
        <li>
          <a className={`${styles.editJournal}`} href="/edit">
            Journals
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
