import clsx from "clsx";
import { THEME, useTheme } from "./ThemeProvider"

export default function ThemeToggleButton() {
    const {theme, toggleTheme}= useTheme();

    const isLigthMode = theme === THEME.LIGHT;
  return (
    <button onClick={toggleTheme}
        className={clsx('px-e4 py-2 mt-4 rounded-md transition-all',{
            'bg-black text-white': !isLigthMode,
            'bg-white text-black': isLigthMode,
        })}
    >
        {isLigthMode ? '다크모드' : '라이트 모드' }
    </button>
  );
}
