import React, { useState } from 'react';
interface JsonEditorProps {
  onJsonChange: (json: string) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ onJsonChange }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (value: string) => {
    setJsonInput(value);
    try {
      if (value.trim()) {
        JSON.parse(value);
        setError(null);
        onJsonChange(value);
      }
    } catch {
      setError('Invalid JSON format');
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-800 overflow-hidden">
      <div className="h-full">
        <textarea
          value={jsonInput}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Paste your JSON here..."
          className={`w-full h-full p-4 rounded-md font-mono text-sm 
            bg-gray-50 dark:bg-gray-900 
            text-gray-900 dark:text-white
            border ${error 
              ? 'border-red-500 dark:border-red-400' 
              : 'border-gray-300 dark:border-gray-600'
            }
            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
            placeholder-gray-400 dark:placeholder-gray-500`}
        />
        {error && (
          <div className="mt-2 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
