import Logout from "../Logout/Logout";
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
        <li className={`${styles.account}`}>
          <Logout />
        </li>
        <li className={`${styles.account}`}>
          <a href="/login">Login</a>
        </li>
        <li className={`${styles.account}`}>
          <a href="/signup">Sign Up</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
