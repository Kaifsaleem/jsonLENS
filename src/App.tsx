import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { JsonFilterPage } from './pages/JsonFilterPage';
import Contact from './pages/Contact';
import { Navbar } from './components/Navbar/Navbar';
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
      <div className="w-screen h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
        <Navbar theme={theme} onThemeToggle={toggleTheme} />
        <main className="flex-1 container mx-auto p-4">
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
