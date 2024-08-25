import React, { useEffect, useState } from "react";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setTheme(preferredTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleThemeSwitch = (event) => {
    setTheme(event.target.checked ? "dark" : "light");
  };

  return (
    <div className="settings-box">
      <div className="setting-option">
        <label className="switch">
          <input type="checkbox" checked={theme === "dark"} onChange={handleThemeSwitch} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
