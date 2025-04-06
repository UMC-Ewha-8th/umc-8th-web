import clsx from "clsx";
import ThemeToggleButton from "./ThemeToggleButton";
import { THEME, useTheme } from './context/ThemeProvider'

export default function Navbar() : Element {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;
  
  console.log(theme);
  return (
    <nav 
      className={clsx(
        'p-4 w-full flex justify-end',
        isLightMode ? 'bg-white' : 'bg-gray-800'
      )}
    >
      <ThemeToggleButton />
    </nav>
  );
}