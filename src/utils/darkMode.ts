/**
 * This file fixes dark mode in the application.
 * It should be included in src/main.tsx.
 */

// Check if user has a dark mode preference stored
const isDarkMode = localStorage.getItem('theme') === 'dark' ||
  (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

// Apply dark mode immediately to prevent flash of light content
if (isDarkMode) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
