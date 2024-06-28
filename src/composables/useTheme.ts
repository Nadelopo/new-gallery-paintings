import { ref } from 'vue';

export const useTheme = () => {
  const isDark = ref(localStorage.theme === 'dark');

  const setTheme = () => {
    const theme = isDark.value ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };
  setTheme();
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    setTheme();
  };

  return { isDark, toggleTheme };
};
