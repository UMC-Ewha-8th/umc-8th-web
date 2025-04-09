import { useTheme, THEME } from "./context/ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";
import clsx from "clsx";

export default function Navbar() {
  const { theme } = useTheme();
  const isLightTheme = theme === THEME.LIGHT;

  return (
    <nav
      className={clsx(
        "p-4 w-full flex justify-end",
        isLightTheme ? "bg-white" : "bg-black"
      )}
    >
      <ThemeToggleButton />
    </nav>
  );
}
