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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_API}/api/signup`, {
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className={`${styles.signupForm}`}>
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
