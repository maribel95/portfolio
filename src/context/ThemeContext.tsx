import { createContext, useState, useEffect, ReactNode } from "react";

export const ThemeContext = createContext({
  theme: "light",
  setTheme: (_: string) => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getInitialTheme = () => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // 1️⃣ Recuperar del localStorage al cargar la app
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // 2️⃣ Aplicar clase al <body> y guardar en localStorage cuando cambia el tema
  useEffect(() => {
    document.body.className = ""; // Limpia clases previas
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
