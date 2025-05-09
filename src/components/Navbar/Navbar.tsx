import { NavLink } from 'react-router-dom';

interface NavbarProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onThemeToggle }) => {
  return (
    <nav className="bg-gray-100 dark:bg-gray-900 shadow">
      <div className="w-full px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <img src="/jsonLens.png" alt="jsonLENS logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">jsonLENS</span>
          </div>
          <div className="flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
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
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`
              }
            >
              Contact
            </NavLink>
            <button 
              onClick={onThemeToggle}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
