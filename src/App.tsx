import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { JsonFilterPage } from './pages/JsonFilterPage';
import Contact from './pages/Contact';
import { Navbar } from './components/Navbar/Navbar';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="w-screen h-screen bg-light-background dark:bg-dark-background text-light-primary dark:text-dark-primary flex flex-col">
          <Navbar />
        <main className="flex-1 container mx-auto p-4">
          <Routes>
            <Route path="/" element={<JsonFilterPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
