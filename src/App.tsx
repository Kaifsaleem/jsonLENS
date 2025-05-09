import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { JsonFilterPage } from './pages/JsonFilterPage';
import Contact from './pages/Contact';
function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
        <nav className="bg-gray-100 dark:bg-gray-800 shadow">
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
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<JsonFilterPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
