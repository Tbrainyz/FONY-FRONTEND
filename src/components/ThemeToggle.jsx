import { useTheme } from "../context/Themecontext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const getIcon = () => {
    if (theme === 'dark') return '☀️';      // Sun - switch to light
    if (theme === 'light') return '🌙';      // Moon - switch to system
    return '⚙️';                             // System mode
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all active:scale-95"
      aria-label="Toggle theme"
    >
      <span className="text-xl">{getIcon()}</span>
    </button>
  );
}