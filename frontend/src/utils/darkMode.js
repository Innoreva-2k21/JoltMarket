export const initializeDarkMode = (setDarkMode) => {
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  setDarkMode(savedDarkMode);
  document.documentElement.classList.toggle("dark", savedDarkMode);
};

export const toggleDarkMode = (setDarkMode) => {
  setDarkMode((prevMode) => {
    const newMode = !prevMode;
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
    return newMode;
  });
};
