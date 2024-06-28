import { ref } from 'vue';

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
export const useTheme = () => ({ isDark, toggleTheme });
