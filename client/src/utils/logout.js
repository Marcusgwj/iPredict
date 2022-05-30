function logout() {
  localStorage.removeItem("user");
  return;
}

export default logout;
