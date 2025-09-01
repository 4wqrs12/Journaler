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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_API}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const json = await res.json();
      console.log(json);
      // json.success &&
      //   localStorage.setItem("accessToken", json.data.accessToken);
      if (json.success) {
        localStorage.setItem("accessToken", json.data.accessToken);
        localStorage.setItem("refreshToken", json.data.refreshToken);
      }
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={`${styles.loginForm}`}>
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
