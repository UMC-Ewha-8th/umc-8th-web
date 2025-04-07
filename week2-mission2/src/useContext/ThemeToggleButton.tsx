import { THEME, useTheme } from "./context/ThemeProvider";
import clsx from "clsx";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const isLightTheme = theme === THEME.LIGHT;

  console.log("current theme:", theme);

  return (
    <button
      className={clsx("p-2 rounded-md text-black font-bold", {
        "bg-black text-white": !isLightTheme,
        "bg-white text-black": isLightTheme,
      })}
      onClick={toggleTheme}
    >
      {isLightTheme ? "🌙 dark mode" : "🌞 light mode"}
    </button>
  );
}
