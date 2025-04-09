import { useTheme, THEME } from "./context/ThemeProvider";
import clsx from "clsx";

export default function ThemeContent() {
  const { theme } = useTheme();
  const isLightTheme = theme === THEME.LIGHT;

  return (
    <div
      className={clsx(
        "p-4 w-full h-dvh",
        isLightTheme ? "bg-white text-black" : "bg-black text-white"
      )}
    >
      <h1>week2 mission2</h1>
      <h2>다크 모드 - 라이트 모드 전환하기</h2>
    </div>
  );
}
