export function useTheme() {
  const theme = useState<Theme>("theme", () => "light");

  onMounted(() => {
    theme.value =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  });

  function toggle() {
    theme.value = theme.value === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme.value;
    try {
      localStorage.setItem("theme", theme.value);
    } catch {
      // Ignore localStorage errors
    }
  }

  return { theme, toggle };
}
