import React, { useEffect, useState } from 'react';
import JsonData  from '../../assets/default.json'; // Adjust the import path as necessary
interface JsonEditorProps {
  onJsonChange: (json: string) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ onJsonChange }) => {
  const defaultJsonData = JSON.stringify(JsonData, null, 2);
  useEffect(() => {
    try {
      JSON.parse(defaultJsonData);
      onJsonChange(defaultJsonData);
    } catch (e) {
      setError(`Default JSON is invalid error ${e}`);
    }
  }, []);
  const [jsonInput, setJsonInput] = useState(defaultJsonData);
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
    <div className="h-full bg-light-background dark:bg-dark-background overflow-hidden border border-light-border dark:border-dark-border rounded">
      <div className="h-full p-3">
        <textarea
          value={jsonInput}
          onChange={(e) => handleInputChange(e.target.value)}
          className={`w-full h-full p-4 rounded-md font-mono text-sm 
            bg-light-background dark:bg-dark-background 
            text-light-primary dark:text-dark-primary
            border ${error 
              ? 'border-red-500 dark:border-red-400' 
              : 'border-light-border dark:border-dark-border'
            }
            focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent
            placeholder-light-secondary dark:placeholder-dark-secondary`}
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
