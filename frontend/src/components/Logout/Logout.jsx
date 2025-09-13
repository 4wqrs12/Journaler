function Logout() {
  function logout() {
    // properly revoke jwt token here instead of just removing it from localStorage
    localStorage.removeItem("token");
    window.location.reload();
  }

  return <a onClick={logout}>Logout</a>;
}

export default Logout;
