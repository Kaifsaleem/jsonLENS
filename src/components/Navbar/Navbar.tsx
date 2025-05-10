import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <nav className="bg-light-background dark:bg-dark-background shadow border-b border-light-border dark:border-dark-border">
      <div className="w-full px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <img src="/jsonLens.png" alt="jsonLENS logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-light-accent dark:text-dark-accent">jsonLENS</span>
          </div>
          <div className="flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-light-accent dark:text-dark-accent' 
                    : 'text-light-primary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-accent'
                }`
              }
              end
            >
              JSON Filter
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-light-accent dark:text-dark-accent' 
                    : 'text-light-primary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-accent'
                }`
              }
            >
              Contact
            </NavLink>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-light-border dark:hover:bg-dark-border transition-colors"
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
