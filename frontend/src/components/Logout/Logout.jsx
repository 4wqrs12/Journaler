import { apiFetch } from "../../utils/api";

function Logout() {
  async function logout() {
    try {
      const res = await apiFetch(
        `${import.meta.env.VITE_BASE_API}/api/revoke-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      localStorage.setItem("accessToken", "");
      localStorage.setItem("refreshToken", "");
      window.location.reload();
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

  return <a onClick={logout}>Logout</a>;
}

export default Logout;
