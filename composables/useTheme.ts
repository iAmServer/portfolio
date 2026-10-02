type Theme = "light" | "dark";

export function useTheme() {
  const theme = useState<Theme>("theme", () => "light");

  // The inline head script already set data-theme; mirror it into state.
  onMounted(() => {
    theme.value = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  });

  function toggle() {
    theme.value = theme.value === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme.value;
    try {
      localStorage.setItem("theme", theme.value);
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
  }

  return { theme, toggle };
}
