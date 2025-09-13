function Logout() {
  async function logout() {
    // properly revoke jwt token here instead of just removing it from localStorage
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_API}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.reload();
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

  return <a onClick={logout}>Logout</a>;
}

export default Logout;
