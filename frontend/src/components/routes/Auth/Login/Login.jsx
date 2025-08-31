import { useState } from "react";
import styles from "./LoginStyles.module.css";

function Login() {
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
      <h1>Login</h1>
      <form className={`${styles.loginForm}`}>
        <div className={`${styles.loginContent}`}>
          <input
            placeholder="Username..."
            type="text"
            value={username}
            onChange={handleUsername}
            className={`${styles.username}`}
          />
          <input
            placeholder="Password..."
            type="text"
            value={password}
            onChange={handlePassword}
            className={`${styles.password}`}
          />

          {username && password && (
            <button type="submit" className={`btn ${styles.loginButton}`}>
              Login
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default Login;
