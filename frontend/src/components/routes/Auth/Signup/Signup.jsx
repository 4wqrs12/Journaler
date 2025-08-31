import { useState } from "react";
import styles from "./SignupStyles.module.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form className={`${styles.signupForm}`}>
        <div className={`${styles.signupContent}`}>
          <input
            value={username}
            onChange={handleUsername}
            type="text"
            placeholder="Username..."
            className={`${styles.username}`}
          />
          <input
            value={password}
            onChange={handlePassword}
            type="text"
            placeholder="Password..."
            className={`${styles.password}`}
          />
          {username && password && (
            <button type="submit" className={`btn ${styles.signupButton}`}>
              Sign Up
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default Signup;
