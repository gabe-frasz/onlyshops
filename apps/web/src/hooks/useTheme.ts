import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const localThemeKey = "onlyshops-theme";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    const localTheme = window.localStorage.getItem(localThemeKey);

    switch (localTheme) {
      case "light":
        setTheme("light");
        break;

      case "dark":
      default:
        setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");

    theme && window.localStorage.setItem(localThemeKey, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return {
    theme,
    toggleTheme,
  };
};
