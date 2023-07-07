const localStorageReset = () => {
  localStorage.setItem("user", null);
  localStorage.setItem("role", null);
  localStorage.setItem("both", false);

  return true;
};

export default localStorageReset;
